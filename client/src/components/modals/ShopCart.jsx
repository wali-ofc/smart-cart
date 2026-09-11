import { useContextElement } from "@/context/Context";

import { Link } from "react-router-dom";
export default function ShopCart() {
  const {
    cartProducts,
    totalPrice,
    updateQuantity,
    removeFromCart,
    cartError,
  } = useContextElement();
  const setQuantity = (id, quantity) => {
    if (quantity >= 1) updateQuantity(id, quantity);
  };
  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="header">
            <div className="title fw-5">Shopping cart</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-mini-cart-wrap">
              <div className="tf-mini-cart-main">
                <div className="tf-mini-cart-sroll">
                  {cartError && (
                    <div className="alert alert-danger py-2 mx-3 mb-2">
                      {cartError}
                    </div>
                  )}
                  <div className="tf-mini-cart-items">
                    {cartProducts.map((elm, i) => (
                      <div key={i} className="tf-mini-cart-item">
                        <div className="tf-mini-cart-image">
                          <Link to={`/product-detail/${elm.id}`}>
                            <img
                              alt="image"
                              src={elm.imgSrc}
                              width={668}
                              height={932}
                              style={{ objectFit: "cover" }}
                            />
                          </Link>
                        </div>
                        <div className="tf-mini-cart-info">
                          <Link
                            className="title link"
                            to={`/product-detail/${elm.id}`}
                          >
                            {elm.title}
                          </Link>
                          <div className="meta-variant">Light gray</div>
                          <div className="price fw-6">
                            ${elm.price?.toFixed(2)}
                          </div>
                          <div className="tf-mini-cart-btns">
                            <div className="wg-quantity small">
                              <span
                                className="btn-quantity minus-btn"
                                onClick={() =>
                                  setQuantity(elm.id, elm.quantity - 1)
                                }
                              >
                                -
                              </span>
                              <input
                                type="text"
                                name="number"
                                value={elm.quantity}
                                min={1}
                                onChange={(e) =>
                                  setQuantity(elm.id, e.target.value / 1)
                                }
                              />
                              <span
                                className="btn-quantity plus-btn"
                                onClick={() =>
                                  setQuantity(elm.id, elm.quantity + 1)
                                }
                              >
                                +
                              </span>
                            </div>
                            <div
                              className="tf-mini-cart-remove"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeItem(elm.id)}
                            >
                              Remove
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

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
                  </div>
                </div>
              </div>
              <div className="tf-mini-cart-bottom">
                <div className="tf-mini-cart-bottom-wrap">
                  <div className="tf-cart-totals-discounts">
                    <div className="tf-cart-total">Subtotal</div>
                    <div className="tf-totals-total-value fw-6">
                      ${totalPrice.toFixed(2)} USD
                    </div>
                  </div>
                  <div className="tf-cart-tax">
                    Taxes and <a href="#">shipping</a> calculated at checkout
                  </div>
                  <div className="tf-mini-cart-line" />
                  <div className="tf-mini-cart-view-checkout">
                    <Link
                      to={`/cart`}
                      className="tf-btn btn-outline radius-3 link w-100 justify-content-center"
                    >
                      View cart
                    </Link>
                    <Link
                      to={`/checkout`}
                      className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    >
                      <span>Check out</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>
      </div>
    </div>
  );
}
