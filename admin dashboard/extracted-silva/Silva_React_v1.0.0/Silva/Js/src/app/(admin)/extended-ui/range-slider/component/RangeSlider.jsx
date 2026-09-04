import CommonCard from '@/component/CommonCard';
import { Col, FormLabel, Row } from 'react-bootstrap';
import FormRange from 'react-bootstrap/esm/FormRange';
const RangeSlider = () => {
  return <Row>
            <Col xl={4}>
                <CommonCard title='Default' titleClass='mb-0'>
                    <FormLabel htmlFor="customRange1">Example range</FormLabel>
                    <FormRange />
                </CommonCard>
            </Col>

            <Col xl={4}>
                <CommonCard title='Disabled' titleClass='mb-0'>
                    <FormLabel htmlFor="disabledRange" className="form-label">Disabled range</FormLabel>
                    <FormRange className="form-range" disabled />
                </CommonCard>
            </Col>

            <Col xl={4}>
                <CommonCard title='Min and Max' titleClass='mb-0'>
                    <FormLabel htmlFor="customRange2" className="form-label">Example of min and max range</FormLabel>
                    <FormRange className="form-range" min="0" max="5" />
                </CommonCard>
            </Col>

            <Col xl={4}>

                <CommonCard title='Steps' titleClass='mb-0'>
                    <FormLabel htmlFor="customRange3" className="form-label">Example of step range</FormLabel>
                    <FormRange className="form-range" min="0" max="5" step="0.5" />
                </CommonCard>
            </Col>

        </Row>;
};
export default RangeSlider;