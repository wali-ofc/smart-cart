import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
import { getBasicTreemapChart, getColorRangeChart, getDistributedChart, getMultipleSeriesChart } from '../data';
const BasicTreemapChart = () => {
  return <Col lg={6}>
            <CommonCard title='Advanced Timeline'>
                <ApexChartClient getOptions={getBasicTreemapChart} series={getBasicTreemapChart().series} type="treemap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const MultipleSeriesChart = () => {
  return <Col lg={6}>
            <CommonCard title='Multiple Series Chart'>
                <ApexChartClient getOptions={getMultipleSeriesChart} series={getMultipleSeriesChart().series} type="treemap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const ColorRangeChart = () => {
  return <Col lg={6}>
            <CommonCard title='Multiple Series Chart'>
                <ApexChartClient getOptions={getColorRangeChart} series={getColorRangeChart().series} type="treemap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const DistributedChart = () => {
  return <Col lg={6}>
            <CommonCard title='Distributed Treemap Charts (Different Color for each Cell)'>
                <ApexChartClient getOptions={getDistributedChart} series={getDistributedChart().series} type="treemap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const TreemapChart = () => {
  return <>
            <Row>
                <BasicTreemapChart />
                <MultipleSeriesChart />
            </Row>
            <Row>
                <ColorRangeChart />
                <DistributedChart />
            </Row>
        </>;
};
export default TreemapChart;