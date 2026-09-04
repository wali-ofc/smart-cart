import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getBasicBoxChart, getBoxplotScatterChart, getHorizontalBoxPlot } from '../data'

const BasicBoxChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Basic Box Chart'>
                <ApexChartClient getOptions={getBasicBoxChart} series={getBasicBoxChart().series} type="boxPlot" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const BoxplotScatterChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Boxplot Scatter Chart'>
                <ApexChartClient getOptions={getBoxplotScatterChart} series={getBoxplotScatterChart().series} type="boxPlot" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const HorizontalBoxPlot = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Horizontal BoxPlot'>
                <ApexChartClient getOptions={getHorizontalBoxPlot} series={getHorizontalBoxPlot().series} type="boxPlot" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const BoxplotCharts = () => {
    return (
        <>
            <Row>
                <BasicBoxChart />
                <BoxplotScatterChart />
            </Row>
            <Row>
                <HorizontalBoxPlot />
            </Row>
        </>
    )
}

export default BoxplotCharts