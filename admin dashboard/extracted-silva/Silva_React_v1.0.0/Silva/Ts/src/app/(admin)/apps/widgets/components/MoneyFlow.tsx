import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import { getChartMoneyChart } from '../data'

const MoneyFlow = () => {
    return (
        <Col md={12} xl={8}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Money Flow</h5>
                        <div className="ms-auto">
                            <Dropdown>
                                <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black">
                                    <IconifyIcon icon="mdi:currency-usd" className=' me-1 fs-14' />
                                    Profile
                                    <IconifyIcon icon="mdi:chevron-down" className=' ms-1 fs-14' />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="#">Profile</DropdownItem>
                                    <DropdownItem href="#">Income</DropdownItem>
                                    <DropdownItem href="#">Expense</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardHeader>

                <CardBody>
                    <ApexChartClient getOptions={getChartMoneyChart} series={getChartMoneyChart().series} type="bar" height={378} className="apex-charts" />
                </CardBody>
            </Card>
        </Col >
    )
}

export default MoneyFlow