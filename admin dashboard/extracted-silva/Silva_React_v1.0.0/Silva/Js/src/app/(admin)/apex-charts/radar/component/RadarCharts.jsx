import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
import { getBasicRadarChart, getMultipleSeriesChart, getPolygonFillChart } from '../data';
const BasicRadarChart = () => {
  return <Col lg={6}>
            <CommonCard title='Basic Radar Chart'>
                <ApexChartClient getOptions={getBasicRadarChart} series={getBasicRadarChart().series} type="radar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const MultipleSeriesChart = () => {
  return <Col lg={6}>
            <CommonCard title='Radar Chart - Multiple Series'>
                <ApexChartClient getOptions={getMultipleSeriesChart} series={getMultipleSeriesChart().series} type="radar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const PolygonFillChart = () => {
  return <Col lg={6}>
            <CommonCard title='Radar Chart - Polygon Fill'>
                <ApexChartClient getOptions={getPolygonFillChart} series={getPolygonFillChart().series} type="radar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const RadarCharts = () => {
  return <>
            <Row>
                <BasicRadarChart />
                <MultipleSeriesChart />
            </Row>

            <Row>
                <PolygonFillChart />
            </Row>

        </>;
};
export default RadarCharts;