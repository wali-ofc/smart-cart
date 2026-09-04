import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import { getBarwithImagesChart, getBarwithMarkers, getBarwithNegativeValuesChart, getBasicBarChart, getCustomDataLabelsBar, getGroupedBarChart, getGroupedStackedBarChart, getPatternedChart, getReversedBarChart, getStackedBarChart, getStackedBars100Chart } from '../data'


const BasicBarChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Basic Bar Chart'>
                <ApexChartClient getOptions={getBasicBarChart} series={getBasicBarChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const GroupedBarChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Basic Bar Chart'>
                <ApexChartClient getOptions={getGroupedBarChart} series={getGroupedBarChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const GroupedStackedBarChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Grouped Stacked Bars Chart'>
                <ApexChartClient getOptions={getGroupedStackedBarChart} series={getGroupedStackedBarChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const BarwithNegativeValuesChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Bar with Negative Values'>
                <ApexChartClient getOptions={getBarwithNegativeValuesChart} series={getBarwithNegativeValuesChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}


const StackedBarChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Stacked Bar Chart'>
                <ApexChartClient getOptions={getStackedBarChart} series={getStackedBarChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const StackedBars100Chart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Stacked Bars 100'>
                <ApexChartClient getOptions={getStackedBars100Chart} series={getStackedBars100Chart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const BarwithMarkers = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Bar with Markers'>
                <ApexChartClient getOptions={getBarwithMarkers} series={getBarwithMarkers().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const ReversedBarChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Bar with Markers'>
                <ApexChartClient getOptions={getReversedBarChart} series={getReversedBarChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const CustomDataLabelsBar = () => {
    return (
        <Col lg={6}>
            <CommonCard title='CustomData Labels Bar'>
                <ApexChartClient getOptions={getCustomDataLabelsBar} series={getCustomDataLabelsBar().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}

const PatternedChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Patterned Chart'>
                <ApexChartClient getOptions={getPatternedChart} series={getPatternedChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}
const BarwithImagesChart = () => {
    return (
        <Col lg={6}>
            <CommonCard title='Bar with Images'>
                <ApexChartClient getOptions={getBarwithImagesChart} series={getBarwithImagesChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>
    )
}


const BarChart = () => {
    return (
        <>
            <Row>
                <BasicBarChart />
                <GroupedBarChart />
            </Row>
            <Row>
                <GroupedStackedBarChart />
                <BarwithNegativeValuesChart />
            </Row>

            <Row>
                <StackedBarChart />
                <StackedBars100Chart />
            </Row>

            <Row>
                <BarwithMarkers />
                <ReversedBarChart />
            </Row>

            <Row>
                <CustomDataLabelsBar />
                <PatternedChart />
            </Row>
            <Row>
                <BarwithImagesChart />
            </Row>
        </>
    )
}

export default BarChart