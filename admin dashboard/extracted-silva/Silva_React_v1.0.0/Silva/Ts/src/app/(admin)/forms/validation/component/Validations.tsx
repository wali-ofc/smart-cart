import CommonCard from '@/component/CommonCard'
import React, { useState } from 'react'
import { Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Row } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'


const BrowserDefaults = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Browser Defaults' titleClass='mb-0'>
                <Form className="row g-3">
                    <Col md={6}>
                        <FormGroup controlId="validationDefault01">
                            <FormLabel>First name</FormLabel>
                            <FormControl type="text" defaultValue="Mark" required />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup controlId="validationDefault02">
                            <FormLabel>Last name</FormLabel>
                            <FormControl type="text" defaultValue="Otto" required />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup controlId="validationDefaultUsername">
                            <FormLabel>Username</FormLabel>
                            <InputGroup>
                                <InputGroupText id="inputGroupPrepend2">@</InputGroupText>
                                <FormControl
                                    type="text"
                                    aria-describedby="inputGroupPrepend2"
                                    required
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup controlId="validationDefault03">
                            <FormLabel>City</FormLabel>
                            <FormControl type="text" required />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup controlId="validationDefault04">
                            <FormLabel>State</FormLabel>
                            <FormSelect defaultValue="" required>
                                <option disabled value="">Choose...</option>
                                <option>City 1</option>
                                <option>City 2</option>
                                <option>City 3</option>
                            </FormSelect>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup controlId="validationDefault05">
                            <FormLabel>Zip</FormLabel>
                            <FormControl type="text" required />
                        </FormGroup>
                    </Col>

                    <Col xs={12}>
                        <FormGroup className="form-check">
                            <FormCheck
                                required
                                label="Agree to terms and conditions"
                                feedbackType="invalid"
                                id="invalidCheck2"
                            />
                        </FormGroup>
                    </Col>

                    <Col xs={12}>
                        <Button type="submit">Submit form</Button>
                    </Col>
                </Form>
            </CommonCard>
        </Col>
    )
}

const CustomStyle = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Custom Styles' titleClass='mb-0'>

                <Form className="row g-3 needs-validation" noValidate>
                    <FormGroup as={Col} md="6" controlId="validationCustom01">
                        <FormLabel>First name</FormLabel>
                        <FormControl type="text" defaultValue="Mark" required />
                        <FormControl.Feedback type="valid">Looks good!</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup as={Col} md="6" controlId="validationCustom02">
                        <FormLabel>Last name</FormLabel>
                        <FormControl type="text" defaultValue="Otto" required />
                        <FormControl.Feedback type="valid">Looks good!</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup as={Col} md="6" controlId="validationCustomUsername">
                        <FormLabel>Username</FormLabel>
                        <InputGroup hasValidation>
                            <InputGroup.Text>@</InputGroup.Text>
                            <FormControl type="text" aria-describedby="inputGroupPrepend" required />
                            <FormControl.Feedback type="invalid">
                                Please choose a username.
                            </FormControl.Feedback>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup as={Col} md="6" controlId="validationCustom03">
                        <FormLabel>City</FormLabel>
                        <FormControl type="text" required />
                        <FormControl.Feedback type="invalid">
                            Please provide a valid city.
                        </FormControl.Feedback>
                    </FormGroup>

                    <FormGroup as={Col} md="6" controlId="validationCustom04">
                        <FormLabel>State</FormLabel>
                        <FormSelect required>
                            <option value="">Choose</option>
                            <option>City 1</option>
                            <option>City 2</option>
                            <option>City 3</option>
                        </FormSelect>
                        <FormControl.Feedback type="invalid">
                            Please select a valid state.
                        </FormControl.Feedback>
                    </FormGroup>

                    <FormGroup as={Col} md="6" controlId="validationCustom05">
                        <FormLabel>Zip</FormLabel>
                        <FormControl type="text" required />
                        <FormControl.Feedback type="invalid">
                            Please provide a valid zip.
                        </FormControl.Feedback>
                    </FormGroup>

                    <FormGroup className="col-12">
                        <FormCheck
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                            id="invalidCheck"
                        />
                    </FormGroup>

                    <FormGroup className="col-12">
                        <Button type="submit">Submit form</Button>
                    </FormGroup>
                </Form>
            </CommonCard>
        </Col>
    )
}

const Tooltips = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Col xl={6}>
            <CommonCard title='Tooltips' titleClass='mb-0'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3 position-relative">
                        <FormGroup as={Col} md="6" controlId="validationTooltip01" className="position-relative">
                            <FormLabel>First name</FormLabel>
                            <FormControl
                                type="text"
                                defaultValue="Mark"
                                required
                            />
                            <FormControl.Feedback type="valid" tooltip>
                                Looks good!
                            </FormControl.Feedback>
                        </FormGroup>

                        <FormGroup as={Col} md="6" controlId="validationTooltip02" className="position-relative">
                            <FormLabel>Last name</FormLabel>
                            <FormControl
                                type="text"
                                defaultValue="Otto"
                                required
                            />
                            <FormControl.Feedback type="valid" tooltip>
                                Looks good!
                            </FormControl.Feedback>
                        </FormGroup>
                    </Row>

                    <Row className="mb-3 position-relative">
                        <FormGroup as={Col} md="6" controlId="validationTooltipUsername" className="position-relative">
                            <FormLabel>Username</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="validationTooltipUsernamePrepend">@</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="validationTooltipUsernamePrepend"
                                    required
                                />
                                <FormControl.Feedback type="invalid" tooltip>
                                    Please choose a unique and valid username.
                                </FormControl.Feedback>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup as={Col} md="6" controlId="validationTooltip03" className="position-relative">
                            <FormLabel>City</FormLabel>
                            <FormControl type="text" placeholder="City" required />
                            <FormControl.Feedback type="invalid" tooltip>
                                Please provide a valid city.
                            </FormControl.Feedback>
                        </FormGroup>
                    </Row>

                    <Row className="mb-3 position-relative">
                        <FormGroup as={Col} md="6" controlId="validationTooltip04" className="position-relative">
                            <FormLabel>State</FormLabel>
                            <FormSelect defaultValue="" required>
                                <option value="" disabled>Choose</option>
                                <option>City 1</option>
                                <option>City 2</option>
                                <option>City 3</option>
                            </FormSelect>
                            <FormControl.Feedback type="invalid" tooltip>
                                Please select a valid state.
                            </FormControl.Feedback>
                        </FormGroup>

                        <FormGroup as={Col} md="6" controlId="validationTooltip05" className="position-relative">
                            <FormLabel>Zip</FormLabel>
                            <FormControl type="text" placeholder="Zip" required />
                            <FormControl.Feedback type="invalid" tooltip>
                                Please provide a valid zip.
                            </FormControl.Feedback>
                        </FormGroup>
                    </Row>

                    <Button type="submit">Submit form</Button>
                </Form>
            </CommonCard>
        </Col >
    )
}

const ServerSide = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            console.log("All fields are valid");
        }

        setValidated(true);
    };

    return (
        <Col xl={6}>
            <CommonCard title='Server Side' titleClass='mb-0' >

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <FormGroup as={Col} md="4" controlId="validationServer01">
                            <FormLabel>First name</FormLabel>
                            <FormControl required type="text" defaultValue="Mark" isValid />
                            <FormControl.Feedback>Looks good!</FormControl.Feedback>
                        </FormGroup>

                        <FormGroup as={Col} md="4" controlId="validationServer02">
                            <FormLabel>Last name</FormLabel>
                            <FormControl required type="text" defaultValue="Otto" isValid />
                            <FormControl.Feedback>Looks good!</FormControl.Feedback>
                        </FormGroup>

                        <FormGroup as={Col} md="4" controlId="validationServerUsername">
                            <FormLabel>Username</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroup.Text>@</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    required
                                    isInvalid
                                />
                                <FormControl.Feedback type="invalid">
                                    Please choose a username.
                                </FormControl.Feedback>
                            </InputGroup>
                        </FormGroup>
                    </Row>

                    <Row className="mb-3">
                        <FormGroup as={Col} md="6" controlId="validationServer03">
                            <FormLabel>City</FormLabel>
                            <FormControl type="text" required isInvalid />
                            <FormControl.Feedback type="invalid">
                                Please provide a valid city.
                            </FormControl.Feedback>
                        </FormGroup>

                        <FormGroup as={Col} md="3" controlId="validationServer04">
                            <FormLabel>State</FormLabel>
                            <FormSelect required isInvalid>
                                <option disabled value="">Choose</option>
                                <option>State 1</option>
                                <option>State 2</option>
                                <option>State 3</option>
                            </FormSelect>
                            <FormControl.Feedback type="invalid">
                                Please select a valid state.
                            </FormControl.Feedback>
                        </FormGroup>

                        <FormGroup as={Col} md="3" controlId="validationServer05">
                            <FormLabel>Zip</FormLabel>
                            <FormControl type="text" required isInvalid />
                            <FormControl.Feedback type="invalid">
                                Please provide a valid zip.
                            </FormControl.Feedback>
                        </FormGroup>
                    </Row>

                    <FormGroup className="mb-3">
                        <FormCheck
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                            id="invalidCheck3"
                        />
                    </FormGroup>

                    <Button type="submit">Submit form</Button>
                </Form>
            </CommonCard>
        </Col >
    );
};

const SupportedElements = () => {
    return (
        <Col xl={12}>
            <CommonCard title='Supported Elements' titleClass='mb-0'>
                <Form className="was-validated">
                    <FormGroup className="mb-3" controlId="validationTextarea">
                        <FormLabel>Textarea</FormLabel>
                        <FormControl
                            as="textarea"
                            placeholder="Required example textarea"
                            required
                        />
                        <FormControl.Feedback type="invalid">
                            Please enter a message in the textarea.
                        </FormControl.Feedback>
                    </FormGroup>

                    <Form.Check
                        required
                        className="mb-3"
                        type="checkbox"
                        id="validationFormCheck1"
                        label="Check this checkbox"
                        feedback="Example invalid feedback text"
                        feedbackType="invalid"
                    />

                    <Form.Check
                        required
                        type="radio"
                        id="validationFormCheck2"
                        name="radio-stacked"
                        label="Toggle this radio"
                    />

                    <Form.Check
                        required
                        className="mb-3"
                        type="radio"
                        id="validationFormCheck3"
                        name="radio-stacked"
                        label="Or toggle this other radio"
                        feedback="More example invalid feedback text"
                        feedbackType="invalid"
                    />

                    <Form.Group className="mb-3">
                        <Form.Select required aria-label="select example">
                            <option value="">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <FormControl.Feedback type="invalid">
                            Example invalid select feedback
                        </FormControl.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FormControl type="file" required />
                        <FormControl.Feedback type="invalid">
                            Example invalid form file feedback
                        </FormControl.Feedback>
                    </Form.Group>

                    <Button type="submit" disabled>
                        Submit form
                    </Button>
                </Form>
            </CommonCard>
        </Col >
    );
}


const Validations = () => {
    return (
        <>
            <Row>
                <BrowserDefaults />
                <CustomStyle />
                <Tooltips />
                <ServerSide />
            </Row>
            <Row>
                <SupportedElements />
            </Row>
        </>
    )
}

export default Validations