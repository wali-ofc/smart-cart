import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import profile from '@/assets/images/users/profile.jpg';
import user10 from '@/assets/images/users/user-10.jpg';
import user11 from '@/assets/images/users/user-11.jpg';
import user12 from '@/assets/images/users/user-12.jpg';
import user13 from '@/assets/images/users/user-13.jpg';
import user14 from '@/assets/images/users/user-14.jpg';
import user15 from '@/assets/images/users/user-15.jpg';
import user2 from '@/assets/images/users/user-2.jpg';
import user3 from '@/assets/images/users/user-3.jpg';
import user4 from '@/assets/images/users/user-4.jpg';
import user5 from '@/assets/images/users/user-5.jpg';
import user6 from '@/assets/images/users/user-6.jpg';
import user7 from '@/assets/images/users/user-7.jpg';
import user8 from '@/assets/images/users/user-8.jpg';
import user9 from '@/assets/images/users/user-9.jpg';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Link } from "react-router-dom";
const ContactList = () => {
  const contacts = [{
    id: 1,
    name: 'Anna M. Hines',
    email: 'georgia.young@example.com',
    avatar: user12,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 2,
    name: 'Philip',
    email: 'alma.lawson@example.com',
    avatar: user11,
    type: 'Customer',
    typeColor: 'success',
    typeClass: 'bg-success-subtle text-success'
  }, {
    id: 3,
    name: 'Dianne Russell',
    email: 'deanna.lawson@example.com',
    avatar: user13,
    type: 'Lead',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 4,
    name: 'Devon Lane',
    email: 'neaven.youngstar@example.com',
    avatar: user14,
    type: 'Customer',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 5,
    name: 'Theresa Webb',
    email: 'michelle.rivara@example.com',
    avatar: user5,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 6,
    name: 'Leeanna Cline',
    email: 'leeannacline@example.com',
    avatar: user9,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 7,
    name: 'David Hardy',
    email: 'davidhardy@example.com',
    avatar: user4,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 8,
    name: 'Roland Burgess',
    email: 'rolandburgess@example.com',
    avatar: user3,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 9,
    name: 'Christina Correa',
    email: 'christinavorrea@example.com',
    avatar: user8,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 10,
    name: 'Kay Haines',
    email: 'kaychaines@example.com',
    avatar: user6,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 11,
    name: 'Christina Correa',
    email: 'christinavorrea@example.com',
    avatar: profile,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 12,
    name: 'Dawn Dow',
    email: 'dawnjdow@example.com',
    avatar: user10,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 13,
    name: 'Betsey Fanelli',
    email: 'betseyfanelli@example.com',
    avatar: user2,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 14,
    name: 'Arnold Diaz',
    email: 'arnolddiaz@example.com',
    avatar: user7,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 15,
    name: 'Ricardo Thomas',
    email: 'ricardothomas@example.com',
    avatar: user14,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 16,
    name: 'Gordon Eklund',
    email: 'gordoneEklund@example.com',
    avatar: user3,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 17,
    name: 'Martin Helmer',
    email: 'martinhelmer@example.com',
    avatar: user6,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 18,
    name: 'Susan Hubbard',
    email: 'susanhubbard@example.com',
    avatar: user15,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }, {
    id: 19,
    name: 'Robert Brewer',
    email: 'robertnbrewer@example.com',
    avatar: user7,
    type: 'Lead',
    typeColor: 'light',
    typeClass: 'bg-light text-muted'
  }, {
    id: 20,
    name: 'Wiley Brown',
    email: 'wileyvbrown@example.com',
    avatar: user5,
    type: 'Customer',
    typeColor: 'warning',
    typeClass: 'bg-warning-subtle text-warning'
  }];
  return <Row>
            <Col xs={12}>
                <Row>
                    {contacts.map(contact => <Col xl={3} lg={3} key={contact.id}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-between align-content-center">
                                        <div className="d-flex">
                                            <img src={contact.avatar} alt="avatar" className="img-fluid avatar-md img-thumbnail me-2 rounded-circle avatar-border" />
                                            <h4 className="fs-16 mb-0 align-content-center">
                                                <Link to="#" className="text-black">
                                                    {contact.name}
                                                </Link>
                                            </h4>
                                        </div>
                                        <div className="dropdown mx-0">
                                            <Dropdown>
                                                <DropdownToggle variant="link" id={`dropdown-${contact.id}`} className="p-0">
                                                    <IconifyIcon icon="mdi:dots-vertical" className="text-muted fs-20"></IconifyIcon>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end">
                                                    <DropdownItem href="#">Follow</DropdownItem>
                                                    <DropdownItem href="#">Unfollow</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="mt-2 pt-1">
                                        <Link to="#" className="d-inline-block text-muted">
                                            {contact.email}
                                        </Link>
                                    </div>

                                    <div className="mt-2 pt-1">
                                        <span className={`badge ${contact.typeClass} fw-semibold fs-14 px-3 rounded-5`}>
                                            {contact.type}
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>)}
                </Row>
            </Col>
        </Row>;
};
export default ContactList;