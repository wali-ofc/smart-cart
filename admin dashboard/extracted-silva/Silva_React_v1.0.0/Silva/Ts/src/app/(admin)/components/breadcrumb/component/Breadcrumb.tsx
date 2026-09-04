import { Link } from "react-router-dom"
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'

const Breadcrumb = () => {
    return (
        <>
            <Row>
                <Col xl={12}>

                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Default Breadcrumb</h5>
                        </CardHeader>

                        <CardBody>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                                </ol>
                            </nav>

                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                                </ol>
                            </nav>

                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="#">Library</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                                </ol>
                            </nav>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>

                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dividers Breadcrumb</h5>
                        </CardHeader>

                        <CardBody>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                                </ol>
                            </nav>

                            <nav
                                style={{
                                    // @ts-ignore: CSS custom properties are allowed
                                    ['--bs-breadcrumb-divider' as any]: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`
                                }}
                                aria-label="breadcrumb"
                            >
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                                </ol>
                            </nav>

                            <nav
                                style={{
                                    // @ts-ignore: CSS custom properties are allowed
                                    ['--bs-breadcrumb-divider' as any]: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`
                                }}
                                aria-label="breadcrumb"
                            >
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item" aria-current="page">Library</li>
                                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                                </ol>
                            </nav>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Breadcrumb