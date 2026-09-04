import ApexChartClient from "@/component/client-wrapper/ApexChartClient"
import CommonCard from "@/component/CommonCard"
import { Col, Row } from "react-bootstrap"
import { getBasicPolarareaChart, getMonochrome } from "../data"


const BasicPolarareaChart = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Basic Polararea Chart'>
                <ApexChartClient getOptions={getBasicPolarareaChart} series={getBasicPolarareaChart().series} type="polarArea" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}

const Monochrome = () => {
    return (
        <Col lg={6} >
            <CommonCard title='Basic Polararea Chart'>
                <ApexChartClient getOptions={getMonochrome} series={getMonochrome().series} type="polarArea" height={350} className="apex-charts" />
            </CommonCard>
        </Col >
    )
}
const Polararea = () => {
    return (
        <>
            <Row>
                <BasicPolarareaChart />
                <Monochrome />
            </Row>

        </>
    )
}

export default Polararea