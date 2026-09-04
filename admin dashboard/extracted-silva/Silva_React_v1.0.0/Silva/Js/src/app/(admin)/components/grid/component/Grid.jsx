import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
const Grid = () => {
  return <>
            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Grid Option</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col" className="text-center">
                                                xs<br />
                                                <span className="fw-normal">&lt;576px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                sm<br />
                                                <span className="fw-normal">≥576px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                md<br />
                                                <span className="fw-normal">≥768px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                lg<br />
                                                <span className="fw-normal">≥992px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                xl<br />
                                                <span className="fw-normal">≥1200px</span>
                                            </th>
                                            <th scope="col" className="text-center">
                                                xxl<br />
                                                <span className="fw-normal">≥1400px</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Grid behavior</th>
                                            <td>Horizontal at all times</td>
                                            <td colSpan={5}>Collapsed to start, horizontal above breakpoints</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Max container width</th>
                                            <td>None (auto)</td>
                                            <td>540px</td>
                                            <td>720px</td>
                                            <td>960px</td>
                                            <td>1140px</td>
                                            <td>1320px</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Class prefix</th>
                                            <td><code>.col-</code></td>
                                            <td><code>.col-sm-</code></td>
                                            <td><code>.col-md-</code></td>
                                            <td><code>.col-lg-</code></td>
                                            <td><code>.col-xl-</code></td>
                                            <td><code>.col-xxl-</code></td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row"># of columns</th>
                                            <td colSpan={6}>12</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Gutter width</th>
                                            <td colSpan={6}>24px (12px on each side of a column)</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Custom gutters</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Nestable</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Offsets</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Column ordering</th>
                                            <td colSpan={6}>Yes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>

                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <Card>

                        <CardHeader>
                            <h5 className="card-title mb-0">Equal Width</h5>
                        </CardHeader>

                        <CardBody>
                            <div>
                                <Row>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">1 of 1</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3">
                                <Row>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">1 of 2</div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">2 of 2</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3">
                                <Row>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">1 of 3</div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">2 of 3</div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">3 of 3</div>
                                    </Col>
                                </Row>
                            </div>

                        </CardBody>

                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Mix and Match</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="text-center">
                                <Row>
                                    <Col md={8}>
                                        <div className="p-3 border rounded bg-light">.col-md-8</div>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <div className="p-3 border rounded bg-light">.col-6 .col-md-4</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3 text-center">
                                <Row>
                                    <Col xs={6} md={4}>
                                        <div className="p-3 border rounded bg-light">.col-6 .col-md-4</div>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <div className="p-3 border rounded bg-light">.col-6 .col-md-4</div>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <div className="p-3 border rounded bg-light">.col-6 .col-md-4</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3 text-center">
                                <Row>
                                    <Col xs={6}>
                                        <div className="p-3 border rounded bg-light">.col-6</div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="p-3 border rounded bg-light">.col-6</div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Setting One Column</h5>
                        </CardHeader>

                        <CardBody>
                            <div>
                                <Row>
                                    <Col>
                                        <div className="p-3 border rounded bg-light"> 1 of 3</div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="p-3 border rounded bg-light">2 of 3 (wider)</div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">3 of 3</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3">
                                <Row>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">1 of 3</div>
                                    </Col>
                                    <Col xs={5}>
                                        <div className="p-3 border rounded bg-light">2 of 3 (wider)</div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">3 of 3</div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Variable width content</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="text-center">
                                <Row className="justify-content-md-center">
                                    <Col lg={2}>
                                        <div className="p-3 border rounded bg-light"> 1 of 3</div>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <div className="p-3 border rounded bg-light">Variable Width Content</div>
                                    </Col>
                                    <Col lg={2}>
                                        <div className="p-3 border rounded bg-light">3 of 3</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3">
                                <Row>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">1 of 3</div>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <div className="p-3 border rounded bg-light">Variable width content</div>
                                    </Col>
                                    <Col lg={2}>
                                        <div className="p-3 border rounded bg-light">3 of 3</div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>

                        <CardHeader>
                            <h5 className="card-title mb-0">All Breakpoints</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="text-center">
                                <Row>
                                    <Col>
                                        <div className="p-3 border rounded bg-light"> Col </div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">Col</div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">Col</div>
                                    </Col>
                                    <Col>
                                        <div className="p-3 border rounded bg-light">Col</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3 text-center">
                                <Row>
                                    <Col xs={8}>
                                        <div className="p-3 border rounded bg-light">col-8</div>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="p-3 border rounded bg-light">col-4</div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>

                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Stacked To Horizontal</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="text-center">
                                <Row>
                                    <Col sm={8}>
                                        <div className="p-3 border rounded bg-light">col-sm-8</div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="p-3 border rounded bg-light">col-sm-4</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-3 text-center">
                                <Row>
                                    <Col sm>
                                        <div className="p-3 border rounded bg-light">col-sm</div>
                                    </Col>
                                    <Col sm>
                                        <div className="p-3 border rounded bg-light">col-sm</div>
                                    </Col>
                                    <Col sm>
                                        <div className="p-3 border rounded bg-light">col-sm</div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>

                    </Card>
                </Col>

            </Row>

            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Row Columns</h5>
                        </CardHeader>

                        <CardBody>
                            <Row>
                                <Col xl={4}>
                                    <div>
                                        <Row className="row-cols-2 g-0">
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col xl={4}>

                                    <div>
                                        <Row className="row-cols-3 g-0">
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col xl={4}>
                                    <div>
                                        <Row className="row-cols-4 g-0">
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col xl={4} className="mt-3">
                                    <div>
                                        <Row className="row-cols-auto g-0">
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col xl={4} className="mt-3">
                                    <div>
                                        <Row className="row-cols-4 g-0">
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col xl={4} className="mt-3">
                                    <div>
                                        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 g-0">
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                            <Col>
                                                <div className="p-3 border bg-light">Column</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>
                        </CardBody>

                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Card>

                        <CardHeader>
                            <h5 className="card-title mb-0">Nesting</h5>
                        </CardHeader>

                        <CardBody>
                            <Row className="g-0 text-center">
                                <Col sm={3}>
                                    <div className="p-3 border bg-light">Level 1: .col-sm-3</div>
                                </Col>

                                <Col sm={9}>
                                    <div className="p-3 border bg-light">
                                        <Row className="g-0">
                                            <Col xs={8} sm={6}>
                                                <div className="p-1 border bg-light">Level 2: .col-8 .col-sm-6</div>
                                            </Col>
                                            <Col xs={4} sm={6}>
                                                <div className="p-1 border bg-light">Level 2: .col-4 .col-sm-6</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>
                        </CardBody>

                    </Card>
                </Col>
            </Row>
        </>;
};
export default Grid;