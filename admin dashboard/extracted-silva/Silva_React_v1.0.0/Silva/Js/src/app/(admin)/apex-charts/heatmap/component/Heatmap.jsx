import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
import { getHeatMapCharts, getMultipleColorsChart, getRangeColorsChart, getRoundedColorsChart } from '../data';
const HeatMapCharts = () => {
  return <Col lg={6}>
            <CommonCard title='Basic Box Chart'>
                <ApexChartClient getOptions={getHeatMapCharts} series={getHeatMapCharts().series} type="heatmap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const MultipleColorsChart = () => {
  return <Col lg={6}>
            <CommonCard title='Multiple Colors Chart'>
                <ApexChartClient getOptions={getMultipleColorsChart} series={getMultipleColorsChart().series} type="heatmap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const RangeColorsChart = () => {
  return <Col lg={6}>
            <CommonCard title='Range Colors Chart'>
                <ApexChartClient getOptions={getRangeColorsChart} series={getRangeColorsChart().series} type="heatmap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const RoundedColorsChart = () => {
  return <Col lg={6}>
            <CommonCard title='Rounded Colors Chart'>
                <ApexChartClient getOptions={getRoundedColorsChart} series={getRoundedColorsChart().series} type="heatmap" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const Heatmap = () => {
  return <>
            <Row>
                <HeatMapCharts />
                <MultipleColorsChart />
            </Row>
            <Row>
                <RangeColorsChart />
                <RoundedColorsChart />
            </Row>
        </>;
};
export default Heatmap;