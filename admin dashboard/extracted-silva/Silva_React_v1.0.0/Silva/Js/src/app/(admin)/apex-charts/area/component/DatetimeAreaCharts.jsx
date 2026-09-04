import { Col } from 'react-bootstrap';
import CommonCard from '@/component/CommonCard';
import { getDatetimeAreaChart } from '../data';
import ReactApexChart from 'react-apexcharts';
const DatetimeAreaChart = () => {
    const chartOptions = getDatetimeAreaChart();
    const chartSeries = chartOptions.series || [];
    return <Col xl={12}>
        <CommonCard title="Datetime X-Axis Area Chart">
            <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350} className="apex-charts" />
        </CommonCard>
    </Col>;
};
export default DatetimeAreaChart;