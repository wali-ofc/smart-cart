import { Alert, Card, Row, Col, CardHeader, CardBody } from 'react-bootstrap';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Link } from "react-router-dom";
const alertVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
const defaultAlerts = alertVariants.map(variant => ({
  variant,
  text: `A simple ${variant} alert—check it out!`
}));
const dismissibleAlerts = alertVariants.map(variant => ({
  variant,
  text: `A simple ${variant} alert—check it out!`,
  dismissible: true
}));
const linkAlerts = alertVariants.map(variant => ({
  variant,
  text: `A simple ${variant} alert with `,
  linkText: 'an example link'
}));
const iconMap = {
  primary: 'mdi:account-circle-outline',
  secondary: 'mdi:pencil-outline',
  success: 'mdi:check',
  danger: 'mdi:bag-personal',
  warning: 'mdi:alert-octagon-outline',
  info: 'mdi:triangle-outline',
  light: 'mdi:help-circle-outline',
  dark: 'mdi:weather-night'
};
const outlineAlerts = alertVariants.map(variant => ({
  variant,
  icon: iconMap[variant],
  text: `A simple ${variant} alert—check it out!`
}));
const Alerts = () => {
  return <>
            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Default Alerts</h5>
                        </CardHeader>
                        <CardBody>
                            {defaultAlerts.map((alert, idx) => <Alert key={idx} variant={alert.variant}>
                                    {alert.text}
                                </Alert>)}
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dismissing Alerts</h5>
                        </CardHeader>
                        <CardBody>
                            {dismissibleAlerts.map((alert, idx) => <Alert key={idx} variant={alert.variant} dismissible className="alert-dismissible fade show">
                                    {alert.text}
                                </Alert>)}
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Alerts Link Color</h5>
                        </CardHeader>
                        <CardBody>
                            {linkAlerts.map((alert, idx) => <Alert key={idx} variant={alert.variant}>
                                    {alert.text}
                                    <Link to="#" className="alert-link">{alert.linkText}</Link>. Give it a click if you like.
                                </Alert>)}
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Outline Alerts</h5>
                        </CardHeader>
                        <CardBody>
                            {outlineAlerts.map((alert, idx) => {
              const isLight = alert.variant === 'light';
              return <Alert key={idx} variant={alert.variant} dismissible className={`alert-outline ${isLight ? 'text-dark border' : `text-${alert.variant}`} alert-dismissible fade show mb-2`}>
                                        <IconifyIcon icon={alert.icon} className="me-2" />
                                        {alert.text}
                                    </Alert>;
            })}
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Additional Content</h5>
                        </CardHeader>
                        <CardBody>
                            <Alert variant="primary" className="mb-0">
                                <h4 className="alert-heading">Well done!</h4>
                                <p>
                                    Aww yeah, you successfully read this important alert message. This example text is going
                                    to run a bit longer so that you can see how spacing within an alert works with this kind
                                    of content.
                                </p>
                                <hr />
                                <p className="mb-0">
                                    Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                                </p>
                            </Alert>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>;
};
export default Alerts;