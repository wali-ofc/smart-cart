import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getAdvancedTimelineChart, getBasicTimelineChart, getDistributedTimelineChart, getDumbbellChart, getGroupRowsTimelineChart, getMultiSeriesTimeline } from '../data'


const BasicTimelineChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Basic Timeline Chart'>
                <ApexChartClient getOptions={getBasicTimelineChart} series={getBasicTimelineChart().series} type="rangeBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const DistributedTimelineChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Distributed Timeline'>
                <ApexChartClient getOptions={getDistributedTimelineChart} series={getDistributedTimelineChart().series} type="rangeBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const MultiSeriesTimeline = () => {
    return (
        <Col lg={6}>
            <CommonCard title='MultiSeries Timeline'>
                <ApexChartClient getOptions={getMultiSeriesTimeline} series={getMultiSeriesTimeline().series} type="rangeBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const AdvancedTimelineChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Advanced Timeline'>
                <ApexChartClient getOptions={getAdvancedTimelineChart} series={getAdvancedTimelineChart().series} type="rangeBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const MultipleSeriesGroupRowsTimeline = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Multiple Series Group Rows Timeline'>
                <ApexChartClient getOptions={getGroupRowsTimelineChart} series={getGroupRowsTimelineChart().series} type="rangeBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const DumbbellChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Dumbbell Horizontal Timeline'>
                <ApexChartClient getOptions={getDumbbellChart} series={getDumbbellChart().series} type="rangeBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const TimeLine = () => {
    return (
        <>
            <Row>
                <BasicTimelineChart />
                <DistributedTimelineChart />
            </Row>

            <Row>
                <MultiSeriesTimeline />
                <AdvancedTimelineChart />
            </Row>

            <Row>
                <MultipleSeriesGroupRowsTimeline />
                <DumbbellChart />
            </Row>
        </>
    )
}

export default TimeLine