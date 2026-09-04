import {
    Card,
    CardBody,
    CardHeader,
    Carousel,
    CarouselCaption,
    CarouselItem,
    Col,
    Row,
} from "react-bootstrap"

import smallImg1 from "@/assets/images/small/img-1.jpg"
import smallImg2 from "@/assets/images/small/img-2.jpg"
import smallImg4 from "@/assets/images/small/img-4.jpg"
import smallImg5 from "@/assets/images/small/img-5.jpg"
import smallImg6 from "@/assets/images/small/img-6.jpg"
import smallImg7 from "@/assets/images/small/img-7.jpg"
import smallImg8 from "@/assets/images/small/img-8.jpg"
import smallImg9 from "@/assets/images/small/img-9.jpg"

const Carousels = () => {
    return (
        <Row className="gy-4">
            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Default Carousel</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Carousel className="carousel slide w-100">
                                <CarouselItem>
                                    <img src={smallImg7} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg8} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg5} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Indicators Carousel</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Carousel indicators className="carousel slide w-100">
                                <CarouselItem>
                                    <img src={smallImg2} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg1} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg5} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Captions Carousel</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Carousel indicators className="carousel slide w-100">
                                <CarouselItem>
                                    <img src={smallImg4} className="d-block w-100" alt="carousel" />
                                    <CarouselCaption className="d-none d-md-block">
                                        <h5>First slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </CarouselCaption>
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg2} className="d-block w-100" alt="carousel" />
                                    <CarouselCaption className="d-none d-md-block">
                                        <h5>Second slide label</h5>
                                        <p>Some representative placeholder content for the second slide.</p>
                                    </CarouselCaption>
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg7} className="d-block w-100" alt="carousel" />
                                    <CarouselCaption className="d-none d-md-block">
                                        <h5>Third slide label</h5>
                                        <p>Some representative placeholder content for the third slide.</p>
                                    </CarouselCaption>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Crossfade Carousel</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Carousel fade className="carousel slide w-100">
                                <CarouselItem>
                                    <img src={smallImg9} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg8} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg6} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Disable Touch Swiping</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Carousel touch={false} className="carousel slide w-100">
                                <CarouselItem>
                                    <img src={smallImg9} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg6} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg1} className="d-block w-100" alt="carousel" />
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Dark Variant</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Carousel variant="dark" className="carousel slide w-100">
                                <CarouselItem interval={10000}>
                                    <img src={smallImg8} className="d-block w-100" alt="carousel" />
                                    <CarouselCaption className="d-none d-md-block">
                                        <h5>First slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </CarouselCaption>
                                </CarouselItem>
                                <CarouselItem interval={2000}>
                                    <img src={smallImg1} className="d-block w-100" alt="carousel" />
                                    <CarouselCaption className="d-none d-md-block">
                                        <h5>Second slide label</h5>
                                        <p>Some representative placeholder content for the second slide.</p>
                                    </CarouselCaption>
                                </CarouselItem>
                                <CarouselItem>
                                    <img src={smallImg5} className="d-block w-100" alt="carousel" />
                                    <CarouselCaption className="d-none d-md-block">
                                        <h5>Third slide label</h5>
                                        <p>Some representative placeholder content for the third slide.</p>
                                    </CarouselCaption>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Carousels
