import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'


type evenetType = {
    title: string,
    description: string,
    time: string
}
const events: evenetType[] = [
    {
        title: 'Meeting with client',
        description: 'Zoom Conference',
        time: '9:00am - 10:00am',
    },
    {
        title: 'Event for music concert',
        description: 'Tomorrowland belgium',
        time: '11:00am - 1:00pm',
    },
    {
        title: 'General Team Meeting',
        description: 'Agenda for team growth',
        time: '2:00pm - 4:00pm',
    },
    {
        title: 'Project Manager Meeting',
        description: 'Project sprint and remaining work',
        time: '10:05am - 12:05pm',
    },
]

const UpcomingEvents = () => {
    return (
        <Col md={6} xl={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Upcoming Events</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <ul className="list-unstyled mb-0 upcoming-events-list">
                        {events.map((event, index) => (
                            <li key={index}>
                                <div className={`align-items-center d-flex justify-content-between border rounded-2 p-2 ${index === 0 ? 'events-before' : ''}`}>
                                    <div className="product-list">
                                        <div className="product-body align-self-center">
                                            <h6 className="m-0 fw-semibold">{event.title}</h6>
                                            <p className="mb-0 mt-1 text-muted">{event.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-muted">
                                            <i className="ri-time-line align-middle me-1 inline-block"></i>{event.time}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
        </Col>
    )
}

export default UpcomingEvents
