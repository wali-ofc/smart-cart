import bag from "@/assets/images/products/bag.png"
import watch from "@/assets/images/products/watch.png"
import headphone from "@/assets/images/products/headphone.png"
import leatherJacket from "@/assets/images/products/leather-jacket.png"
import shoes from "@/assets/images/products/shoes.png"
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import IconifyIcon from '@/component/wrapper/IconifyIcon'

type ProductType = {
    id: number,
    image: string,
    name: string,
    sold: number,
    earnings: string
}
const SellingProducts = () => {

    const productData: ProductType[] = [
        {
            id: 1,
            image: bag,
            name: "Himalayan Hemp Laptop Bag",
            sold: 457,
            earnings: "$74,487"
        },
        {
            id: 2,
            image: watch,
            name: "Classic Apple Watch",
            sold: 859,
            earnings: "$50,569"
        },
        {
            id: 3,
            image: headphone,
            name: "New Headphone",
            sold: 1024,
            earnings: "$45,487"
        },
        {
            id: 4,
            image: leatherJacket,
            name: "Leather jacket",
            sold: 1478,
            earnings: "$30,102"
        },
        {
            id: 5,
            image: shoes,
            name: "Nike Air Shoes",
            sold: 758,
            earnings: "$89,778"
        }
    ]

    return (
        <Col lg={6} xl={4}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Top Selling Products</h5>

                        <div className="ms-auto">
                            <Dropdown>
                                <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">View All<IconifyIcon icon="mdi:chevron-down" className="ms-1 fs-14" /></DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="#">Today</DropdownItem>
                                    <DropdownItem href="#">This Week</DropdownItem>
                                    <DropdownItem href="#">Last Week</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="p-0">
                    <div className="table-responsive">
                        <table className="table table-traffic mb-0">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Sold</th>
                                    <th>Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.map((product) => (
                                    <tr key={product.id}>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center">
                                                <span className="avatar mb-0 position-relative">
                                                    <img
                                                        className="avatar avatar-sm rounded-2 me-3 bg-primary-subtle rounded-circle p-1"
                                                        src={product.image}
                                                        alt={"product"}
                                                    />
                                                </span>
                                                <p className="mb-0 fs-14">{product.name}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-primary-subtle text-primary fw-semibold">{product.sold}</span>
                                        </td>
                                        <td>
                                            <p className="mb-0 fw-medium">{product.earnings}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>

            </Card>
        </Col>
    )
}

export default SellingProducts