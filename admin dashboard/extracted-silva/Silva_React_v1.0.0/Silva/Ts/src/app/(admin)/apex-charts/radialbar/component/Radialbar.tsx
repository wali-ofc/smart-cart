import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getCustomAngleCircleRadialbarChart, getMultipleRadialbarChart, getGradientRadialbarChart, getSemiCircleGaugeChart, getSimpleRadialbarChart, getRadialbarswithImageChart, getStrokedGaugeChart } from '../data'

const SimpleRadialbarChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Donut with Pattern Pie Chart'>
                <ApexChartClient getOptions={getSimpleRadialbarChart} series={getSimpleRadialbarChart().series} type="radialBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const MultipleRadialbarChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Multiple Radialbar Chart'>
                <ApexChartClient getOptions={getMultipleRadialbarChart} series={getMultipleRadialbarChart().series} type="radialBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const CustomAngleCircleRadialbarChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Multiple Radialbar Chart'>
                <ApexChartClient getOptions={getCustomAngleCircleRadialbarChart} series={getCustomAngleCircleRadialbarChart().series} type="radialBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const GradientRadialbarChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Gradient Radialbar Chart'>
                <ApexChartClient getOptions={getGradientRadialbarChart} series={getGradientRadialbarChart().series} type="radialBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}


const RadialbarswithImageChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Gradient Radialbar Chart'>
                <ApexChartClient getOptions={getRadialbarswithImageChart} series={getRadialbarswithImageChart().series} type="radialBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const StrokedGaugeChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Stroked Gauge Chart'>
                <ApexChartClient getOptions={getStrokedGaugeChart} series={getStrokedGaugeChart().series} type="radialBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const SemiCircleGaugeChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Semi Circle Gauge Chart'>
                <ApexChartClient getOptions={getSemiCircleGaugeChart} series={getSemiCircleGaugeChart().series} type="radialBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}


const Radialbar = () => {
    return (
        <>
            <Row>
                <SimpleRadialbarChart />
                <MultipleRadialbarChart />
            </Row>
            <Row>
                <CustomAngleCircleRadialbarChart />
                <GradientRadialbarChart />
            </Row>

            <Row>
                <RadialbarswithImageChart />
                <StrokedGaugeChart />
            </Row>

            <Row>
                <SemiCircleGaugeChart />
            </Row>
        </>
    )
}

export default Radialbar