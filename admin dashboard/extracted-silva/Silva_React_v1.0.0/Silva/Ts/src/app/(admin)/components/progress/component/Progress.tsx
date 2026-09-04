import CommonCard from '@/component/CommonCard'
import { Col, ProgressBar, Row } from 'react-bootstrap'

const Progress = () => {
    return (
        <Row>
            <Col xl={6}>
                <CommonCard title='Default Progress' titleClass='mb-0'>
                    <div>
                        <ProgressBar now={25} />
                        <ProgressBar now={50} />
                        <ProgressBar now={75} />
                        <ProgressBar now={100} />
                    </div>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Labeled Progress" titleClass="mb-0">
                    <div>
                        <ProgressBar now={25} variant="primary" className='mt-0' />
                        <ProgressBar now={50} variant="secondary" />
                        <ProgressBar now={75} variant="success" />
                        <ProgressBar now={100} variant="danger" />
                        <ProgressBar now={85} variant="warning" />
                        <ProgressBar now={65} variant="info" />
                        <ProgressBar now={33} variant="dark" />
                    </div>
                </CommonCard>
            </Col>



            <Col xl={6}>
                <CommonCard title="Striped" titleClass="mb-0">
                    <div>
                        <ProgressBar striped now={10} className="mt-0" />
                        <ProgressBar striped variant="success" now={25} />
                        <ProgressBar striped variant="info" now={50} />
                        <ProgressBar striped variant="warning" now={75} />
                        <ProgressBar striped variant="danger" now={100} />
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title="Height" titleClass="mb-0">
                    <div>
                        <ProgressBar now={25} variant="danger" style={{ height: '1px' }} className="mb-2" />
                        <ProgressBar now={25} style={{ height: '3px' }} className="mb-2" />
                        <ProgressBar now={25} variant="success" className="mb-2 progress-sm" />
                        <ProgressBar now={50} variant="info" className="mb-2 progress-md" />
                        <ProgressBar now={75} variant="warning" className="progress-lg mb-2" />
                        <ProgressBar now={38} variant="success" className='progress-xl' />
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title="Multiple Progress Bars" titleClass="mb-0">
                    <div>
                        <ProgressBar className="mt-0">
                            <ProgressBar now={15} />
                            <ProgressBar now={30} variant="success" />
                            <ProgressBar now={20} variant="info" />
                        </ProgressBar>
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title="Width" titleClass="mb-0">
                    <div>
                        <ProgressBar now={75} />
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title="Progress With Labels" titleClass="mb-0">
                    <div>
                        <ProgressBar now={25} label="25%" className="mt-0" />
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title="Animated Stripes" titleClass="mb-0">
                    <div>
                        <ProgressBar animated striped now={75} className="mt-0" />
                    </div>
                </CommonCard>
            </Col>


        </Row >
    )
}

export default Progress