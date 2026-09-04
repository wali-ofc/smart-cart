import giuUser from "@/assets/images/users/user-6.jpg"
import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import CommonCard from '@/component/CommonCard'
import { Link } from "react-router-dom"
import { Col, Row } from 'react-bootstrap'
import { getAreaChartYear, getBasicAreaChart, getGitHubStyleAreaChart, getIrregularTimeseriesChart, getNegativeValuesAreaChart, getNetworkMonitoring, getSplineAreaChart, getStackedAreaChart } from '../data'
import DatetimeAreaCharts from './DatetimeAreaCharts'


const BasicAreaChart = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Basic Area Chart'>
                <ApexChartClient getOptions={getBasicAreaChart} series={getBasicAreaChart().series} type="area" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const SplineAreaChart = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Spline Area Chart'>
                <ApexChartClient getOptions={getSplineAreaChart} series={getSplineAreaChart().series} type="area" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const DatetimeAreaChart = () => {
    return (
        <Col xl={6}>
            <DatetimeAreaCharts />
        </Col >
    )
}


const NegativeValuesAreaChart = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Negative Values Area Chart'>
                <ApexChartClient getOptions={getNegativeValuesAreaChart} series={getNegativeValuesAreaChart().series} type="area" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const GithubStyleAreaChart = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Github Style Area Chart'>
                <div className="bg-light">
                    <ApexChartClient getOptions={getGitHubStyleAreaChart} series={getGitHubStyleAreaChart().series} type="area" height={140} className="apex-charts" />
                </div>

                <div className="github-style d-flex align-items-center my-2">
                    <div className="flex-shrink-0 me-2">
                        <img className="avatar-sm rounded" src={giuUser} data-hovercard-user-id="634573" alt="" />
                    </div>
                    <div className="flex-grow-1">
                        <Link to="#" className="font-size-14 text-body fw-medium">coder</Link>
                        <div className="cmeta text-muted font-size-11">
                            <span className="commits text-body fw-medium"></span> commits
                        </div>
                    </div>
                </div>

                <div className="bg-light">
                    <ApexChartClient getOptions={getAreaChartYear} series={getAreaChartYear().series} type="area" height={140} className="apex-charts" />
                </div>

            </CommonCard>
        </Col >
    )
}
const StackedAreaChart = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Stacked Area Chart'>
                <ApexChartClient getOptions={getStackedAreaChart} series={getStackedAreaChart().series} type="area" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const IrregularTimeseriesChart = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Irregular Timeseries Chart'>
                <ApexChartClient getOptions={getIrregularTimeseriesChart} series={getIrregularTimeseriesChart().series} type="area" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const NetworkMonitoring = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Area Chart With Null Values Chart'>
                <ApexChartClient getOptions={getNetworkMonitoring} series={getNetworkMonitoring().series} type="area" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const AreaChart = () => {
    return (
        <>
            <Row>
                <BasicAreaChart />
                <SplineAreaChart />
            </Row>
            <Row>
                <DatetimeAreaChart />
                <NegativeValuesAreaChart />
            </Row>
            <Row>
                <GithubStyleAreaChart />
                <StackedAreaChart />
            </Row>
            <Row>
                <IrregularTimeseriesChart />
                <NetworkMonitoring />
            </Row>

        </>
    )
}

export default AreaChart