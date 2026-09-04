import { Card, CardBody, CardHeader, Col } from 'react-bootstrap';
const trafficData = [{
  network: "Instagram",
  visitors: 3550,
  percentage: 80.0,
  color: "danger"
}, {
  network: "Facebook",
  visitors: 1245,
  percentage: 55.9,
  color: "primary"
}, {
  network: "Twitter",
  visitors: 1798,
  percentage: 67.0,
  color: "secondary"
}, {
  network: "YouTube",
  visitors: 986,
  percentage: 38.72,
  color: "danger"
}, {
  network: "Pinterest",
  visitors: 854,
  percentage: 45.08,
  color: "primary"
}, {
  network: "Linkedin",
  visitors: 650,
  percentage: 68.0,
  color: "warning"
}];
const TrafficSource = () => {
  return <Col md={12} xl={4}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Traffic Source</h5>
                    </div>
                </CardHeader>

                <CardBody className="mt-0">
                    <div className="table-responsive table-card">
                        <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                            <thead className="text-muted table-light">
                                <tr>
                                    <th>Network</th>
                                    <th colSpan={2}>Visitors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trafficData.map(({
                network,
                visitors,
                percentage,
                color
              }) => <tr key={network}>
                                        <td>{network}</td>
                                        <td>{visitors.toLocaleString()}</td>
                                        <td className="w-50">
                                            <div className="progress progress-md mt-0">
                                                <div className={`progress-bar bg-${color}`} style={{
                      width: `${percentage}%`
                    }}></div>
                                            </div>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>;
};
export default TrafficSource;