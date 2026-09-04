import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
const ProductsStock = () => {
  return <Col xl={8}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Products Stock</h5>
                        <div className="ms-auto">
                            <Dropdown>
                                <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Stock<IconifyIcon icon="mdi:chevron-down" className="ms-1 fs-14" /></DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="#">In stock</DropdownItem>
                                    <DropdownItem href="#">Low stock</DropdownItem>
                                    <DropdownItem href="#">Out of stock</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="p-0">
                    <div className="table-responsive">
                        <table className="table table-stock mb-0">

                            <thead>
                                <tr className="text-capitalize">
                                    <th>Product Item</th>
                                    <th>Product ID</th>
                                    <th>Date Added</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>QTY</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Audio HD3</td>
                                    <td className="text-muted">#PFR-1045</td>
                                    <td className="text-muted">29 Mar, 2024</td>
                                    <td className="text-muted">$1487</td>
                                    <td>
                                        <span className="badge bg-danger-subtle text-danger fw-semibold fs-13">Out of Stock</span>
                                    </td>
                                    <td>46 Pics</td>
                                </tr>
                                <tr>
                                    <td>Smartwatch</td>
                                    <td className="text-muted">#PFR-1045</td>
                                    <td className="text-muted">17 Dec, 2024</td>
                                    <td className="text-muted">$1028</td>
                                    <td>
                                        <span className="badge bg-warning-subtle text-warning fw-semibold fs-13">Low Stock</span>
                                    </td>
                                    <td>18 Pics</td>
                                </tr>
                                <tr>
                                    <td>AirPods Max</td>
                                    <td className="text-muted">#PFR-1045</td>
                                    <td className="text-muted">15 Apr, 2024</td>
                                    <td className="text-muted">$1487</td>
                                    <td>
                                        <span className="badge bg-danger-subtle text-danger fw-semibold fs-13">Out of Stock</span>
                                    </td>
                                    <td>587 Pics</td>
                                </tr>
                                <tr>
                                    <td>Women Pink Heels</td>
                                    <td className="text-muted">#PFR-1045</td>
                                    <td className="text-muted">13 Feb, 2024</td>
                                    <td className="text-muted">$1487</td>
                                    <td>
                                        <span className="badge bg-primary-subtle text-primary fw-semibold fs-13">In Stock</span>
                                    </td>
                                    <td>42 Pics</td>
                                </tr>
                                <tr>
                                    <td>Pixel 8 Pro</td>
                                    <td className="text-muted">#PFR-1045</td>
                                    <td className="text-muted">22 July, 2024</td>
                                    <td className="text-muted">$1487</td>
                                    <td>
                                        <span className="badge bg-warning-subtle text-warning fw-semibold fs-13">Low Stock</span>
                                    </td>
                                    <td>784 Pics</td>
                                </tr>
                                <tr>
                                    <td>HP Monitor</td>
                                    <td className="text-muted">#PFR-1045</td>
                                    <td className="text-muted">19 Dec, 2024</td>
                                    <td className="text-muted">$1487</td>
                                    <td>
                                        <span className="badge bg-primary-subtle text-primary fw-semibold fs-13">In Stock</span>
                                    </td>
                                    <td>78 Pics</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>;
};
export default ProductsStock;