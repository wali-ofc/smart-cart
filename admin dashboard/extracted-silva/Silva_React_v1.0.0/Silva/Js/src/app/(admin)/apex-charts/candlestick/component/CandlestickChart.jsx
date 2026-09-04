import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
import { getBasicCandlestick, getComboCandlestick, getLineCandlestick } from '../data';
const BasicCandlestickChart = () => {
    return <Col lg={6}>
        <CommonCard title='Basic Candlestick'>
            <ApexChartClient getOptions={getBasicCandlestick} series={getBasicCandlestick().series} type="candlestick" height={350} className="apex-charts" />
        </CommonCard>
    </Col>;
};
const ComboCandlestick = () => {
    return <Col lg={6}>
        <CommonCard title='Combo Candlestick'>
            <ApexChartClient getOptions={getComboCandlestick} series={getComboCandlestick().series} type="candlestick" height={350} className="apex-charts" />
        </CommonCard>
    </Col>;
};
const LineCandlestick = () => {
    return <Col lg={6}>
        <CommonCard title='Line Candlestick'>
            <ApexChartClient getOptions={getLineCandlestick} series={getLineCandlestick().series} type="candlestick" height={350} className="apex-charts" />
        </CommonCard>
    </Col>;
};
const CandlestickChart = () => {
    return <>
        <Row>
            <BasicCandlestickChart />
            <ComboCandlestick />
        </Row>
        <Row>
            <LineCandlestick />
        </Row>
    </>;
};
export default CandlestickChart;