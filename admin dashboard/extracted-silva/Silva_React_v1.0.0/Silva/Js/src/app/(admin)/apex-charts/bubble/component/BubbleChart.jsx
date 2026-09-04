import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
import { get3DChart, getBasicBoxChart } from '../data';
const BubbleCharts = () => {
    return <Col lg={6}>
        <CommonCard title='Simple Bubble Chart'>
            <ApexChartClient getOptions={getBasicBoxChart} series={getBasicBoxChart().series} type="bubble" height={350} className="apex-charts" />
        </CommonCard>
    </Col>;
};
const D3BubbleChart = () => {
    return <Col lg={6}>
        <CommonCard title='Simple Bubble Chart'>
            <ApexChartClient getOptions={get3DChart} series={get3DChart().series} type="bubble" height={350} className="apex-charts" />
        </CommonCard>
    </Col>;
};
const BubbleChart = () => {
    return <>
        <Row>
            <BubbleCharts />
            <D3BubbleChart />
        </Row>
    </>;
};
export default BubbleChart;