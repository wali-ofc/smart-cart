import IconifyIcon from '@/component/wrapper/IconifyIcon'
import type { JSX } from 'react'
import { Card, CardHeader, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'react-bootstrap'

type CountrySales = {
    name: string
    value: string
    percent: string
    percentClass: string
    iconClass: string
    svg: JSX.Element
}

const countries: CountrySales[] = [
    {
        name: "United states",
        value: "$8,567k",
        percent: "40.8%",
        percentClass: "text-primary",
        iconClass: "mdi:chevron-up",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
                <path fill="#ed4c5c" d="M48 6.6C43.3 3.7 37.9 2 32 2v4.6z" /><path fill="#fff" d="M32 11.2h21.6C51.9 9.5 50 7.9 48 6.6H32z" /><path fill="#ed4c5c" d="M32 15.8h25.3c-1.1-1.7-2.3-3.2-3.6-4.6H32z" /><path fill="#fff" d="M32 20.4h27.7c-.7-1.6-1.5-3.2-2.4-4.6H32z" /><path fill="#ed4c5c" d="M32 25h29.2c-.4-1.6-.9-3.1-1.5-4.6H32z" /><path fill="#fff" d="M32 29.7h29.9c-.1-1.6-.4-3.1-.7-4.6H32z" /><path fill="#ed4c5c" d="M61.9 29.7H32V32H2c0 .8 0 1.5.1 2.3h59.8c.1-.8.1-1.5.1-2.3c0-.8 0-1.6-.1-2.3" /><path fill="#fff" d="M2.8 38.9h58.4c.4-1.5.6-3 .7-4.6H2.1c.1 1.5.3 3.1.7 4.6" /><path fill="#ed4c5c" d="M4.3 43.5h55.4c.6-1.5 1.1-3 1.5-4.6H2.8c.4 1.6.9 3.1 1.5 4.6" /><path fill="#fff" d="M6.7 48.1h50.6c.9-1.5 1.7-3 2.4-4.6H4.3c.7 1.6 1.5 3.1 2.4 4.6" /><path fill="#ed4c5c" d="M10.3 52.7h43.4c1.3-1.4 2.6-3 3.6-4.6H6.7c1 1.7 2.3 3.2 3.6 4.6" /><path fill="#fff" d="M15.9 57.3h32.2c2.1-1.3 3.9-2.9 5.6-4.6H10.3c1.7 1.8 3.6 3.3 5.6 4.6" /><path fill="#ed4c5c" d="M32 62c5.9 0 11.4-1.7 16.1-4.7H15.9c4.7 3 10.2 4.7 16.1 4.7" /><path fill="#428bc1" d="M16 6.6c-2.1 1.3-4 2.9-5.7 4.6c-1.4 1.4-2.6 3-3.6 4.6c-.9 1.5-1.8 3-2.4 4.6c-.6 1.5-1.1 3-1.5 4.6c-.4 1.5-.6 3-.7 4.6c-.1.8-.1 1.6-.1 2.4h30V2c-5.9 0-11.3 1.7-16 4.6" /><path fill="#fff" d="m25 3l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm20 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H15l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm12 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm2.8-14l1.2-.9l1.2.9l-.5-1.5l1.2-1h-1.5L13 9l-.5 1.5h-1.4l1.2.9zm-8 12l1.2-.9l1.2.9l-.5-1.5l1.2-1H5.5L5 21l-.5 1.5h-1c0 .1-.1.2-.1.3l.8.6z" />
            </svg>
        ),
    },
    {
        name: "Australia",
        value: "$8,567k",
        percent: "35.8%",
        percentClass: "text-danger",
        iconClass: "mdi:chevron-down",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
                <path fill="#2a5f9e" d="M32 2v10H12v20H2c0 16.6 13.4 30 30 30s30-13.4 30-30S48.6 2 32 2" /><path fill="#fff" d="M32 2c-4.7 0-9.1 1.1-13.1 3v6H11v7.9H5c-1.9 4-3 8.4-3 13.1h12V17l12 15h6v-7.5L23.6 14H32z" /><g fill="#ed4c5c"><path d="M15.4 14L30 32h2v-4.9L21.4 14z" /><path d="M32 5H18.9c-6 2.9-11 7.9-13.9 13.9V32h6V11h21z" /></g><path fill="#fff" d="m8 35.7l2.2-2.7l-.7 3.5l3.5.1l-3.1 1.6L12 41l-3.1-1.4L8 43l-.9-3.4L4 41l2.1-2.8L3 36.6l3.5-.1l-.7-3.5zm44-15.5l1.8-2.2l-.6 2.8l2.8.1l-2.5 1.3l1.7 2.2l-2.5-1.2L52 26l-.7-2.8l-2.5 1.2l1.7-2.2l-2.5-1.3l2.8-.1l-.6-2.8zm0 20l1.8-2.2l-.6 2.8l2.8.1l-2.5 1.3l1.7 2.2l-2.5-1.2L52 46l-.7-2.8l-2.5 1.2l1.7-2.2l-2.5-1.3l2.8-.1l-.6-2.8zm-10-14l1.8-2.2l-.6 2.8l2.8.1l-2.5 1.3l1.7 2.2l-2.5-1.2L42 32l-.7-2.8l-2.5 1.2l1.7-2.2l-2.5-1.3l2.8-.1l-.6-2.8z" />
            </svg>
        ),
    },
    {
        name: "India",
        value: "$8,567k",
        percent: "55.8%",
        percentClass: "text-primary",
        iconClass: "mdi:chevron-up",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
                <path fill="#f2b200" d="M31.8 2c-13 0-24.1 8.4-28.2 20h56.6C56 10.4 44.9 2 31.8 2" /><path fill="#83bf4f" d="M31.8 62c13.1 0 24.2-8.3 28.3-20H3.6c4.1 11.7 15.2 20 28.2 20" /><path fill="#fff" d="M3.6 22c-1.1 3.1-1.7 6.5-1.7 10s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10z" /><circle cx="31.8" cy="32" r="8" fill="#428bc1" /><circle cx="31.8" cy="32" r="7" fill="#fff" /><g fill="#428bc1"><circle cx="29.2" cy="25.5" r=".5" /><circle cx="27.6" cy="26.4" r=".5" /><circle cx="26.3" cy="27.7" r=".5" /><circle cx="25.4" cy="29.3" r=".5" /><circle cx="24.9" cy="31.1" r=".5" /><circle cx="24.9" cy="32.9" r=".5" /><circle cx="25.4" cy="34.7" r=".5" /><circle cx="26.3" cy="36.3" r=".5" /><circle cx="27.6" cy="37.6" r=".5" /><circle cx="29.2" cy="38.5" r=".5" /><circle cx="30.9" cy="38.9" r=".5" /><path d="M32.3 39c0-.3.2-.5.4-.6c.3 0 .5.2.6.4c0 .3-.2.5-.4.6c-.4.1-.6-.1-.6-.4" /><circle cx="34.5" cy="38.5" r=".5" /><circle cx="36.1" cy="37.6" r=".5" /><circle cx="37.4" cy="36.3" r=".5" /><circle cx="38.3" cy="34.7" r=".5" /><circle cx="38.8" cy="32.9" r=".5" /><path d="M38.8 31.6c-.3 0-.5-.2-.6-.4c0-.3.2-.5.4-.6c.3 0 .5.2.6.4c.1.3-.1.5-.4.6" /><circle cx="38.3" cy="29.3" r=".5" /><circle cx="37.4" cy="27.7" r=".5" /><circle cx="36.1" cy="26.4" r=".5" /><path d="M35 25.7c-.1.3-.4.4-.7.3c-.3-.1-.4-.4-.3-.7c.1-.3.4-.4.7-.3c.3.2.4.5.3.7m-1.8-.6c0 .3-.3.5-.6.4c-.3 0-.5-.3-.4-.6c0-.3.3-.5.6-.4c.3.1.5.4.4.6m-1.8-.1c0 .3-.2.5-.4.6c-.3 0-.5-.2-.6-.4c0-.3.2-.5.4-.6c.3-.1.6.1.6.4" /><circle cx="31.8" cy="32" r="1.5" /><path d="m31.8 25l-.2 4.3l.2 2.7l.3-2.7zm-1.8.2l.9 4.3l.9 2.5l-.4-2.7z" /><path d="m28.3 25.9l2 3.9l1.5 2.2l-1.1-2.5zM26.9 27l2.9 3.3l2 1.7l-1.7-2.1z" /><path d="m25.8 28.5l3.6 2.4l2.4 1.1l-2.2-1.6z" /><path d="m25.1 30.2l4.1 1.3l2.6.5l-2.5-.9zm-.3 1.8l4.4.2l2.6-.2l-2.6-.2z" /><path d="m25.1 33.8l4.2-.9l2.5-.9l-2.6.5zm.7 1.7l3.8-1.9l2.2-1.6l-2.4 1.1z" /><path d="m26.9 36.9l3.2-2.8l1.7-2.1l-2 1.7zm1.4 1.2l2.4-3.7l1.1-2.4l-1.5 2.2z" /><path d="m30 38.8l1.4-4.1l.4-2.7l-.9 2.5zm1.8.2l.3-4.3l-.3-2.7l-.2 2.7zm1.8-.2l-.8-4.3l-1-2.5l.5 2.7z" /><path d="m35.3 38.1l-1.9-3.9l-1.6-2.2l1.2 2.5zm1.5-1.2l-2.9-3.2l-2.1-1.7l1.8 2.1z" /><path d="m37.9 35.5l-3.6-2.4l-2.5-1.1l2.2 1.6zm.7-1.7l-4.1-1.3l-2.7-.5l2.6.9zm.2-1.8l-4.3-.3l-2.7.3l2.7.2zm-.2-1.8l-4.2.9l-2.6.9l2.7-.5z" /><path d="M37.9 28.5L34 30.4L31.8 32l2.5-1.1zm-1.1-1.4l-3.2 2.8l-1.8 2.1l2.1-1.7z" /><path d="M35.3 25.9L33 29.6L31.8 32l1.6-2.2z" /><path d="m33.7 25.2l-1.4 4.1l-.5 2.7l1-2.5z" /></g>
            </svg>
        ),
    },
    {
        name: "Canada",
        value: "$8,567k",
        percent: "30.0%",
        percentClass: "text-danger",
        iconClass: "mdi:chevron-down",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64"><path fill="#f9f9f9" d="M48 6.6C43.4 3.7 37.9 2 32 2S20.6 3.7 16 6.6v50.7c4.6 2.9 10.1 4.6 16 4.6s11.4-1.7 16-4.6z" /><path fill="#ed4c5c" d="M48 6.6v50.7c8.4-5.2 14-14.8 14-25.4s-5.6-20-14-25.3m-32 0C7.6 11.9 2 21.5 2 32s5.6 20.1 14 25.4zm26.9 25c-.4-.2-.5-.6-.4-.8l1-3.6l-3.5.7c-.1 0-.5 0-.6-.7l-.3-1.2l-2.4 2.8s-1.6 1.7-1.1-.9l1-5.5l-1.9 1c-.1 0-.5.1-1-.9L32 19l-1.8 3.3c-.5 1-.9.9-1 .9l-1.9-1l1 5.5c.5 2.6-1.1.9-1.1.9l-2.4-2.8l-.3 1.2c-.2.7-.5.7-.6.7l-3.5-.7l1 3.6c0 .3 0 .6-.4.8l-1 .6s4 3.2 5.3 4.3c.3.2.9.8.7 1.5l-.5 1.4l5.5-.8c.3 0 .9 0 .8.9l-.3 5.7h1l-.3-5.7c0-.9.6-.9.8-.9l5.5.8l-.5-1.4c-.2-.7.4-1.3.7-1.5C40 35.2 44 32 44 32z" /></svg>
        ),
    },
    {
        name: "New Zealand",
        value: "$8,567k",
        percent: "68.8%",
        percentClass: "text-primary",
        iconClass: "mdi:chevron-up",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
                <path fill="#2a5f9e" d="M32 2v10H12v20H2c0 16.6 13.4 30 30 30s30-13.4 30-30S48.6 2 32 2" /><g fill="#fff"><path d="M14 8C6.7 13.5 2 22.2 2 32h12z" /><path d="M8 14h24V2C22.2 2 13.5 6.7 8 14" /><path d="M9.8 11.8L26 32h6v-7.5L17.1 5.9c-2.7 1.6-5.2 3.6-7.3 5.9" /></g><g fill="#ed4c5c"><path d="M32 5H18.9c-6 2.9-11 7.9-13.9 13.9V32h6V11h21z" /><path d="M32 27.1L19 11h-6l17 21h2z" /></g><path fill="#fff" d="m37.1 32l1-2.9l-2.7-1.9h3.4l1-2.8l1 2.8h3.4l-2.7 1.9l1 2.9l-2.7-1.8z" /><path fill="#ed4c5c" d="m39.8 29.5l1.6 1.1l-.6-1.8l1.6-1.1h-2l-.6-1.7l-.6 1.7h-2l1.6 1.1l-.6 1.8z" /><path fill="#fff" d="m54.6 32l1-2.9l-2.7-1.9h3.4l1-2.8l1 2.8h3.4L59 29.1l1 2.9l-2.7-1.8z" /><path fill="#ed4c5c" d="m57.3 29.5l1.6 1.1l-.6-1.8l1.6-1.1h-2l-.6-1.7l-.6 1.7h-2l1.6 1.1l-.6 1.8z" /><path fill="#fff" d="m45.9 21.7l1-2.9l-2.7-1.9h3.4l1-2.8l1 2.8H53l-2.7 1.9l1 2.9l-2.7-1.8z" /><path fill="#ed4c5c" d="m48.5 19.2l1.6 1.1l-.6-1.8l1.6-1.1h-1.9l-.7-1.7l-.5 1.7h-2l1.6 1.1l-.6 1.8z" /><path fill="#fff" d="m45 48.7l1.3-3.8l-3.6-2.5h4.5l1.3-3.7l1.3 3.7h4.4l-3.6 2.5l1.3 3.8l-3.5-2.4z" /><path fill="#ed4c5c" d="m48.5 45.4l2.1 1.4l-.7-2.3l2-1.5h-2.5l-.9-2.2l-.7 2.2h-2.6l2 1.5l-.7 2.3z" /><path fill="#fff" d="M12.6 11h12.2v3H12.6z" />
            </svg>
        ),
    },
]

const SalesByCountries = () => {
    return (
        <Col md={12} xl={4}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Sales by Countries</h5>
                        <div className="ms-auto">
                            <Dropdown>
                                <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black" id="dropdown-sales-countries">
                                    View All<IconifyIcon icon="mdi:chevron-down" className="ms-1 fs-14" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="#">Today</DropdownItem>
                                    <DropdownItem href="#">This Week</DropdownItem>
                                    <DropdownItem href="#">Last Week</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <ul className="p-0 m-0">
                        {countries.map((country) => (
                            <li className="d-flex align-items-center mb-3" key={country.name}>
                                <div className="avatar flex-shrink-0 me-3">
                                    {country.svg}
                                </div>
                                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                        <div className="d-flex align-items-center">
                                            <h6 className="mb-0 me-1 fs-15 fw-semibold text-black">{country.value}</h6>
                                        </div>
                                        <small className="text-muted fw-semibold">{country.name}</small>
                                    </div>
                                    <div className="user-progress">
                                        <p className={`${country.percentClass} fw-medium mb-0 d-flex align-items-center gap-1`}>
                                            <IconifyIcon icon={country.iconClass} className='fs-20' />
                                            {country.percent}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
        </Col>
    )
}

export default SalesByCountries