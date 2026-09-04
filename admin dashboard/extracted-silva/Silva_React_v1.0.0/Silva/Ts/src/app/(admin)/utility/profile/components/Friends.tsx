import { Card, CardBody, Col, Row } from 'react-bootstrap'
import user11 from "@/assets/images/users/user-11.jpg"
import user3 from "@/assets/images/users/user-3.jpg"
import user5 from "@/assets/images/users/user-5.jpg"
import user8 from "@/assets/images/users/user-8.jpg"
import user9 from "@/assets/images/users/user-9.jpg"
import user4 from "@/assets/images/users/user-4.jpg"
import user12 from "@/assets/images/users/user-12.jpg"
import user2 from "@/assets/images/users/user-2.jpg"

const Friends = () => {
    return (
        <Row>
            <Col xs={12} md={3}>
                <Card className="border">
                    <CardBody>
                        <div className="text-center">
                            <img src={user11} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-primary-subtle rounded-2 text-primary mb-2 fw-normal">Team Member</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Jimmy L. Keener</h5>
                                <p className="mt-1 mb-0">JimmyLKeener@gmail.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-primary">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xs={12} md={3}>
                <Card className="border">
                    <CardBody>
                        <div className="text-center">
                            <img src={user3} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-dark-subtle rounded-2 text-dark mb-2 fw-normal">Team Member</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Paul D. Garner</h5>
                                <p className="mt-1 mb-0">PaulDGarner@armyspy.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-dark">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xs={12} md={3}>
                <Card className="border">
                    <CardBody>
                        <div className="text-center">
                            <img src={user5} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-secondary-subtle rounded-2 text-secondary mb-2 fw-normal">Team Member</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Dallas J. Miller</h5>
                                <p className="mt-1 mb-0">dallasinfo@gmail.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-secondary">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xs={12} md={3}>
                <Card className="border">
                    <CardBody>
                        <div className="text-center">
                            <img src={user8} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-danger-subtle rounded-2 text-danger mb-2 fw-normal">Team Member</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Kristin R. Hunter</h5>
                                <p className="mt-1 mb-0">kristinrhunter@gmail.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-danger">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xs={12} md={3}>
                <Card className="border mb-md-0">
                    <CardBody>
                        <div className="text-center">
                            <img src={user9} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-secondary-subtle rounded-2 text-secondary mb-2 fw-normal">Android Developer</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Jacqueline M. Dunn</h5>
                                <p className="mt-1 mb-0">jacquelinemdunn@gmail.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-secondary">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xs={12} md={3}>
                <Card className="border mb-md-0">
                    <CardBody>
                        <div className="text-center">
                            <img src={user4} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-primary-subtle rounded-2 text-primary mb-2 fw-normal">Team Member</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Ricky V. Johnson</h5>
                                <p className="mt-1 mb-0">rickyvjohnson@gmail.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-danger">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xs={12} md={3}>
                <Card className="border mb-md-0">
                    <CardBody>
                        <div className="text-center">
                            <img src={user12} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-warning-subtle rounded-2 text-warning mb-2 fw-normal">Software Developer</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Kenneth S. Cormier</h5>
                                <p className="mt-1 mb-0">kennethscormier@gmail.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-info">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xs={12} md={3}>
                <Card className="border mb-0">
                    <CardBody>
                        <div className="text-center">
                            <img src={user2} className="rounded-circle avatar-xl img-thumbnail" alt="image profile" />

                            <div className="mt-2 mb-3">
                                <span className="badge bg-danger-subtle rounded-2 text-danger mb-2 fw-normal">Team Leader</span>
                                <h5 className="m-0 fw-medium text-dark fs-16">Evelyn J. Serra</h5>
                                <p className="mt-1 mb-0">evelynjserra@gmail.com</p>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-sm btn-light me-2">Block</button>
                                <button type="button" className="btn btn-sm btn-warning">Unfollow</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row >
    )
}

export default Friends