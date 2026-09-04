import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'

const TopPerforming = () => {
    return (
        <Col md={12} xl={6}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Top Performing Pages</h5>
                    </div>
                </CardHeader>

                <CardBody className="mt-0">
                    <div className="table-responsive table-card mt-0">
                        <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                            <thead className="text-muted table-light">
                                <tr>
                                    <th className="width-xxl cursor-pointer" colSpan={2}>Pages</th>
                                    <th className="width-sm cursor-pointer text-end pe-0" colSpan={2}>Click</th>
                                    <th className="cursor-pointer width-sm text-end" colSpan={2}>Avg.position</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>Index</td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">1,101</span>
                                            <span className="text-danger d-block text-end fs-14">-435</span>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">3.58</span>
                                            <span className="text-danger d-block text-end fs-14">-2.45</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>Blog</td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">657</span>
                                            <span className="text-danger d-block text-end fs-14">-535</span>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">2.35</span>
                                            <span className="text-danger d-block text-end fs-14">-1.05</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>Products</td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">745</span>
                                            <span className="text-success d-block text-end fs-14">935</span>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">3.58</span>
                                            <span className="text-success d-block text-end fs-14">2.45</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>Licenses</td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">1,587</span>
                                            <span className="text-danger d-block text-end fs-14">235</span>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">7.47</span>
                                            <span className="text-danger d-block text-end fs-14">-3.89</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>Affiliate</td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">1,947</span>
                                            <span className="text-success d-block text-end fs-14">635</span>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">4.58</span>
                                            <span className="text-success d-block text-end fs-14">3.45</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>Socials</td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">1,247</span>
                                            <span className="text-danger d-block text-end fs-14">-735</span>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">4.41</span>
                                            <span className="text-danger d-block text-end fs-14">-3.21</span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>zoyothemes.com</td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">847</span>
                                            <span className="text-danger d-block text-end fs-14">-562</span>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-end">
                                            <span className="text-black fs-14 me-3">2.57</span>
                                            <span className="text-danger d-block text-end fs-14">-1.21</span>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default TopPerforming