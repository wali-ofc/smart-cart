import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { getProductActivityChart } from '../data';
import SalesByCountries from './SalesByCountries';
const ProductActivity = () => {
  const statistics = [{
    label: "To Be Packed",
    value: "157.880",
    svgColor: "#2786f1"
  }, {
    label: "Process Delivery",
    value: "198.254",
    svgColor: "#f59440"
  }, {
    label: "Delivery Done",
    value: "142.278",
    svgColor: "#522c8f"
  }];
  return <Col xl={4}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Product Activity</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xxl={6}>
                            <ApexChartClient getOptions={getProductActivityChart} series={getProductActivityChart().series} type="donut" height={180} className="apex-charts" />
                        </Col>

                        <Col xxl={6} className="align-self-center">
                            <h3 className="fs-18 fw-semibold text-black mb-3">Data Statistic</h3>
                            <ul className="list-unstyled mb-0">
                                {statistics.map((item, idx) => <li key={item.label} className={`list-item${idx === 2 ? " text-black" : ""} mb-2 align-self-center${idx === 2 ? " fs-15" : ""}`}>
                                        <div className="d-flex align-items-center justify-content-between fs-15">
                                            <div className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" className="me-0">
                                                    <path fill={item.svgColor} d="M4 8a4 4 0 1 1 8 0a4 4 0 0 1-8 0m4-2.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5" />
                                                </svg>
                                                <span className="text-black fw-normal">{item.label}</span>
                                            </div>
                                            <p className="mb-0 text-muted">{item.value}</p>
                                        </div>
                                    </li>)}
                            </ul>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <SalesByCountries />
        </Col>;
};
export default ProductActivity;