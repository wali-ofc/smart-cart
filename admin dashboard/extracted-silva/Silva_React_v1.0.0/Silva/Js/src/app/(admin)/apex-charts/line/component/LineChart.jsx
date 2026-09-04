import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
import { getAnnotationsChart, getBasicLineChart, getBrushLineChart, getBrushLineChart2, getDashedChart, getDataLabelChart, getGradientChart, getMissingDataChart, getSteplineChart, getSyncingChart, getSyncingChart2, getSyncingChartarea, getZoomableTimeseriesChart } from '../data';
import RealTimeCharts from './RealTimeChart';
const BasicLineChart = () => {
  return <Col xl={6}>
            <CommonCard title='Basic Line Chart'>
                <ApexChartClient getOptions={getBasicLineChart} series={getBasicLineChart().series} type="line" height={380} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const DataLabelChart = () => {
  return <Col xl={6}>
            <CommonCard title='Line with Data Labels Chart'>
                <ApexChartClient getOptions={getDataLabelChart} series={getDataLabelChart().series} type="line" height={380} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const ZoomableTimeseriesChart = () => {
  return <Col xl={6}>
            <CommonCard title='Zoomable Timeseries Chart'>
                <ApexChartClient getOptions={getZoomableTimeseriesChart} series={getZoomableTimeseriesChart().series} type="area" height={400} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const SyncingChart = () => {
  return <Col xl={6}>
            <CommonCard title='Syncing Chart'>
                <ApexChartClient getOptions={getSyncingChart} series={getSyncingChart().series} type="line" height={120} className="apex-charts" />
                <ApexChartClient getOptions={getSyncingChart2} series={getSyncingChart2().series} type="line" height={120} className="apex-charts" />
                <ApexChartClient getOptions={getSyncingChartarea} series={getSyncingChartarea().series} type="area" height={120} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const BrushChart = () => {
  return <Col xl={6}>
            <CommonCard title='Brush Chart'>
                <ApexChartClient getOptions={getBrushLineChart} series={getBrushLineChart().series} type="line" height={180} className="apex-charts" />
                <ApexChartClient getOptions={getBrushLineChart2} series={getBrushLineChart2().series} type="line" height={170} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const SteplineChart = () => {
  return <Col xl={6}>
            <CommonCard title='Stepline Chart'>
                <ApexChartClient getOptions={getSteplineChart} series={getSteplineChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const GradientChart = () => {
  return <Col xl={6}>
            <CommonCard title='Stepline Chart'>
                <ApexChartClient getOptions={getGradientChart} series={getGradientChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const MissingDataChart = () => {
  return <Col xl={6}>
            <CommonCard title='Missing Data/ Null Value Chart'>
                <ApexChartClient getOptions={getMissingDataChart} series={getMissingDataChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const RealTimeChart = () => {
  return <Col xl={6}>
            <CommonCard title='Realtime Chart'>
                <RealTimeCharts />
            </CommonCard>
        </Col>;
};
const DashedChart = () => {
  return <Col xl={6}>
            <CommonCard title='Dashed Chart'>
                <ApexChartClient getOptions={getDashedChart} series={getDashedChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const LiveChartWithAnnotationsChart = () => {
  return <Col xl={6}>
            <CommonCard title='Live Chart With Annotations Chart'>
                <ApexChartClient getOptions={getAnnotationsChart} series={getAnnotationsChart().series} type="line" height={350} className="apex-charts" />
            </CommonCard>
        </Col>;
};
const LineCharts = () => {
  return <>
            <Row>
                <BasicLineChart />
                <DataLabelChart />
            </Row>
            <Row>
                <ZoomableTimeseriesChart />
                <SyncingChart />
            </Row>

            <Row>
                <BrushChart />
                <SteplineChart />
            </Row>
            <Row>
                <GradientChart />
                <MissingDataChart />
            </Row>
            <Row>
                <RealTimeChart />
                <DashedChart />
            </Row>
            <Row>
                <LiveChartWithAnnotationsChart />
            </Row>
        </>;
};
export default LineCharts;