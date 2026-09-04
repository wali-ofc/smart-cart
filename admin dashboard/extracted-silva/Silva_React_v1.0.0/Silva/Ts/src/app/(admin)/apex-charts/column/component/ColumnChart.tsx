import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getBasicColumnChart, getColumnWithDataLabelsChart, getColumnWithMarkers, getColumnWithNegativeValues, getColumnWithRotatedLabelsChart, getDistributedColumnsChart, getDumbbellChart, getGroupedStackedColumns, getStackedColumn, getStackedColumn100 } from '../data'


const BasicColumnChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Basic Column Chart'>
                <ApexChartClient getOptions={getBasicColumnChart} series={getBasicColumnChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )   
}

const ColumnWithDataLabelsChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Column With Data Labels'>
                <ApexChartClient getOptions={getColumnWithDataLabelsChart} series={getColumnWithDataLabelsChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const StackedColumn = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Stacked Columns Chart'>
                <ApexChartClient getOptions={getStackedColumn} series={getStackedColumn().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const StackedColumn100 = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Stacked Column 100'>
                <ApexChartClient getOptions={getStackedColumn100} series={getStackedColumn100().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const GroupedStackedColumns = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Grouped Stacked Columns'>
                <ApexChartClient getOptions={getGroupedStackedColumns} series={getGroupedStackedColumns().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}


const DumbbellChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Grouped Stacked Columns'>
                <ApexChartClient getOptions={getDumbbellChart} series={getDumbbellChart().series} type="rangeBar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const ColumnWithMarkers = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Grouped Stacked Columns'>
                <ApexChartClient getOptions={getColumnWithMarkers} series={getColumnWithMarkers().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const DistributedColumnsChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Distributed Columns Chart'>
                <ApexChartClient getOptions={getDistributedColumnsChart} series={getDistributedColumnsChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const ColumnWithRotatedLabels = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Column With Rotated Labels'>
                <ApexChartClient getOptions={getColumnWithRotatedLabelsChart} series={getColumnWithRotatedLabelsChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const ColumnWithNegativeValues = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Column With Negative Values'>
                <ApexChartClient getOptions={getColumnWithNegativeValues} series={getColumnWithNegativeValues().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}


const ColumnChart = () => {
    return (
        <>
            <Row>
                <BasicColumnChart />
                <ColumnWithDataLabelsChart />
            </Row>
            <Row>
                <StackedColumn />
                <StackedColumn100 />
            </Row>
            <Row>
                <GroupedStackedColumns />
                <DumbbellChart />
            </Row>

            <Row>
                <ColumnWithMarkers />
                <DistributedColumnsChart />
            </Row>
            <Row>
                <ColumnWithRotatedLabels />
                <ColumnWithNegativeValues />
            </Row>
        </>
    )
}

export default ColumnChart

