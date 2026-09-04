import { Col, Container, Row } from 'react-bootstrap'
import IconifyIcon from '../wrapper/IconifyIcon'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid>
                <Row>
                    <Col className="fs-13 text-muted text-center">
                        &copy;{new Date().getFullYear()}- Made with <IconifyIcon icon="mdi:heart" className="text-danger"/> by  <Link to="#!" className="text-reset fw-semibold">Zoyothemes</Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer