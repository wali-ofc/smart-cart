import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
const countries = [{
  name: "USA",
  percent: 65,
  progressClass: "bg-primary",
  svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
                <path fill="#ed4c5c" d="M48 6.6C43.3 3.7 37.9 2 32 2v4.6z" /><path fill="#fff" d="M32 11.2h21.6C51.9 9.5 50 7.9 48 6.6H32z" /><path fill="#ed4c5c" d="M32 15.8h25.3c-1.1-1.7-2.3-3.2-3.6-4.6H32z" /><path fill="#fff" d="M32 20.4h27.7c-.7-1.6-1.5-3.2-2.4-4.6H32z" /><path fill="#ed4c5c" d="M32 25h29.2c-.4-1.6-.9-3.1-1.5-4.6H32z" /><path fill="#fff" d="M32 29.7h29.9c-.1-1.6-.4-3.1-.7-4.6H32z" /><path fill="#ed4c5c" d="M61.9 29.7H32V32H2c0 .8 0 1.5.1 2.3h59.8c.1-.8.1-1.5.1-2.3c0-.8 0-1.6-.1-2.3" /><path fill="#fff" d="M2.8 38.9h58.4c.4-1.5.6-3 .7-4.6H2.1c.1 1.5.3 3.1.7 4.6" /><path fill="#ed4c5c" d="M4.3 43.5h55.4c.6-1.5 1.1-3 1.5-4.6H2.8c.4 1.6.9 3.1 1.5 4.6" /><path fill="#fff" d="M6.7 48.1h50.6c.9-1.5 1.7-3 2.4-4.6H4.3c.7 1.6 1.5 3.1 2.4 4.6" /><path fill="#ed4c5c" d="M10.3 52.7h43.4c1.3-1.4 2.6-3 3.6-4.6H6.7c1 1.7 2.3 3.2 3.6 4.6" /><path fill="#fff" d="M15.9 57.3h32.2c2.1-1.3 3.9-2.9 5.6-4.6H10.3c1.7 1.8 3.6 3.3 5.6 4.6" /><path fill="#ed4c5c" d="M32 62c5.9 0 11.4-1.7 16.1-4.7H15.9c4.7 3 10.2 4.7 16.1 4.7" /><path fill="#428bc1" d="M16 6.6c-2.1 1.3-4 2.9-5.7 4.6c-1.4 1.4-2.6 3-3.6 4.6c-.9 1.5-1.8 3-2.4 4.6c-.6 1.5-1.1 3-1.5 4.6c-.4 1.5-.6 3-.7 4.6c-.1.8-.1 1.6-.1 2.4h30V2c-5.9 0-11.3 1.7-16 4.6" /><path fill="#fff" d="m25 3l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm20 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H15l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm12 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm2.8-14l1.2-.9l1.2.9l-.5-1.5l1.2-1h-1.5L13 9l-.5 1.5h-1.4l1.2.9zm-8 12l1.2-.9l1.2.9l-.5-1.5l1.2-1H5.5L5 21l-.5 1.5h-1c0 .1-.1.2-.1.3l.8.6z" />
            </svg>
}, {
  name: "Australia",
  percent: 89,
  progressClass: "bg-secondary",
  svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
                <path fill="#2a5f9e" d="M32 2v10H12v20H2c0 16.6 13.4 30 30 30s30-13.4 30-30S48.6 2 32 2" /><path fill="#fff" d="M32 2c-4.7 0-9.1 1.1-13.1 3v6H11v7.9H5c-1.9 4-3 8.4-3 13.1h12V17l12 15h6v-7.5L23.6 14H32z" /><g fill="#ed4c5c"><path d="M15.4 14L30 32h2v-4.9L21.4 14z" /><path d="M32 5H18.9c-6 2.9-11 7.9-13.9 13.9V32h6V11h21z" /></g><path fill="#fff" d="m8 35.7l2.2-2.7l-.7 3.5l3.5.1l-3.1 1.6L12 41l-3.1-1.4L8 43l-.9-3.4L4 41l2.1-2.8L3 36.6l3.5-.1l-.7-3.5zm44-15.5l1.8-2.2l-.6 2.8l2.8.1l-2.5 1.3l1.7 2.2l-2.5-1.2L52 26l-.7-2.8l-2.5 1.2l1.7-2.2l-2.5-1.3l2.8-.1l-.6-2.8zm0 20l1.8-2.2l-.6 2.8l2.8.1l-2.5 1.3l1.7 2.2l-2.5-1.2L52 46l-.7-2.8l-2.5 1.2l1.7-2.2l-2.5-1.3l2.8-.1l-.6-2.8zm-10-14l1.8-2.2l-.6 2.8l2.8.1l-2.5 1.3l1.7 2.2l-2.5-1.2L42 32l-.7-2.8l-2.5 1.2l1.7-2.2l-2.5-1.3l2.8-.1l-.6-2.8z" />
            </svg>
}, {
  name: "India",
  percent: 78,
  progressClass: "bg-success",
  svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
                <path fill="#f2b200" d="M31.8 2c-13 0-24.1 8.4-28.2 20h56.6C56 10.4 44.9 2 31.8 2" /><path fill="#83bf4f" d="M31.8 62c13.1 0 24.2-8.3 28.3-20H3.6c4.1 11.7 15.2 20 28.2 20" /><path fill="#fff" d="M3.6 22c-1.1 3.1-1.7 6.5-1.7 10s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10z" /><circle cx="31.8" cy="32" r="8" fill="#428bc1" /><circle cx="31.8" cy="32" r="7" fill="#fff" /><g fill="#428bc1"><circle cx="29.2" cy="25.5" r=".5" /><circle cx="27.6" cy="26.4" r=".5" /><circle cx="26.3" cy="27.7" r=".5" /><circle cx="25.4" cy="29.3" r=".5" /><circle cx="24.9" cy="31.1" r=".5" /><circle cx="24.9" cy="32.9" r=".5" /><circle cx="25.4" cy="34.7" r=".5" /><circle cx="26.3" cy="36.3" r=".5" /><circle cx="27.6" cy="37.6" r=".5" /><circle cx="29.2" cy="38.5" r=".5" /><circle cx="30.9" cy="38.9" r=".5" /><path d="M32.3 39c0-.3.2-.5.4-.6c.3 0 .5.2.6.4c0 .3-.2.5-.4.6c-.4.1-.6-.1-.6-.4" /><circle cx="34.5" cy="38.5" r=".5" /><circle cx="36.1" cy="37.6" r=".5" /><circle cx="37.4" cy="36.3" r=".5" /><circle cx="38.3" cy="34.7" r=".5" /><circle cx="38.8" cy="32.9" r=".5" /><path d="M38.8 31.6c-.3 0-.5-.2-.6-.4c0-.3.2-.5.4-.6c.3 0 .5.2.6.4c.1.3-.1.5-.4.6" /><circle cx="38.3" cy="29.3" r=".5" /><circle cx="37.4" cy="27.7" r=".5" /><circle cx="36.1" cy="26.4" r=".5" /><path d="M35 25.7c-.1.3-.4.4-.7.3c-.3-.1-.4-.4-.3-.7c.1-.3.4-.4.7-.3c.3.2.4.5.3.7m-1.8-.6c0 .3-.3.5-.6.4c-.3 0-.5-.3-.4-.6c0-.3.3-.5.6-.4c.3.1.5.4.4.6m-1.8-.1c0 .3-.2.5-.4.6c-.3 0-.5-.2-.6-.4c0-.3.2-.5.4-.6c.3-.1.6.1.6.4" /><circle cx="31.8" cy="32" r="1.5" /><path d="m31.8 25l-.2 4.3l.2 2.7l.3-2.7zm-1.8.2l.9 4.3l.9 2.5l-.4-2.7z" /><path d="m28.3 25.9l2 3.9l1.5 2.2l-1.1-2.5zM26.9 27l2.9 3.3l2 1.7l-1.7-2.1z" /><path d="m25.8 28.5l3.6 2.4l2.4 1.1l-2.2-1.6z" /><path d="m25.1 30.2l4.1 1.3l2.6.5l-2.5-.9zm-.3 1.8l4.4.2l2.6-.2l-2.6-.2z" /><path d="m25.1 33.8l4.2-.9l2.5-.9l-2.6.5zm.7 1.7l3.8-1.9l2.2-1.6l-2.4 1.1z" /><path d="m26.9 36.9l3.2-2.8l1.7-2.1l-2 1.7zm1.4 1.2l2.4-3.7l1.1-2.4l-1.5 2.2z" /><path d="m30 38.8l1.4-4.1l.4-2.7l-.9 2.5zm1.8.2l.3-4.3l-.3-2.7l-.2 2.7zm1.8-.2l-.8-4.3l-1-2.5l.5 2.7z" /><path d="m35.3 38.1l-1.9-3.9l-1.6-2.2l1.2 2.5zm1.5-1.2l-2.9-3.2l-2.1-1.7l1.8 2.1z" /><path d="m37.9 35.5l-3.6-2.4l-2.5-1.1l2.2 1.6zm.7-1.7l-4.1-1.3l-2.7-.5l2.6.9zm.2-1.8l-4.3-.3l-2.7.3l2.7.2zm-.2-1.8l-4.2.9l-2.6.9l2.7-.5z" /><path d="M37.9 28.5L34 30.4L31.8 32l2.5-1.1zm-1.1-1.4l-3.2 2.8l-1.8 2.1l2.1-1.7z" /><path d="M35.3 25.9L33 29.6L31.8 32l1.6-2.2z" /><path d="m33.7 25.2l-1.4 4.1l-.5 2.7l1-2.5z" /></g>
            </svg>
}];
const SalesByCountries = () => {
  return <Card className="overflow-hidden">
            <CardHeader>
                <div className="d-flex align-items-center">
                    <h5 className="card-title text-black mb-0">Sales by Countries</h5>
                    <div className="ms-auto">
                        <Dropdown>
                            <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                View All<IconifyIcon icon="mdi:chevron-down" className="ms-1 fs-14" /></DropdownToggle>
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
                    {countries.map((country, idx) => <li key={country.name} className={`d-flex${idx === countries.length - 1 ? " align-items-center mb-0" : " mb-3"}`}>
                            <div className="d-flex w-50 align-items-center me-4">
                                <div className="avatar flex-shrink-0 me-3">
                                    {country.svg}
                                </div>
                                <div>
                                    <h6 className="mb-0 me-1 fs-15 fw-semibold text-black">{country.name}</h6>
                                </div>
                            </div>
                            <div className="d-flex flex-grow-1 align-items-center">
                                <div className="progress progress-md w-100 me-4 mt-2" role="progressbar" aria-valuenow={country.percent} aria-valuemin={0} aria-valuemax={100}>
                                    <div className={`progress-bar ${country.progressClass}`} style={{
                width: `${country.percent}%`
              }}></div>
                                </div>
                                <span className="">{country.percent}%</span>
                            </div>
                        </li>)}
                </ul>
            </CardBody>
        </Card>;
};
export default SalesByCountries;