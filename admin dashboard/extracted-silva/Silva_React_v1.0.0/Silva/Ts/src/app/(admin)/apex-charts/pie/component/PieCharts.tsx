import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getDonutwithPatternChart, getGradientDonutPieChart, getMonochromePieChart, getSemiDonutPieChart, getSimpleDonutChart, getSimplePieChart } from '../data'


const SimplePieChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Simple Pie Chart'>
                <ApexChartClient getOptions={getSimplePieChart} series={getSimplePieChart().series} type="pie" height={300} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}
const SimpleDonutChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Simple Donut Chart'>
                <ApexChartClient getOptions={getSimpleDonutChart} series={getSimpleDonutChart().series} type="donut" height={300} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const MonochromePieChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Monochrome Pie Chart'>
                <ApexChartClient getOptions={getMonochromePieChart} series={getMonochromePieChart().series} type="pie" height={300} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const GradientDonutPieChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Monochrome Pie Chart'>
                <ApexChartClient getOptions={getGradientDonutPieChart} series={getGradientDonutPieChart().series} type="donut" height={300} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const SemiDonutPieChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Semi Donut Pie Chart'>
                <ApexChartClient getOptions={getSemiDonutPieChart} series={getSemiDonutPieChart().series} type="donut" height={300} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}
const DonutwithPatternChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Donut with Pattern Pie Chart'>
                <ApexChartClient getOptions={getDonutwithPatternChart} series={getDonutwithPatternChart().series} type="donut" height={300} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}



const PieCharts = () => {
    return (
        <>
            <Row>
                <SimplePieChart />
                <SimpleDonutChart />
            </Row>
            <Row>
                <MonochromePieChart />
                <GradientDonutPieChart />
            </Row>

            <Row>
                <SemiDonutPieChart />
                <DonutwithPatternChart />
            </Row>
        </>
    )
}

export default PieCharts