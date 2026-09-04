import CommonCard from '@/component/CommonCard';
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
const Pagination = () => {
  return <>
            <Row>
                <Col xl={4}>
                    <CommonCard title='Default Pagination' titleClass='mb-0'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination mb-0">
                                <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">6</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                            </ul>
                        </nav>
                    </CommonCard>
                </Col>

                <Col xl={4}>
                    <CommonCard title='Working With Icons' titleClass='mb-0'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination mb-0">
                                <li className="page-item">
                                    <Link className="page-link" to="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">6</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </CommonCard>
                </Col>

                <Col xl={4}>
                    <CommonCard title='Disabled and active states' titleClass='mb-0'>
                        <nav>
                            <ul className="pagination mb-0">
                                <li className="page-item disabled">
                                    <Link to="#" className="page-link">Previous</Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                <li className="page-item active" aria-current="page"><Link className="page-link" to="#">4</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">6</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">Next</Link>
                                </li>
                            </ul>
                        </nav>

                    </CommonCard>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <CommonCard title='Sizing' titleClass='mb-0'>
                        <nav>
                            <ul className="pagination pagination-lg mb-2">
                                <li className="page-item">
                                    <Link className="page-link" to="javascript: void(0);" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">3</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="javascript: void(0);" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className="page-item">
                                    <Link className="page-link" to="javascript: void(0);" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">3</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="javascript: void(0);" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </CommonCard>
                </Col>

            </Row>

            <Row>
                <Col xl={12}>
                    <CommonCard title='Alignment' titleClass='mb-0'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                    <Link to="#" className=" page-link">Previous</Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">Next</Link>
                                </li>
                            </ul>
                        </nav>

                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end mb-0">
                                <li className="page-item disabled">
                                    <Link className="page-link" to="javascript: void(0);" tabIndex={-1}>Previous</Link>
                                </li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="javascript: void(0);">3</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="javascript: void(0);">Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </CommonCard>
                </Col>
            </Row>
        </>;
};
export default Pagination;