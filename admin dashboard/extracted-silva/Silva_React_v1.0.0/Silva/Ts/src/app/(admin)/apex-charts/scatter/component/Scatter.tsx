import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getBasicScatterChart, getDatetimeScatterChart, getImagesScatterChart } from '../data'

const BasicScatterChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Basic Scatter Chart'>
                <ApexChartClient getOptions={getBasicScatterChart} series={getBasicScatterChart().series} type="scatter" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const DatetimeScatterChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Datetime Scatter Chart'>
                <ApexChartClient getOptions={getDatetimeScatterChart} series={getDatetimeScatterChart().series} type="scatter" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const ImagesScatterChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Datetime Scatter Chart'>
                <ApexChartClient getOptions={getImagesScatterChart} series={getImagesScatterChart().series} type="scatter" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}



const Scatter = () => {
    return (
        <>
            <Row>
                <BasicScatterChart />
                <DatetimeScatterChart />
            </Row>
            <Row>
                <ImagesScatterChart />
            </Row>

        </>
    )
}

export default Scatter