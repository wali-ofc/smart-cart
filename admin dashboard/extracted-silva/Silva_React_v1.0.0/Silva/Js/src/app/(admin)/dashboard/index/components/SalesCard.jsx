import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const SalesCard = () => {
  const salesCardsData = [{
    id: 1,
    title: 'Total Customers',
    value: '3,456',
    trend: {
      value: '12.5%',
      isPositive: true
    },
    period: 'Last 7 days',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
                </svg>,
    bgColor: 'primary',
    borderColor: 'primary'
  }, {
    id: 2,
    title: 'Active Customers',
    value: '2,839',
    trend: {
      value: '1.5%',
      isPositive: false
    },
    period: 'Last 7 days',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 640 512">
                    <path fill="#ffffff" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4" />
                </svg>,
    bgColor: 'secondary',
    borderColor: 'secondary'
  }, {
    id: 3,
    title: 'Profit Total',
    value: '$7,254',
    trend: {
      value: '12.8%',
      isPositive: true
    },
    period: 'Last 7 days',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15" />
                </svg>,
    bgColor: 'danger',
    borderColor: 'danger'
  }, {
    id: 4,
    title: 'Expense Total',
    value: '$4,578',
    trend: {
      value: '18%',
      isPositive: false
    },
    period: 'Last 7 days',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M5.574 4.691c-.833.692-1.052 1.862-1.491 4.203l-.75 4c-.617 3.292-.926 4.938-.026 6.022C4.207 20 5.88 20 9.23 20h5.54c3.35 0 5.025 0 5.924-1.084c.9-1.084.591-2.73-.026-6.022l-.75-4c-.439-2.34-.658-3.511-1.491-4.203C17.593 4 16.403 4 14.02 4H9.98c-2.382 0-3.572 0-4.406.691" opacity="0.5" />
                    <path fill="#ffffff" d="M12 9.25a2.251 2.251 0 0 1-2.122-1.5a.75.75 0 1 0-1.414.5a3.751 3.751 0 0 0 7.073 0a.75.75 0 1 0-1.414-.5A2.251 2.251 0 0 1 12 9.25" />
                </svg>,
    bgColor: 'warning',
    borderColor: 'warning'
  }, {
    id: 5,
    title: 'Conversion Rate',
    value: '14.57%',
    trend: {
      value: '5.8%',
      isPositive: true
    },
    period: 'Last 7 days',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M5 19L19 5" />
                        <circle cx="7" cy="7" r="3" />
                        <circle cx="17" cy="17" r="3" />
                    </g>
                </svg>,
    bgColor: 'success',
    borderColor: 'success'
  }, {
    id: 6,
    title: 'Total Deals',
    value: '8,754',
    trend: {
      value: '4.5%',
      isPositive: true
    },
    period: 'Last 7 days',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9H6.659c-1.006 0-1.51 0-1.634-.309c-.125-.308.23-.672.941-1.398L8.211 5M5 15h12.341c1.006 0 1.51 0 1.634.309c.125.308-.23.672-.941 1.398L15.789 19" color="#ffffff" />
                </svg>,
    bgColor: 'dark',
    borderColor: 'dark'
  }];
  return <Col md={12} xl={5}>
            <Row className="g-3">
                {salesCardsData.map(card => <Col md={6} xl={6} key={card.id}>
                        <Card className="mb-0">
                            <CardBody>
                                <div className="widget-first">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className={`p-2 border border-${card.borderColor} border-opacity-10 bg-${card.bgColor}-subtle rounded-pill me-2`}>
                                            <div className={`bg-${card.bgColor} rounded-circle widget-size text-center`}>
                                                {card.icon}
                                            </div>
                                        </div>
                                        <p className="mb-0 text-dark fs-15">{card.title}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="mb-0 fs-22 text-black me-3">{card.value}</h3>
                                        <div className="text-center">
                                            <span className={`text-${card.trend.isPositive ? 'primary' : 'danger'} fs-14`}>
                                                <IconifyIcon icon={card.trend.isPositive ? "mdi:trending-up" : "mdi:trending-down"} className="fs-14 me-1" /> {card.trend.value}
                                            </span>
                                            <p className="text-dark fs-13 mb-0">{card.period}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>)}
            </Row>
        </Col>;
};
export default SalesCard;