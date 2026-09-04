import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { Check } from 'react-feather'

const plans = [
    {
        icon: 'mdi:rocket',
        bgClass: 'bg-warning bg-opacity-10 text-warning',
        price: 24,
        title: 'Free',
        colorClass: 'text-warning',
        subtitle: 'Our free plans are a salf-service solution for small-sized terms to manage the ongoing project development workflow.',
        features: [
            '1 products',
            'Up to 500 subscribers',
            'Basic analytics',
            '12-hour support response time'
        ],
        btnType: 'a',
        btnClass: 'btn btn-outline-primary w-100 rounded-2 fw-medium',
    },
    {
        icon: 'mdi:account-supervisor',
        bgClass: 'bg-primary bg-opacity-10 text-primary',
        price: 32,
        title: 'Basic personal',
        colorClass: 'text-primary',
        subtitle: 'Our basic plans are a salf-service solution for small-sized terms to manage the ongoing project development workflow.',
        features: [
            '5 products',
            'Up to 1,000 subscribers',
            'Basic analytics',
            '24-hour support response time'
        ],
        btnType: 'link',
        btnClass: 'btn btn-primary w-100 rounded-2',
        cardBorder: 'border-primary border shadow-none'
    },
    {
        icon: 'mdi:office-building',
        bgClass: 'bg-info bg-opacity-10 text-info',
        price: 48,
        title: 'Startup',
        colorClass: 'text-info',
        subtitle: 'Offer a comprehensive, scalable solution, and tailored for larger terms, enabling seamless workflows and development workflow.',
        features: [
            '25 products',
            'Up to 10,000 subscribers',
            'Advanced analytics',
            '48-hour support response'
        ],
        btnType: 'a',
        btnClass: 'btn btn-outline-primary w-100 rounded-2 fw-medium',
    },
    {
        icon: 'mdi:rocket',
        bgClass: 'bg-warning bg-opacity-10 text-warning',
        price: 78,
        title: 'Enterprise',
        colorClass: 'text-warning',
        subtitle: 'Personalized subscribers solution for teams of any size, providing flexibility to adapt to specific project seamless and development workflow.',
        features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            'Unlimited User'
        ],
        btnType: 'link',
        btnClass: 'btn btn-outline-primary w-100 rounded-2 fw-medium',
    }
];

const PricingPlans = () => {
    return (
        <Row className="justify-content-center">
            <Col lg={12}>
                <div className="text-center">
                    <h3 className="mb-2">Pricing Plans</h3>
                    <p className="text-muted mb-5">
                        We have plans and prices that fit your business perfectly. Make your <br /> client site a success with our products.
                    </p>
                </div>

                <Row className="justify-content-center my-3">
                    {plans.map((plan, index) => (
                        <Col key={index} xl={3} md={6} className="pricing-box">
                            <Card className={`card-h-full ${plan.cardBorder || ''}`}>
                                {plan.btnType === 'link' ? (
                                    <CardBody className="inner-box p-4">
                                        <div className={`${plan.bgClass} rounded-3 px-2 py-1 d-inline-flex justify-content-center align-content-center`}>
                                            <IconifyIcon icon={plan.icon} className="fs-19" />
                                        </div>
                                        <div className="flex-shrink-0 pb-3 mb-1 mt-4">
                                            <h2 className="month mb-0">
                                                <sup className="fw-semibold"><small>$</small></sup>
                                                <span className="fw-semibold fs-28">{plan.price}</span>/
                                                <span className="fs-14 text-muted">month</span>
                                            </h2>
                                        </div>
                                        <div className="plan-header">
                                            <h5 className={`plan-title ${plan.colorClass}`}>{plan.title}</h5>
                                            <p className="plan-subtitle">{plan.subtitle}</p>
                                        </div>
                                        <ul className="flex-grow-1 plan-stats list-unstyled">
                                            {plan.features.map((feature, i) => (
                                                <li key={i}><Check className="check-icon text-primary me-2" />{feature}</li>
                                            ))}
                                        </ul>
                                        <div className="flex-shrink-0 text-center">
                                            <Link to="#" className={plan.btnClass}>Buy Plan</Link>
                                        </div>
                                    </CardBody>
                                ) : (
                                    <div className="inner-box card-body p-4">
                                        <div className={`${plan.bgClass} rounded-3 px-2 py-1 d-inline-flex justify-content-center align-content-center`}>
                                            <IconifyIcon icon={plan.icon} className="fs-19" />
                                        </div>
                                        <div className="flex-shrink-0 pb-3 mb-1 mt-4">
                                            <h2 className="month mb-0">
                                                <sup className="fw-semibold"><small>$</small></sup>
                                                <span className="fw-semibold fs-28">{plan.price}</span>/
                                                <span className="fs-14 text-muted">month</span>
                                            </h2>
                                        </div>
                                        <div className="plan-header">
                                            <h5 className={`plan-title ${plan.colorClass}`}>{plan.title}</h5>
                                            <p className="plan-subtitle">{plan.subtitle}</p>
                                        </div>
                                        <ul className="flex-grow-1 plan-stats list-unstyled">
                                            {plan.features.map((feature, i) => (
                                                <li key={i}><Check className="check-icon text-primary me-2" />{feature}</li>
                                            ))}
                                        </ul>
                                        <div className="flex-shrink-0 text-center">
                                            <Link to="#" className={plan.btnClass}>Buy Plan</Link>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default PricingPlans
