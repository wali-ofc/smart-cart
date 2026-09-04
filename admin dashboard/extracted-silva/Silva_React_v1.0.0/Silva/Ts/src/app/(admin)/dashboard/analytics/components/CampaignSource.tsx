import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'

const CampaignSource = () => {
    return (
        <Col xl={8}>
            <Card className="overflow-hidden">

                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Campaign Source</h5>
                    </div>
                </CardHeader>

                <CardBody className="mt-0">
                    <div className="table-responsive table-card mt-0">
                        <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                            <thead className="text-muted table-light">
                                <tr>
                                    <th scope="col" className="cursor-pointer">Source</th>
                                    <th scope="col" className="cursor-pointer">Medium</th>
                                    <th scope="col" className="cursor-pointer">Impression</th>
                                    <th scope="col" className="cursor-pointer">Campaign Name</th>
                                    <th scope="col" className="cursor-pointer">Clicks</th>
                                    <th scope="col" className="cursor-pointer">Cost</th>
                                    <th scope="col" className="cursor-pointer desc">Conversion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Google</td>
                                    <td>CPC</td>
                                    <td>3,432,18</td>
                                    <td>Summer Sale 2024</td>
                                    <td>4,819,21</td>
                                    <td>$2,876,23</td>
                                    <td>3,218,49</td>
                                </tr>
                                <tr>
                                    <td>Facebook</td>
                                    <td>Social</td>
                                    <td>4,432,18</td>
                                    <td>Holiday Promo</td>
                                    <td>1,224,56</td>
                                    <td>$4,983,40</td>
                                    <td>5,152,60</td>
                                </tr>
                                <tr>
                                    <td>Instagram</td>
                                    <td>Social</td>
                                    <td>6,159,32</td>
                                    <td>New Product Launch</td>
                                    <td>8,951,34</td>
                                    <td>$7,436,54</td>
                                    <td>4,254,41</td>
                                </tr>
                                <tr>
                                    <td>Twitter</td>
                                    <td>Social</td>
                                    <td>21,154,34</td>
                                    <td>Flash Sale</td>
                                    <td>12,018,30</td>
                                    <td>$12,543,01</td>
                                    <td>43,309,28</td>
                                </tr>
                                <tr>
                                    <td>Affiliate</td>
                                    <td>Affiliate</td>
                                    <td>34,154,31</td>
                                    <td>Partner Campaign</td>
                                    <td>11,018,30</td>
                                    <td>$18,650,58</td>
                                    <td>89,309,28</td>
                                </tr>
                                <tr>
                                    <td>YouTube</td>
                                    <td>Video</td>
                                    <td>14,154,31</td>
                                    <td>Partner Campaign</td>
                                    <td>18,018,30</td>
                                    <td>$47,650,58</td>
                                    <td>54,309,28</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default CampaignSource