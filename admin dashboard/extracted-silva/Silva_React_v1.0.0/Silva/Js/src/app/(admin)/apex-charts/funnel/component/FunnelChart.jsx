import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
import { getFunnelAreaChart, getPyramidFunnelChart } from '../data';
const FunnelAreaChart = () => {
  return <Col lg={6}>
            <CommonCard title='Funnel Area Chart'>
                <ApexChartClient getOptions={getFunnelAreaChart} series={getFunnelAreaChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const PyramidFunnelChart = () => {
  return <Col lg={6}>
            <CommonCard title='Funnel Area Chart'>
                <ApexChartClient getOptions={getPyramidFunnelChart} series={getPyramidFunnelChart().series} type="bar" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const FunnelChart = () => {
  return <Row>
            <FunnelAreaChart />
            <PyramidFunnelChart />
        </Row>;
};
export default FunnelChart;