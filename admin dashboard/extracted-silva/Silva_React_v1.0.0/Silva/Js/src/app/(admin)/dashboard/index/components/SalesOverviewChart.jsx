import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { getBasicBarChart } from '../data';
const SalesOverviewChart = () => {
  return <Col md={12} xl={7}>
            <Card>
                <CardHeader className="card-header">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Sales Overview</h5>

                        <div className="ms-auto">
                            <Dropdown>
                                <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">This Month<IconifyIcon icon="mdi:chevron-down" className="ms-1 fs-14" /></DropdownToggle>
                                <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                    <DropdownItem className="dropdown-item" href="#">This Month</DropdownItem>
                                    <DropdownItem className="dropdown-item" href="#">Last Month</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <ApexChartClient getOptions={getBasicBarChart} series={getBasicBarChart().series} type="bar" height={353} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>;
};
export default SalesOverviewChart;