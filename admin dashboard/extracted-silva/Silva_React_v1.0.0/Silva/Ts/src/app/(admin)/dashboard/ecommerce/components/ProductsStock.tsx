import { useState, useEffect } from 'react';
import api from '@/helpers/api';
import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'

const ProductsStock = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        api.get('/admin/products').then(res => {
            if(res.data.success) {
                setProducts(res.data.data.slice(0, 5)); // Limit to 5 for the widget
            }
        }).catch(err => console.error("Error fetching products", err));
    }, []);

    return (
        <Col xl={8}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Products Stock</h5>
                        <div className="ms-auto">
                            <Dropdown>
                                <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Stock<IconifyIcon icon="mdi:chevron-down" className="ms-1 fs-14"/></DropdownToggle>
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
    {products.length === 0 ? (
        <tr><td colSpan={6} className="text-center">No products found</td></tr>
    ) : (
        products.map((item: any, idx: number) => (
            <tr key={idx}>
                <td>{item.title}</td>
                <td className="text-muted">#{item._id.slice(-6).toUpperCase()}</td>
                <td className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="text-muted">${item.price}</td>
                <td>
                    {item.stock > 10 ? (
                        <span className="badge bg-success-subtle text-success fw-semibold fs-13">In Stock</span>
                    ) : item.stock > 0 ? (
                        <span className="badge bg-warning-subtle text-warning fw-semibold fs-13">Low Stock</span>
                    ) : (
                        <span className="badge bg-danger-subtle text-danger fw-semibold fs-13">Out of Stock</span>
                    )}
                </td>
                <td>{item.stock} Items</td>
            </tr>
        ))
    )}
</tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default ProductsStock