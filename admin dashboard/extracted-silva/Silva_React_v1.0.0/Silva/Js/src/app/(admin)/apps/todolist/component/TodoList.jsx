import React, { useEffect, useRef } from 'react';
import { DataTable } from 'simple-datatables';
import user10 from '@/assets/images/users/user-10.jpg';
import user12 from '@/assets/images/users/user-12.jpg';
import user13 from '@/assets/images/users/user-13.jpg';
import user14 from '@/assets/images/users/user-14.jpg';
import user15 from '@/assets/images/users/user-15.jpg';
import user2 from '@/assets/images/users/user-2.jpg';
import user3 from '@/assets/images/users/user-3.jpg';
import user4 from '@/assets/images/users/user-4.jpg';
import user5 from '@/assets/images/users/user-5.jpg';
import user8 from '@/assets/images/users/user-8.jpg';
import user9 from '@/assets/images/users/user-9.jpg';
import user1 from '@/assets/images/users/user.jpg';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import 'simple-datatables/dist/style.css';
const tasks = [{
  id: 'customCheck1',
  image: user1,
  title: 'Create A New React app',
  status: 'In Progress',
  assignedTo: 'Alexander White',
  deadline: 'Due in 3 days',
  priority: 'High'
}, {
  id: 'customCheck2',
  image: user2,
  title: 'Finish project report',
  status: 'Not Started',
  assignedTo: 'Sophia Williams',
  deadline: '15 August 2024',
  priority: 'Medium'
}, {
  id: 'customCheck3',
  image: user4,
  title: 'Implement user authentication',
  status: 'Completed',
  assignedTo: 'Dale Osuna',
  deadline: '11 August 2024',
  priority: 'Low'
}, {
  id: 'customCheck4',
  image: user5,
  title: 'Code review for feature branch',
  status: 'Inactive',
  assignedTo: 'Willie Makin',
  deadline: '18 August 2024',
  priority: 'High'
}, {
  id: 'customCheck5',
  image: user8,
  title: 'Fix bug in payment processing',
  status: 'Active',
  assignedTo: 'Steven Hall',
  deadline: '21 August 2024',
  priority: 'Medium'
}, {
  id: 'customCheck6',
  image: user9,
  title: 'Write unit tests for new API',
  status: 'Not Started',
  assignedTo: 'John Spray',
  deadline: '16 August 2024',
  priority: 'High'
}, {
  id: 'customCheck7',
  image: user4,
  title: 'Update documentation for REST API',
  status: 'In Progress',
  assignedTo: 'Guillermo Pollard',
  deadline: '21 August 2024',
  priority: 'Low'
}, {
  id: 'customCheck8',
  image: user12,
  title: 'Deploy new release to staging',
  status: 'Completed',
  assignedTo: 'Donald Hunter',
  deadline: '23 August 2024',
  priority: 'Medium'
}, {
  id: 'customCheck9',
  image: user13,
  title: 'Research on database optimization',
  status: 'Inactive',
  assignedTo: 'Thomas Hodges',
  deadline: '21 August 2024',
  priority: 'Low'
}, {
  id: 'customCheck10',
  image: user14,
  title: 'Attend team meeting',
  status: 'Active',
  assignedTo: 'Ronald Rock',
  deadline: '14 August 2024',
  priority: 'High'
}, {
  id: 'customCheck11',
  image: user15,
  title: 'Refactor legacy codebase',
  status: 'Inactive',
  assignedTo: 'Henry Hall',
  deadline: '23 August 2024',
  priority: 'Medium'
}, {
  id: 'customCheck12',
  image: user10,
  title: 'Design new feature architecture',
  status: 'In Progress',
  assignedTo: 'Peter Carrick',
  deadline: '23 August 2024',
  priority: 'Low'
}, {
  id: 'customCheck13',
  image: user3,
  title: 'Optimize frontend loading times',
  status: 'Completed',
  assignedTo: 'Antonio Graham',
  deadline: '17 August 2024',
  priority: 'Medium'
}];
const TodoList = () => {
  const tableRef = useRef(null);
  useEffect(() => {
    if (tableRef.current) {
      new DataTable(tableRef.current, {
        searchable: false,
        perPageSelect: [5, 10, 25, 50],
        perPage: 10
      });
    }
  }, []);
  const handleSelectAll = e => {
    const checked = e.target.checked;
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = checked);
  };
  return <Row>
            <Col xs={12}>
                <Card>
                    <CardBody>
                        <div className="table-responsive">
                            <table className="table mb-0" ref={tableRef}>
                                <thead>
                                    <tr>
                                        <th style={{
                    width: '16px'
                  }}>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" onChange={handleSelectAll} />
                                            </div>
                                        </th>
                                        <th>Customer</th>
                                        <th>Status</th>
                                        <th>Assigned To</th>
                                        <th>Deadline</th>
                                        <th>Priority</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => <tr key={task.id}>
                                            <td>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input row-checkbox" id={task.id} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img src={task.image} alt={task.title} width={40} height={40} className="me-2 rounded-circle avatar-border" />
                                                    <span className="fw-medium">{task.title}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-secondary-subtle text-secondary">
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td>{task.assignedTo}</td>
                                            <td>{task.deadline}</td>
                                            <td>{task.priority}</td>
                                            <td className="text-end">
                                                <button className="btn btn-sm bg-primary-subtle me-1">
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                                        <IconifyIcon icon="mdi:pencil-outline" className="text-primary" />
                                                    </OverlayTrigger>
                                                </button>
                                                <button className="btn btn-sm bg-danger-subtle">
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                                        <IconifyIcon icon="mdi:delete" className="text-danger" />
                                                    </OverlayTrigger>
                                                </button>
                                            </td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>;
};
export default TodoList;