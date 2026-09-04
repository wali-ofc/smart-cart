import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getLineAreaChart, getLineColumAreaChart, getLineColumnChart, getLineScatterChart } from '../data'


const LineColumnChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Line & Column Chart'>
                <ApexChartClient getOptions={getLineColumnChart} series={getLineColumnChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const LineAreaChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Line & Area Chart'>
                <ApexChartClient getOptions={getLineAreaChart} series={getLineAreaChart().series} type="area" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}


const LineColumAreaChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Line & Column Area Chart'>
                <ApexChartClient getOptions={getLineColumAreaChart} series={getLineColumAreaChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const LineScatterChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Line Scatter Chart'>
                <ApexChartClient getOptions={getLineScatterChart} series={getLineScatterChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const MixedCharts = () => {
    return (
        <>
            <Row>
                <LineColumnChart />
                <LineAreaChart />
            </Row>
            <Row>
                <LineColumAreaChart />
                <LineScatterChart />
            </Row>
        </>
    )
}

export default MixedCharts