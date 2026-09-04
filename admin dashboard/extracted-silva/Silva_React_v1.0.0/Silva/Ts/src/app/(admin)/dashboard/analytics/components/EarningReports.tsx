import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import { getEarningReportsChat } from '../data'

type EarningsData = {
    title: string;
    amount: string;
    progress: number;
    bgColor: string;
    borderColor: string;
    progressBarColor: string;
    icon: React.ReactNode;
}
const EarningReports = () => {

    const earningsItems: EarningsData[] = [
        {
            title: "Earnings",
            amount: "$545.69",
            progress: 65,
            bgColor: "bg-info-subtle",
            borderColor: "border-info",
            progressBarColor: "bg-info",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none">
                    <path d="M0 0h48v48H0z" /><path fill="#73bbe2" fillRule="evenodd" d="M24 7a1 1 0 0 0-1 1v3h-1a7 7 0 1 0 0 14h1v10h-1a5 5 0 0 1-4.716-3.333a1 1 0 1 0-1.885.666A7 7 0 0 0 22 37h1v3a1 1 0 1 0 2 0v-3h1a7 7 0 1 0 0-14h-1V13h1a5 5 0 0 1 4.716 3.333a1 1 0 1 0 1.885-.666A7 7 0 0 0 26 11h-1V8a1 1 0 0 0-1-1m-3 1a3 3 0 1 1 6 0v1.055A9.01 9.01 0 0 1 34.487 15a3 3 0 1 1-5.657 2A3 3 0 0 0 27 15.17v5.885a9.001 9.001 0 0 1 0 17.89V40a3 3 0 1 1-6 0v-1.055A9.01 9.01 0 0 1 13.513 33a3 3 0 1 1 5.657-2A3 3 0 0 0 21 32.83v-5.885a9.001 9.001 0 0 1 0-17.89zm-4 10a5 5 0 0 1 5-5h1v10h-1a5 5 0 0 1-5-5m4-2.83a3.001 3.001 0 0 0 0 5.66zM25 25h1a5 5 0 0 1 0 10h-1zm2 2.17v5.66a3.001 3.001 0 0 0 0-5.66" clipRule="evenodd" /></g>
                </svg>
            ),
        },
        {
            title: "Profit",
            amount: "$256.34",
            progress: 50,
            bgColor: "bg-primary-subtle",
            borderColor: "border-primary",
            progressBarColor: "bg-primary",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="#287F71" fillRule="evenodd" clipRule="evenodd">
                    <path d="M17.206 1.856c-1.063-.419-2.09-.135-2.817.512c-.71.63-1.139 1.602-1.139 2.632v4c0 .967.784 1.75 1.75 1.75h4c1.03 0 2.002-.43 2.633-1.139c.646-.727.93-1.754.51-2.817a8.776 8.776 0 0 0-4.937-4.938M14.75 9V5c0-.627.265-1.182.636-1.512c.353-.314.791-.425 1.27-.236a7.276 7.276 0 0 1 4.092 4.092c.189.479.078.917-.236 1.27c-.33.371-.885.636-1.512.636h-4a.25.25 0 0 1-.25-.25" /><path d="M10.995 2.87c-.61-.396-1.2-.51-1.85-.396c-.55.096-1.14.36-1.767.641l-.067.03A10.25 10.25 0 1 0 20.855 16.69l.03-.068c.281-.627.545-1.217.641-1.768c.113-.648 0-1.239-.396-1.85c-.426-.657-1.01-.979-1.724-1.125c-.634-.13-1.426-.13-2.334-.129H15.5c-.964 0-1.612-.002-2.095-.066c-.461-.063-.659-.17-.789-.3c-.13-.13-.237-.328-.3-.79c-.064-.482-.066-1.13-.066-2.094V6.928c0-.908 0-1.7-.13-2.334c-.145-.714-.467-1.298-1.125-1.724M7.924 4.514c.719-.322 1.136-.503 1.48-.563c.265-.046.474-.018.776.178c.254.165.389.361.471.765c.095.467.099 1.104.099 2.106v1.552c0 .898 0 1.648.08 2.242c.084.628.27 1.195.726 1.65c.455.456 1.022.642 1.65.726c.594.08 1.344.08 2.242.08H17c1.002 0 1.639.004 2.106.099c.404.082.6.217.765.471c.196.302.224.511.178.777c-.06.343-.241.76-.563 1.48a8.755 8.755 0 0 1-4.638 4.507a8.75 8.75 0 0 1-6.924-16.07" /></g>
                </svg>
            ),
        },
        {
            title: "Expense",
            amount: "$74.19",
            progress: 65,
            bgColor: "bg-secondary-subtle",
            borderColor: "border-secondary",
            progressBarColor: "bg-secondary",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15"><g fill="none" stroke="#963b68" strokeLinejoin="round">
                    <path d="M.5 12.5h4l1-4h1.795a4.625 4.625 0 0 0 4.33-3.001C12.532 3.08 10.745.5 8.161.5H3.5z" /><path d="M4 14.5h4L9 11h1.577c1.477 0 2.82-.859 3.438-2.2c.927-2.008-.54-4.3-2.75-4.3H6.5z" /></g>
                </svg>
            ),
        },
    ];

    return (
        <Col md={12} xl={8}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Earning Reports</h5>
                    </div>
                </CardHeader>
                <CardBody>

                    <ApexChartClient getOptions={getEarningReportsChat} series={getEarningReportsChat().series} type="bar" height={300} className="apex-charts" />

                    <div className="border border-dashed border-primary-subtle rounded p-3 mt-2">
                        <Row className="gap-2 gap-sm-0">
                            {earningsItems.map((item, index) => (
                                <Col xs={12} sm={4} key={index}>
                                    <div
                                        className={`${item.title === "Earnings"
                                            ? "earnings-section"
                                            : item.title === "Profit"
                                                ? "earnings-profit border-start border-dashed border-primary-subtle mt-md-0 mt-2"
                                                : "earnings-expense border-start border-dashed border-primary-subtle mt-md-0 mt-2"
                                            }`}
                                    >
                                        <div className={item.title === "Earnings" ? "" : "ms-md-3"}>
                                            <div className="d-flex gap-2 align-items-center">
                                                <div className={`rounded-2 p-1 me-2 border border-dashed ${item.borderColor} ${item.bgColor}`}>
                                                    {item.icon}
                                                </div>
                                                <h6 className="mb-0 fw-normal fs-16">{item.title}</h6>
                                            </div>
                                            <h4 className="my-2 text-black">{item.amount}</h4>
                                            <div className="progress w-75" style={{ height: "6px" }}>
                                                <div
                                                    className={`progress-bar ${item.progressBarColor}`}
                                                    role="progressbar"
                                                    style={{ width: `${item.progress}%` }}
                                                    aria-valuenow={item.progress}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default EarningReports