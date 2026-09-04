import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getBasicRangeAreaChart, getComboRangeAreaChart } from '../data'

const BasicRangeAreaChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Basic Timeline Chart'>
                <ApexChartClient getOptions={getBasicRangeAreaChart} series={getBasicRangeAreaChart().series} type="rangeArea" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const ComboRangeAreaChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Combo Range Area'>
                <ApexChartClient getOptions={getComboRangeAreaChart} series={getComboRangeAreaChart().series} type="rangeArea" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}


const RangArea = () => {
    return (
        <Row>
            <BasicRangeAreaChart />
            <ComboRangeAreaChart />
        </Row>
    )
}

export default RangArea