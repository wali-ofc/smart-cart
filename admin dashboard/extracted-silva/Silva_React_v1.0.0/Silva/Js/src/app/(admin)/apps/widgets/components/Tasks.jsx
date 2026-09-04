import user10 from "@/assets/images/users/user-10.jpg";
import user11 from "@/assets/images/users/user-11.jpg";
import user12 from "@/assets/images/users/user-12.jpg";
import user13 from "@/assets/images/users/user-13.jpg";
import user14 from "@/assets/images/users/user-14.jpg";
import user15 from "@/assets/images/users/user-15.jpg";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap';
import { Calendar, Check, Folder } from 'react-feather';
const tasksData = [{
  id: 1,
  taskName: 'Create user interface designs.',
  createdDate: 'June 01, 2024',
  progress: '4/8',
  deadline: 'June 10, 2024',
  projectCount: 2,
  assigneeImg: user11
}, {
  id: 2,
  taskName: 'Test new features and updates.',
  createdDate: 'July 15, 2023',
  progress: '1/5',
  deadline: 'September 10, 2023',
  projectCount: 4,
  assigneeImg: user12
}, {
  id: 3,
  taskName: 'Optimize database queries',
  createdDate: 'August 12, 2023',
  progress: '0/4',
  deadline: 'December 08, 2023',
  projectCount: 1,
  assigneeImg: user13
}, {
  id: 4,
  taskName: 'Develop API endpoints.',
  createdDate: 'September 5, 2023',
  progress: '2/6',
  deadline: 'February 25, 2024',
  projectCount: 5,
  assigneeImg: user14
}, {
  id: 5,
  taskName: 'Conduct user feedback surveys',
  createdDate: 'October 1, 2023',
  progress: '4/10',
  deadline: 'November 29, 2023',
  projectCount: 3,
  assigneeImg: user15,
  checked: true
}, {
  id: 6,
  taskName: 'Review codebase for security vulnerabilities',
  createdDate: 'May 15, 2023',
  progress: '5/8',
  deadline: 'December 08, 2023',
  projectCount: 6,
  assigneeImg: user10
}];
const Tasks = () => {
  return <Col md={12}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Tasks</h5>
                    </div>
                </CardHeader>

                <CardBody className="p-0">
                    <div className="table-responsive">
                        <table className="table table-traffic mb-0">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Task Name</th>
                                    <th>Created Date</th>
                                    <th>Number of Task</th>
                                    <th>Deadline</th>
                                    <th>Project</th>
                                    <th>Assignee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasksData.map(task => <tr key={task.id}>
                                        <td>
                                            <input type="checkbox" className="form-check-input m-0 align-middle" aria-label="Select task" defaultChecked={task.checked} />
                                        </td>
                                        <td>
                                            <Link to="#" className="text-reset">
                                                {task.taskName}
                                            </Link>
                                        </td>
                                        <td className="text-nowrap text-reset">
                                            <Calendar size={18} className="me-1" />
                                            {task.createdDate}
                                        </td>
                                        <td>
                                            <Link to="#" className="text-reset">
                                                <Check size={18} className="me-1" />
                                                {task.progress}
                                            </Link>
                                        </td>
                                        <td className="text-nowrap text-reset">
                                            <Calendar size={18} className="me-1" />
                                            {task.deadline}
                                        </td>
                                        <td>
                                            <Link to="#" className="text-reset">
                                                <Folder size={18} className="me-1" />
                                                {task.projectCount}
                                            </Link>
                                        </td>
                                        <td>
                                            <img src={task.assigneeImg} alt="assignee" className="avatar avatar-sm img-fluid rounded-2" />
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>;
};
export default Tasks;