import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useRef } from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Calendar = () => {
    const calendarRef = useRef<FullCalendar | null>(null);

    const getInitialView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 768 && window.innerWidth < 1200) {
                return 'timeGridWeek';
            } else if (window.innerWidth <= 768) {
                return 'listMonth';
            } else {
                return 'dayGridMonth';
            }
        }
        return 'dayGridMonth';
    };

    useEffect(() => {
        const handleResize = () => {
            if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                const newView = getInitialView();
                if (calendarApi.view.type !== newView) {
                    calendarApi.changeView(newView);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const prevBtn = document.querySelector('.fc-prev-button');
        const nextBtn = document.querySelector('.fc-next-button');

        if (prevBtn) {
            const root = createRoot(prevBtn);
            root.render(<FiChevronLeft size={18} />);
        }

        if (nextBtn) {
            const root = createRoot(nextBtn);
            root.render(<FiChevronRight size={18} />);
        }
    }, []);

    const events = [
        { title: 'All Day Event', start: '2018-01-01', className: 'event-warning border-warning' },
        { title: 'Long Event', start: '2018-01-07', end: '2018-01-10', className: 'event-secondary border-secondary' },
        { groupId: '999', title: 'Repeating Event', start: '2018-01-09T16:00:00', className: 'event-danger border-danger' },
        { groupId: '999', title: 'Repeating Event', start: '2018-01-16T16:00:00', className: 'event-primary border-primary' },
        { title: 'Conference', start: '2018-01-24', end: '2018-01-27', className: 'event-primary border-primary' },
        { title: 'Meeting', start: '2018-01-12T10:30:00', end: '2018-01-12T12:30:00', className: 'event-primary border-primary' },
        { title: 'Lunch', start: '2018-01-12T12:00:00', className: 'event-secondary border-secondary' },
        { title: 'Meeting', start: '2018-01-12T14:30:00', className: 'event-danger border-danger' },
        { title: 'Happy Hour', start: '2018-01-12T17:30:00', className: 'event-warning border-warning' },
        { title: 'Dinner', start: '2018-01-12T20:00:00', className: 'event-info border-info' },
        { title: 'Birthday Party', start: '2018-01-13T07:00:00', className: 'event-dark border-dark' },
        { title: 'Click for Google', url: 'http://google.com/', start: '2018-01-28', className: 'event-primary border-primary' }
    ];

    return (
        <Row>
            <Col xs={12}>
                <Row>
                    <Col xl={12} lg={12}>
                        <Card>
                            <CardBody className="app-calendar">
                                <FullCalendar
                                    ref={calendarRef}
                                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin]}
                                    timeZone="local"
                                    editable={true}
                                    selectable={true}
                                    initialView={getInitialView()}
                                    themeSystem="bootstrap"
                                    customButtons={{
                                        prev: {
                                            text: '',
                                            click: () => calendarRef.current?.getApi().prev(),
                                        },
                                        next: {
                                            text: '',
                                            click: () => calendarRef.current?.getApi().next(),
                                        },
                                    }}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                                    }}
                                    buttonText={{
                                        today: 'Today',
                                        month: 'Month',
                                        week: 'Week',
                                        day: 'Day',
                                        list: 'List',
                                    }}
                                    initialDate="2018-01-12"
                                    weekNumbers={true}
                                    dayMaxEvents={true}
                                    events={events}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Calendar;
