import smallImg6 from "@/assets/images/small/img-6.jpg";
import smallImg1 from "@/assets/images/small/img-1.jpg";
import user5 from "@/assets/images/users/user-5.jpg";
import user6 from "@/assets/images/users/user-6.jpg";
import user4 from "@/assets/images/users/user-4.jpg";
import responsive from "@/assets/images/small/responsive.jpg";
import smallImg7 from "@/assets/images/small/img-7.jpg";
import user11 from "@/assets/images/users/user-11.jpg";
import user2 from "@/assets/images/users/user-2.jpg";
import user3 from "@/assets/images/users/user-3.jpg";
import user9 from "@/assets/images/users/user-9.jpg";
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
const Images = () => {
  return <>
            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Image Thumbnails</h5>
                        </CardHeader>

                        <CardBody>
                            <Row className="align-items-center">

                                <Col xl={6}>
                                    <img src={smallImg6} className="img-thumbnail img-fluid" alt="Thumbnails" data-holder-rendered="true" width="200" />
                                    <p className="mt-2 mb-lg-0"><code>.img-thumbnail</code></p>
                                </Col>

                                <Col xl={6}>
                                    <img src={user5} className="img-thumbnail rounded-circle avatar-xl img-fluid" alt="Thumbnails" />
                                    <p className="mt-2 mb-lg-0"><code>.img-thumbnail</code></p>
                                </Col>

                            </Row>
                        </CardBody>

                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Image Rounded & Circle</h5>
                        </CardHeader>

                        <CardBody>
                            <Row className="align-items-center">

                                <Col xl={6}>
                                    <img src={smallImg1} className="img-fluid rounded" alt="Thumbnails" data-holder-rendered="true" width="200" />
                                    <p className="mt-2 mb-lg-0"><code>.rounded</code></p>
                                </Col>

                                <Col xl={6}>
                                    <img src={user6} className="img-fluid rounded-circle avatar-xl" alt="Thumbnails" />
                                    <p className="mt-2 mb-lg-0"><code>.rounded-circle</code></p>
                                </Col>

                            </Row>
                        </CardBody>

                    </Card>
                </Col>

            </Row>

            <Row>
                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Media Object Default</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <img src={user4} className="avatar-sm rounded" alt="flex shrink" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    This is some content from a media component. You can replace this with any content and adjust it as needed.
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Media Object Center</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <img src={user4} className="avatar-sm rounded" alt="flex shrink" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    This is some content from a media component. You can replace this with any content and adjust it as needed.
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Media Object Bottom</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex align-items-end">
                                <div className="flex-shrink-0">
                                    <img src={user4} className=" avatar-sm rounded" alt="flex shrink" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    This is some content from a media component. You can replace this with any content and adjust it as needed.
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>


            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Responsive Images</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="">
                                <img src={responsive} className="img-fluid" alt="Responsive image" />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Figures</h5>
                        </CardHeader>

                        <CardBody>
                            <figure className="figure">
                                <img src={smallImg1} className="img-fluid figure-img rounded" alt="Figure img" />
                                <figcaption className="figure-caption">A caption for the above image.</figcaption>
                            </figure>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Figures</h5>
                        </CardHeader>

                        <CardBody>
                            <figure className="figure">
                                <img src={smallImg7} className="img-fluid figure-img rounded" alt="Figure img" />
                                <figcaption className="figure-caption text-end">A caption for the above image.</figcaption>
                            </figure>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Rounded Circle Image Sizes</h5>
                        </CardHeader>

                        <CardBody>
                            <Row>
                                <Col lg={2}>
                                    <div>
                                        <img src={user11} alt="" className="img-fluid rounded-circle avatar-xs" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-xs</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user2} alt="" className="img-fluid rounded-circle avatar-sm" />
                                        <p className="mt-2  mb-lg-0"><code>.avatar-sm</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user3} alt="" className="img-fluid rounded-circle avatar-md" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user4} alt="" className="img-fluid rounded-circle avatar-lg" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-md</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user5} alt="" className="img-fluid rounded-circle avatar-xl" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-lg</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user6} alt="" className="img-fluid rounded-circle avatar" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-xl</code></p>
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
                            <h5 className="card-title mb-0">Rounded Image Sizes</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="row">
                                <Col lg={2}>
                                    <div>
                                        <img src={user4} alt="" className="img-fluid rounded avatar-xs" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-xs</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user6} alt="" className="img-fluid rounded avatar-sm" />
                                        <p className="mt-2  mb-lg-0"><code>.avatar-sm</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user3} alt="" className="img-fluid rounded avatar-md" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user2} alt="" className="img-fluid rounded avatar-lg" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-md</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user5} alt="" className="img-fluid rounded avatar-xl" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-lg</code></p>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div>
                                        <img src={user9} alt="" className="img-fluid rounded avatar" />
                                        <p className="mt-2 mb-lg-0"><code>.avatar-xl</code></p>
                                    </div>
                                </Col>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Aligning Image</h5>
                        </CardHeader>

                        <CardBody>
                            <Row className="align-items-center">

                                <Col xl={6}>
                                    <div>
                                        <img src={user4} alt="" className="img-fluid rounded float-start" />
                                    </div>
                                </Col>

                                <Col xl={6}>
                                    <div>
                                        <img src={user6} alt="" className="img-fluid rounded float-end" />
                                    </div>
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>

                        <CardHeader>
                            <h5 className="card-title mb-0">Aligning Image</h5>
                        </CardHeader>

                        <CardBody>
                            <img src={user4} alt="" className="img-fluid rounded mx-auto d-block" />
                        </CardBody>

                    </Card>
                </Col>
            </Row>

        </>;
};
export default Images;