import CommonCard from '@/component/CommonCard';
import { useState } from 'react';
import { Col, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

const FlatpickrDatepicker = () => {
    const [basic, setBasic] = useState<Date[]>([])
    const [dateTime, setDateTime] = useState<Date[]>([])
    const [minMax, setMinMax] = useState<Date[]>([])
    const [minDate, setMinDate] = useState<Date[]>([])
    const [maxDate, setMaxDate] = useState<Date[]>([])
    const [today, setToday] = useState<Date[]>([new Date()])
    const [todayMax, setTodayMax] = useState<Date[]>([])
    const [disable, setDisable] = useState<Date[]>([])
    const [disableFunc, setDisableFunc] = useState<Date[]>([])
    const [multiple, setMultiple] = useState<Date[]>([])
    const [multipleConj, setMultipleConj] = useState<Date[]>([])
    const [range, setRange] = useState<Date[]>([])
    const [inlineDate, setInlineDate] = useState<Date[]>([new Date()])


    return (
        <Col xs={12}>
            <CommonCard title='Flatpickr Date picker' titleClass='mb-0'>
                <Row>
                    <Col xl={6}>
                        <FormGroup className="mb-3">
                            <FormLabel>Basic</FormLabel>
                            <Flatpickr
                                value={basic}
                                onChange={setBasic}
                                className="form-control"
                                placeholder="Basic datepicker"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Date & Time</FormLabel>
                            <Flatpickr
                                value={dateTime}
                                onChange={setDateTime}
                                options={{ enableTime: true, dateFormat: "Y-m-d H:i" }}
                                className="form-control"
                                placeholder="Date and Time"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>MinDate and MaxDate</FormLabel>
                            <Flatpickr
                                value={minMax}
                                onChange={setMinMax}
                                options={{
                                    minDate: "2024-01-01",
                                    maxDate: "2025-12-31"
                                }}
                                className="form-control"
                                placeholder="Mindate - Maxdate"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>MinDate</FormLabel>
                            <Flatpickr
                                value={minDate}
                                onChange={setMinDate}
                                options={{ minDate: "today" }}
                                className="form-control"
                                placeholder="Mindate"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>MaxDate</FormLabel>
                            <Flatpickr
                                value={maxDate}
                                onChange={setMaxDate}
                                options={{ maxDate: "2025-12-31" }}
                                className="form-control"
                                placeholder="Maxdate"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Today</FormLabel>
                            <Flatpickr
                                value={today}
                                onChange={setToday}
                                className="form-control"
                                placeholder="Today"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Today to maximum day</FormLabel>
                            <Flatpickr
                                value={todayMax}
                                onChange={setTodayMax}
                                options={{
                                    minDate: "today",
                                    maxDate: "2025-12-31"
                                }}
                                className="form-control"
                                placeholder="Today to maximum day"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Disabling dates</FormLabel>
                            <Flatpickr
                                value={disable}
                                onChange={setDisable}
                                options={{
                                    disable: ["2025-08-01", "2025-08-15"]
                                }}
                                className="form-control"
                                placeholder="Disabling dates"
                            />
                        </FormGroup>
                    </Col>

                    <Col xl={6}>
                        <FormGroup className="mb-3">
                            <FormLabel>Disabling dates by a function</FormLabel>
                            <Flatpickr
                                value={disableFunc}
                                onChange={setDisableFunc}
                                options={{
                                    disable: [
                                        function (date) {
                                            return date.getDay() === 0 || date.getDay() === 6
                                        }
                                    ]
                                }}
                                className="form-control"
                                placeholder="Disabling by functions"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Selecting multiple dates</FormLabel>
                            <Flatpickr
                                value={multiple}
                                onChange={setMultiple}
                                options={{
                                    mode: "multiple"
                                }}
                                className="form-control"
                                placeholder="Multiple dates"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Selecting multiple conjunction</FormLabel>
                            <Flatpickr
                                value={multipleConj}
                                onChange={setMultipleConj}
                                options={{
                                    mode: "multiple",
                                    conjunction: " | "
                                }}
                                className="form-control"
                                placeholder="Multiple with conjunction"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Range Calendar</FormLabel>
                            <Flatpickr
                                value={range}
                                onChange={setRange}
                                options={{ mode: "range" }}
                                className="form-control"
                                placeholder="Range Calendar"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Inline</FormLabel>
                            <Flatpickr
                                value={inlineDate}
                                onChange={setInlineDate}
                                options={{ inline: true }}
                                className="form-control"
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </CommonCard>
        </Col>
    )
}

const FlatpickrTimePicker = () => {
    const [time1, setTime1] = useState<Date | string>("");
    const [time2, setTime2] = useState<Date | string>("");
    const [time3, setTime3] = useState<Date | string>("");
    const [time4, setTime4] = useState<Date | string>("10:30");

    return (
        <Row>
            <Col xs={12}>
                <CommonCard title='Flatpickr Time Picker' titleClass='mb-0'>
                    <Row>
                        <Col xl={6}>
                            <div className="mb-3">
                                <label className="form-label">Time Picker</label>
                                <Flatpickr
                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i" }}
                                    className="form-control"
                                    placeholder="Basic timepicker"
                                    value={time1}
                                    onChange={([date]) => setTime1(date)}
                                />
                            </div>

                            <div className="mb-0">
                                <label className="form-label">24-hour Time Picker</label>
                                <Flatpickr
                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                                    className="form-control"
                                    placeholder="24-hour Time Picker"
                                    value={time2}
                                    onChange={([date]) => setTime2(date)}
                                />
                            </div>
                        </Col>

                        <Col xl={6}>
                            <div className="mb-3">
                                <label className="form-label">Time Picker w/ Limits</label>
                                <Flatpickr
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        minTime: "09:00",
                                        maxTime: "17:00",
                                    }}
                                    className="form-control"
                                    placeholder="Limits"
                                    value={time3}
                                    onChange={([date]) => setTime3(date)}
                                />
                            </div>

                            <div className="mb-0">
                                <label className="form-label">Preloading Time</label>
                                <Flatpickr
                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i" }}
                                    className="form-control"
                                    value={time4}
                                    onChange={([date]) => setTime4(date)}
                                />
                            </div>
                        </Col>
                    </Row>
                </CommonCard>
            </Col>
        </Row >
    );
};


const DatePickers = () => {
    return (
        <>
            <FlatpickrDatepicker />
            <FlatpickrTimePicker />
        </>
    )
}

export default DatePickers
