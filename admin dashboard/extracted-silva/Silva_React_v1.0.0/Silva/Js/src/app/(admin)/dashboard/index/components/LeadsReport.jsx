import ImgUser11 from "@/assets/images/users/user-11.jpg";
import ImgUser12 from "@/assets/images/users/user-12.jpg";
import ImgUser13 from "@/assets/images/users/user-13.jpg";
import ImgUser14 from "@/assets/images/users/user-14.jpg";
import ImgUser15 from "@/assets/images/users/user-15.jpg";
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, CardHeader, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
const leads = [{
  img: ImgUser12,
  name: "John Hamilton",
  email: "johnehamilton@gmail.com",
  phone: "+48, 65610085",
  company: "Mufti",
  status: {
    text: "New Lead",
    badgeClass: "bg-primary-subtle",
    textClass: "text-primary"
  }
}, {
  img: ImgUser11,
  name: "Janice Reese",
  email: "janicecreese@gmail.com",
  phone: "+45, 32678972",
  company: "Gucci",
  status: {
    text: "In Progress",
    badgeClass: "bg-secondary-subtle",
    textClass: "text-secondary"
  }
}, {
  img: ImgUser13,
  name: "Andrew Kim",
  email: "andrewekim@gmail.com",
  phone: "+30, 84787124",
  company: "Vans",
  status: {
    text: "Loss",
    badgeClass: "bg-danger-subtle",
    textClass: "text-danger"
  }
}, {
  img: ImgUser14,
  name: "Kathryn Sanchez",
  email: "kathryntsanchez@gmail.com",
  phone: "+30, 23794209",
  company: "Myntra",
  status: {
    text: "Won",
    badgeClass: "bg-success-subtle",
    textClass: "text-success"
  }
}, {
  img: ImgUser15,
  name: "Diane Richards",
  email: "dianetrichards@gmail.com",
  phone: "+78, 37569176",
  company: "HCLTech",
  status: {
    text: "Converted",
    badgeClass: "bg-warning-subtle",
    textClass: "text-warning"
  }
}, {
  img: ImgUser12,
  name: "Chung Ohearn",
  email: "chunglohearn@gmail.com",
  phone: "+39, 59937702",
  company: "Skechers",
  status: {
    text: "New Lead",
    badgeClass: "bg-primary-subtle",
    textClass: "text-primary"
  }
}, {
  img: ImgUser14,
  name: "John Shan",
  email: "nikeshop@gmail.com",
  phone: "+47, 45789564",
  company: "Nike",
  status: {
    text: "Converted",
    badgeClass: "bg-warning-subtle",
    textClass: "text-warning"
  }
}];
const LeadsReport = () => {
  return <Col xl={8}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Leads Report</h5>
                    </div>
                </CardHeader>
                <CardBody className="mt-0">
                    <div className="table-responsive table-card mt-0">
                        <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                            <thead className="text-muted table-light">
                                <tr>
                                    <th scope="col" className="cursor-pointer">Lead</th>
                                    <th scope="col" className="cursor-pointer">Email</th>
                                    <th scope="col" className="cursor-pointer">Phone No</th>
                                    <th scope="col" className="cursor-pointer">Campany</th>
                                    <th scope="col" className="cursor-pointer">Status</th>
                                    <th scope="col" className="cursor-pointer">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead, idx) => <tr key={lead.email + idx}>
                                        <td>
                                            <img src={lead.img} className="avatar avatar-sm rounded-circle me-3" alt={lead.name} />
                                            {lead.name}
                                        </td>
                                        <td>{lead.email}</td>
                                        <td>{lead.phone}</td>
                                        <td>{lead.company}</td>
                                        <td>
                                            <span className={`badge ${lead.status.badgeClass} ${lead.status.textClass} fw-semibold`}>
                                                {lead.status.text}
                                            </span>
                                        </td>
                                        <td>
                                            <Link to="#" aria-label="anchor" className="me-1">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                                    <IconifyIcon icon="mdi:pencil-outline" className="fs-16 text-muted" />
                                                </OverlayTrigger>
                                            </Link>
                                            <Link to="#" aria-label="anchor" className="">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                                    <IconifyIcon icon="mdi:delete" className="mdi mdi-delete fs-16 text-muted" />
                                                </OverlayTrigger>
                                            </Link>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>;
};
export default LeadsReport;