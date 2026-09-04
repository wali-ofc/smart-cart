import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import { getTopLeadsChart } from '../data'

const TopLeads = () => {
    return (

        <Col md={12} xl={6}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Top Leads</h5>
                        <div className="ms-auto">
                            <Dropdown>
                                <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort by Created<IconifyIcon icon="mdi:chevron-down" className="ms-1 fs-14" /></DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="#">Created</DropdownItem>
                                    <DropdownItem href="#">Converted</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardHeader>

                <CardBody>
                    <ApexChartClient getOptions={getTopLeadsChart} series={getTopLeadsChart().series} type="bar" height={367} className="apex-charts mt-n3" />
                </CardBody>
            </Card>
        </Col>
    )
}

export default TopLeads