import { useContextElement } from "@/context/Context";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import api from "@/api/axios";
import CustomSelect from "@/components/common/CustomSelect";

const paymentImages = [
    { src: "https://cdn.simpleicons.org/visa/1434CB", width: 48, height: 30, alt: "Visa" },
    { src: "https://cdn.simpleicons.org/mastercard/EB001B", width: 48, height: 30, alt: "Mastercard" },
    { src: "https://cdn.simpleicons.org/paypal/00457C", width: 48, height: 30, alt: "PayPal" },
    { src: "https://cdn.simpleicons.org/americanexpress/002663", width: 48, height: 30, alt: "Amex" },
    { src: "https://cdn.simpleicons.org/discover/E55C20", width: 48, height: 30, alt: "Discover" },
  ];

export default function Checkout() {
  const { cartProducts, totalPrice, clearCart } = useContextElement();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("---");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");
    if (!user) {
      setError("Please log in to place your order.");
      const el = document.getElementById("login");
      if (el) {
        import("bootstrap").then((bootstrap) => {
          bootstrap.Modal.getOrCreateInstance(el).show();
        });
      }
      return;
    }
    if (!agreed) {
      setError("Please agree to the terms and conditions.");
      return;
    }
    const payload = {
      shipping_address: {
        street: address,
        city: city,
        state: state,
        zip_code: zipCode,
        country: country,
      },
      payment_method: paymentMethod === "cod" ? "cod" : "other",
    };
    setSubmitting(true);
    try {
      const { data } = await api.post("/orders", payload);
      const orderId = data?.data?._id;
      await clearCart();
      if (orderId) {
        navigate(`/payment-confirmation?order=${orderId}`);
      } else {
        navigate("/payment-confirmation");
      }
    } catch (err) {
      setError(
        err?.response?.data?.error || "Could not place your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="tf-page-cart-wrap layout-2">
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Billing details</h5>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="form-checkout"
            >
              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    required
                    type="text"
                    id="first-name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    required
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
              <fieldset className="box fieldset">
                <label htmlFor="country">Country/Region</label>
                <CustomSelect
                  id="country"
                  name="address[country]"
                  value={country}
                  placeholder="Select country"
                  options={[
                    "Australia",
                    "Austria",
                    "Belgium",
                    "Canada",
                    "Czechia",
                    "Denmark",
                    "Finland",
                    "France",
                    "Germany",
                    "Hong Kong SAR",
                    "Ireland",
                    "Italy",
                    "Japan",
                    "Malaysia",
                    "Netherlands",
                    "New Zealand",
                    "Norway",
                    "Pakistan",
                    "Poland",
                    "Portugal",
                    "Singapore",
                    "South Korea",
                    "Spain",
                    "Sweden",
                    "Switzerland",
                    "United Arab Emirates",
                    "United Kingdom",
                    "United States",
                    "Vietnam"
                  ]}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="city">Town/City</label>
                <input
                  required
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="state">State / Province</label>
                <input
                  required
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="zip">ZIP / Postal code</label>
                <input
                  required
                  type="text"
                  id="zip"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </fieldset>
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Your order</h5>
              <form
                onSubmit={placeOrder}
                className="tf-page-cart-checkout widget-wrap-checkout"
              >
                <ul className="wrap-checkout-product">
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <img
                          alt="product"
                          src={elm.imgSrc}
                          width={720}
                          height={1005}
                        />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.title}</p>
                          <span className="variant">Brown / M</span>
                        </div>
                        <span className="price">
                          ${(elm.price * elm.quantity).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                {!cartProducts.length && (
                  <div className="container">
                    <div className="row align-items-center mt-5 mb-5">
                      <div className="col-12 fs-18">
                        Your shop cart is empty
                      </div>
                      <div className="col-12 mt-3">
                        <Link
                          to={`/shop-default`}
                          className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                          style={{ width: "fit-content" }}
                        >
                          Explore Products!
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between line pb_20">
                  <h6 className="fw-5">Total</h6>
                  <h6 className="total fw-5">${totalPrice.toFixed(2)}</h6>
                </div>
                {error && (
                  <div className="alert alert-danger py-2 mb-3">{error}</div>
                )}
                <div className="wd-check-payment">
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="bank"
                      className="tf-check"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                    />
                    <label htmlFor="bank">Direct bank transfer</label>
                  </div>
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="delivery"
                      className="tf-check"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <label htmlFor="delivery">Cash on delivery</label>
                  </div>
                  <p className="text_black-2 mb_20">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our
                    <Link
                      to={`/privacy-policy`}
                      className="text-decoration-underline"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>
                  <div className="box-checkbox fieldset-radio mb_20">
                    <input
                      required
                      type="checkbox"
                      id="check-agree"
                      className="tf-check"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="check-agree" className="text_black-2">
                      I have read and agree to the website
                      <Link
                        to={`/terms-conditions`}
                        className="text-decoration-underline"
                      >
                        terms and conditions
                      </Link>
                      .
                    </label>
                  </div>
                </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center mb_20"
                  >
                    {submitting ? "Placing order..." : "Place order"}
                  </button>

                  {/* Payment Icons */}
                  <div className="tf-product-trust-mess mt_20">
                    <i className="icon-safe" />
                    <p className="fw-6">
                      Guarantee Safe <br />
                      Checkout
                    </p>
                  </div>
                  <div className="tf-payment d-flex gap-10 mt_10">
                    {paymentImages.map((image, index) => (
                      <img
                        key={index}
                        alt={image.alt}
                        src={image.src}
                        width={image.width}
                        height={image.height}
                      />
                    ))}
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
