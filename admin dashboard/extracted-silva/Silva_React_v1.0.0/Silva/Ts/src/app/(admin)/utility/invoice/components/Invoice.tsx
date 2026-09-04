import logoSm from "@/assets/images/logo-sm.png"
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import IconifyIcon from '@/component/wrapper/IconifyIcon'

const Invoice = () => {
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardBody>
                        <div className="panel-body">
                            <div className="clearfix">
                                <div className="float-start d-flex justify-content-center">
                                    <img src={logoSm} className="me-2" alt="logo" height="24" />
                                    <h4 className="mb-0 caption fw-semibold fs-18">Silva</h4>
                                </div>
                                <div className="float-end">
                                    <h4 className="fs-18">Invoice #4987<br />
                                        <strong className="fs-15 fw-normal">Invoice Number</strong>
                                    </h4>
                                </div>
                            </div>
                            <hr />
                            <Row>
                                <Col md={12}>
                                    <div className="float-start mt-3">
                                        <address>
                                            <strong>Invoice To:</strong><br />
                                            815 Parker Mews, West Shay<br />
                                            San Francisco, CA 36100<br />
                                            <abbr title="Phone">P:</abbr> 818-705-3746
                                        </address>
                                    </div>
                                    <div className="float-end mt-3">

                                        <address>
                                            <strong>Bill To:</strong><br />
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className="pe-4">Total Due:</td>
                                                        <td className="fw-medium">$12,110.55</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pe-4">Bank name:</td>
                                                        <td>Swiss Bank</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pe-4">Country:</td>
                                                        <td>Switzerland</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pe-4">BCODE:</td>
                                                        <td>LAPE149879564874</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pe-4">SWIFT code:</td>
                                                        <td>RTP03234</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </address>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={3}>
                                    <p className="mb-1 fw-semibold">Invoice ID :</p>
                                    <p className="mb-1">#ERTW1249879</p>
                                </Col>

                                <Col xl={3}>
                                    <p className="mb-1 fw-semibold">Date Issued :</p>
                                    <p className="mb-1">10, Jan 2024</p>
                                </Col>

                                <Col xl={3}>
                                    <p className="mb-1 fw-semibold">Due Date :</p>
                                    <p className="mb-1">17, Feb 2024</p>
                                </Col>

                                <Col xl={3}>
                                    <p className="mb-1 fw-semibold">Due Amount :</p>
                                    <p className="mb-1 fw-bold">$2,032.82</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="table-responsive rounded-2">
                                        <table className="table mt-4 mb-4 table-centered border">
                                            <thead className="rounded-2">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item</th>
                                                    <th>Description</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Cost</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>PH Monitor</td>
                                                    <td>HP offers monitors with high refresh rates.</td>
                                                    <td>1</td>
                                                    <td>$180</td>
                                                    <td>$180</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Mobile</td>
                                                    <td>DisplayPort, USB-C, and sometimes.</td>
                                                    <td>5</td>
                                                    <td>$150</td>
                                                    <td>$2750</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Keyboard</td>
                                                    <td>These monitors often boast features such as factory calibration.</td>
                                                    <td>2</td>
                                                    <td>$80</td>
                                                    <td>$160</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Mouse Master</td>
                                                    <td>Balance of performance, features, and design to meet the demands.</td>
                                                    <td>3</td>
                                                    <td>$300</td>
                                                    <td>$900</td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>IMac</td>
                                                    <td>Eco-friendly features such as low power consumption.</td>
                                                    <td>5</td>
                                                    <td>$1520</td>
                                                    <td>$7600</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}></td>
                                                    <td colSpan={2}>
                                                        <table className="table table-sm text-nowrap mb-0 table-borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p className="mb-0">Sub-total :</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-0 fw-medium fs-15">$1,1590</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td scope="row">
                                                                        <p className="mb-0">Discout :</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-0 fw-medium fs-15">$29.98</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td scope="row">
                                                                        <p className="mb-0">Vat <span className="text-danger">(20%)</span> :</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-0 fw-medium fs-15">$472.80</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td scope="row">
                                                                        <p className="mb-0">Due Till Date :</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-0 fw-medium fs-15">$0</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td scope="row">
                                                                        <p className="mb-0 fs-14">Total :</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-0 fw-medium fs-16 text-success">$2,032.82</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-print-none">
                                <div className="float-end">
                                    <Link to="#" onClick={() => window.print()} className="btn btn-dark border-0"><IconifyIcon icon="mdi:printer" className="me-1" />Print</Link>
                                    <Link to="#" className="btn btn-primary" style={{ marginLeft: "3px" }}>Submit</Link>
                                </div>
                                <div className="clearfix" />
                            </div>

                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Invoice