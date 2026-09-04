import CommonCard from '@/component/CommonCard';
import { Button, Col, Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, FloatingLabel, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, FormText, InputGroup, Row } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
const InputType = () => {
  return <Col xs={12}>
            <CommonCard title='Input Type' titleClass='mb-0'>

                <Row>
                    <Col lg={6}>
                        <Form>
                            <FormGroup className="mb-3" controlId="simpleinput">
                                <FormLabel>Text</FormLabel>
                                <FormControl type="text" />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-email">
                                <FormLabel>Email</FormLabel>
                                <FormControl type="email" placeholder="Email" />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-password">
                                <FormLabel>Password</FormLabel>
                                <FormControl type="password" defaultValue="password" />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-palaceholder">
                                <FormLabel>Placeholder</FormLabel>
                                <FormControl type="text" placeholder="placeholder" />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-textarea">
                                <FormLabel>Text area</FormLabel>
                                <FormControl as="textarea" rows={5} spellCheck="false" />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-readonly">
                                <FormLabel>Readonly</FormLabel>
                                <FormControl type="text" value="Readonly input here..." readOnly />
                            </FormGroup>

                            <FormGroup controlId="example-disable">
                                <FormLabel>Disabled</FormLabel>
                                <FormControl type="text" value="Disabled value" disabled />
                            </FormGroup>
                        </Form>
                    </Col>

                    {/* Right Column */}
                    <Col lg={6}>
                        <Form>
                            <FormGroup className="mb-3" controlId="example-select">
                                <FormLabel>Input Select</FormLabel>
                                <FormSelect>
                                    {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
                                </FormSelect>
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-disabled-select">
                                <FormLabel>Disabled Select</FormLabel>
                                <FormSelect disabled>
                                    <option>Select Menu</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="exampleColorInput">
                                <FormLabel>Color Picker</FormLabel>
                                <FormControl type="color" defaultValue="#563d7c" title="Choose your color" />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-date">
                                <FormLabel>Date</FormLabel>
                                <FormControl type="date" />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-multiselect">
                                <FormLabel>Multiple Select</FormLabel>
                                <FormControl as="select" multiple>
                                    {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
                                </FormControl>
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="example-custom">
                                <FormLabel>Button With Dropdowns</FormLabel>
                                <InputGroup>
                                    <FormControl type="text" aria-label="Text input with dropdown button" />
                                    <DropdownButton variant="primary" title="Dropdown" align="end" id="input-group-dropdown-2">
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <DropdownDivider />
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownButton>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="exampleDataList">
                                <FormLabel>Datalist Example</FormLabel>
                                <FormControl type="text" list="datalistOptions" placeholder="Type to search..." />
                                <datalist id="datalistOptions">
                                    <option value="San Francisco" />
                                    <option value="New York" />
                                    <option value="Seattle" />
                                    <option value="Los Angeles" />
                                    <option value="Chicago" />
                                </datalist>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

            </CommonCard>
        </Col>;
};
const InputSizing = () => {
  return <Col lg={6}>
            <CommonCard title="Input Sizing" titleClass="mb-0">
                <Form>
                    <FormGroup className="mb-3" controlId="example-input-large">
                        <FormLabel>Large</FormLabel>
                        <FormControl type="text" placeholder=".input-lg" size="lg" />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="example-input-normal">
                        <FormLabel>Normal</FormLabel>
                        <FormControl type="text" placeholder="Normal" />
                    </FormGroup>

                    <FormGroup controlId="example-input-small">
                        <FormLabel>Small</FormLabel>
                        <FormControl type="text" placeholder=".input-sm" size="sm" />
                    </FormGroup>
                </Form>
            </CommonCard>
        </Col>;
};
const FileInput = () => {
  return <Col lg={6}>
            <CommonCard title='File Input' titleClass='mb-0'>

                <Form>
                    <FormGroup className="mb-3" controlId="formFile">
                        <FormLabel>Default file input example</FormLabel>
                        <FormControl type="file" />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="formFileSm">
                        <FormLabel>Small file input example</FormLabel>
                        <FormControl type="file" size="sm" />
                    </FormGroup>

                    <FormGroup controlId="formFileLg">
                        <FormLabel>Large file input example</FormLabel>
                        <FormControl type="file" size="lg" />
                    </FormGroup>
                </Form>
            </CommonCard>
        </Col>;
};
const BasicExample = () => {
  return <Col lg={6}>
            <CommonCard title='Basic Example' titleClass='mb-0'>

                <Form>
                    <FormGroup className="mb-3" controlId="exampleInputEmail1">
                        <FormLabel>Email address</FormLabel>
                        <FormControl type="email" placeholder="Enter email" aria-describedby="emailHelp" />
                        <FormText id="emailHelp" muted>
                            We'll never share your email with anyone else.
                        </FormText>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="exampleInputPassword1">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" placeholder="Password" />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="checkmeout0">
                        <FormCheck type="checkbox" label="Check me out!" />
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </CommonCard>
        </Col>;
};
const HorizontalForm = () => {
  return <Col lg={6}>
            <CommonCard title='Horizontal Form' titleClass='mb-0'>
                <Form>
                    <FormGroup as={Row} className="mb-3" controlId="inputEmail3">
                        <FormLabel column sm={2}>Email</FormLabel>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Enter email" />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="mb-3" controlId="inputPassword3">
                        <FormLabel column sm={2}>Password</FormLabel>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <fieldset className="mb-3">
                        <FormGroup as={Row}>
                            <FormLabel as="legend" column sm={2}>
                                Radios
                            </FormLabel>
                            <Col sm={10} className='d-flex gap-2'>
                                <FormCheck type="radio" label="First radio" name="gridRadios" id="gridRadios1" defaultChecked />
                                <FormCheck type="radio" label="Second radio" name="gridRadios" id="gridRadios2" />
                                <FormCheck type="radio" label="Third disabled radio" name="gridRadios" id="gridRadios3" disabled />
                            </Col>
                        </FormGroup>
                    </fieldset>

                    <FormGroup as={Row} className="mb-3" controlId="gridCheck1">
                        <Col sm={{
            span: 10,
            offset: 2
          }}>
                            <FormCheck label="Example checkbox" />
                        </Col>
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        Sign in
                    </Button>
                </Form>
            </CommonCard>
        </Col>;
};
const Checkboxes = () => {
  return <Col lg={6}>
            <CommonCard title='Checkboxes' titleClass='mb-0'>
                <Row>
                    <Col xs={6}>
                        <h6 className="fs-15">Checkboxes</h6>
                        <div className="mt-3">
                            <FormCheck className="mb-2" type="checkbox" id="flexCheckDefault" label="Default checkbox" />
                            <FormCheck type="checkbox" id="flexCheckChecked" label="Checked checkbox" defaultChecked />
                        </div>
                    </Col>

                    <Col xs={6}>
                        <h6 className="fs-15">Disabled</h6>
                        <div className="mt-3">
                            <FormCheck className="mb-2" type="checkbox" id="flexCheckDisabled" label="Disabled checkbox" disabled />
                            <FormCheck type="checkbox" id="flexCheckCheckedDisabled" label="Disabled checked checkbox" checked disabled />
                        </div>
                    </Col>
                </Row>
            </CommonCard>
        </Col>;
};
const Radios = () => {
  return <Col lg={6}>
            <CommonCard title='Radios' titleClass='mb-0'>
                <Row>
                    <Col xs={6}>
                        <h6 className="fs-15">Defaults</h6>
                        <div className="mt-3">
                            <FormCheck type="radio" id="flexRadioDefault1" name="flexRadioDefault" label="Default radio" className="mb-2" />
                            <FormCheck type="radio" id="flexRadioDefault2" name="flexRadioDefault" label="Default checked radio" defaultChecked />
                        </div>
                    </Col>

                    <Col xs={6}>
                        <h6 className="fs-15">Disabled</h6>
                        <div className="mt-3">
                            <FormCheck type="radio" id="flexRadioDisabled" name="flexRadioDisabled" label="Disabled radio" disabled className="mb-2" />
                            <FormCheck type="radio" id="flexRadioCheckedDisabled" name="flexRadioDisabled" label="Disabled checked radio" disabled defaultChecked />
                        </div>
                    </Col>
                </Row>
            </CommonCard>
        </Col>;
};
const InputSize = () => {
  return <Col lg={6}>
            <CommonCard title='Input Sizing' titleClass='mb-'>
                <InputGroup size="sm" className="mb-3">
                    <InputGroupText id="inputGroup-sizing-sm">Small</InputGroupText>
                    <FormControl aria-label="Small input" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroupText id="inputGroup-sizing-default">Default</InputGroupText>
                    <FormControl aria-label="Default input" aria-describedby="inputGroup-sizing-default" />
                </InputGroup>

                <InputGroup size="lg">
                    <InputGroupText id="inputGroup-sizing-lg">Large</InputGroupText>
                    <FormControl aria-label="Large input" aria-describedby="inputGroup-sizing-lg" />
                </InputGroup>
            </CommonCard>
        </Col>;
};
const LabelSize = () => {
  return <Col lg={6}>
            <CommonCard title='Horizontal form label sizing' titleClass='mb-0'>
                <Form>
                    <FormGroup as={Row} className="mb-3" controlId="colFormLabelSm">
                        <FormLabel column sm={2} className="col-form-label-sm">
                            Email
                        </FormLabel>
                        <Col sm={10}>
                            <FormControl type="email" size="sm" placeholder="col-form-label-sm" />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="mb-3" controlId="colFormLabel">
                        <FormLabel column sm={2}>
                            Email
                        </FormLabel>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="col-form-label" />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} controlId="colFormLabelLg">
                        <FormLabel column sm={2} className="col-form-label-lg">
                            Email
                        </FormLabel>
                        <Col sm={10}>
                            <FormControl type="email" size="lg" placeholder="col-form-label-lg" />
                        </Col>
                    </FormGroup>
                </Form>
            </CommonCard>
        </Col>;
};
const InlineForm = () => {
  return <Col xs={12}>
            <CommonCard title='Inline Forms' titleClass='mb-0'>

                <Form className="row row-cols-lg-auto g-3 align-items-center">
                    <Col xs="auto">
                        <FormLabel visuallyHidden htmlFor="inlineFormInputGroupUsername">
                            Username
                        </FormLabel>
                        <InputGroup>
                            <InputGroupText>@</InputGroupText>
                            <FormControl id="inlineFormInputGroupUsername" placeholder="Username" />
                        </InputGroup>
                    </Col>

                    <Col xs="auto">
                        <FormLabel visuallyHidden htmlFor="inlineFormSelectPref">
                            Preference
                        </FormLabel>
                        <FormSelect id="inlineFormSelectPref" defaultValue="">
                            <option value="">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </FormSelect>
                    </Col>

                    <Col xs="auto">
                        <FormCheck type="checkbox" id="inlineFormCheck" label="Remember me" />
                    </Col>

                    <Col xs="auto">
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form>

                <h6 className="fs-15 mt-3">Auto-sizing</h6>
                <Form className="row gy-2 gx-3 align-items-center">
                    <Col sm={5}>
                        <FormLabel visuallyHidden htmlFor="autoSizingInput">
                            Name
                        </FormLabel>
                        <FormControl id="autoSizingInput" placeholder="Jane Doe" />
                    </Col>

                    <Col sm={3}>
                        <FormLabel visuallyHidden htmlFor="autoSizingInputGroup">
                            Username
                        </FormLabel>
                        <InputGroup>
                            <InputGroupText>@</InputGroupText>
                            <FormControl id="autoSizingInputGroup" placeholder="Username" />
                        </InputGroup>
                    </Col>

                    <Col xs="auto">
                        <FormLabel visuallyHidden htmlFor="autoSizingSelect">
                            Preference
                        </FormLabel>
                        <FormSelect id="autoSizingSelect" defaultValue="">
                            <option value="">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </FormSelect>
                    </Col>

                    <Col xs="auto">
                        <FormCheck type="checkbox" id="autoSizingCheck" label="Remember me" />
                    </Col>

                    <Col xs="auto">
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form>
            </CommonCard>
        </Col>;
};
const FloatingLabels = () => {
  return <Col xs={12}>
            <CommonCard title='Floating Labels' titleClass='mb-0'>

                <Row>
                    <Col lg={6}>
                        <h6 className="fs-15 mb-3">Example</h6>

                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <FormControl type="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <FormControl type="password" placeholder="Password" />
                        </FloatingLabel>

                        <h6 className="fs-15 mb-3">Textareas</h6>

                        <FloatingLabel controlId="floatingTextarea" label="Comments">
                            <FormControl as="textarea" placeholder="Leave a comment here" style={{
              height: '100px'
            }} />
                        </FloatingLabel>
                    </Col>

                    <Col lg={6}>
                        <h6 className="fs-15 mb-3">Selects</h6>

                        <FloatingLabel controlId="floatingSelect" label="Works with selects" className="mb-3">
                            <FormSelect aria-label="Floating label select example" defaultValue="">
                                <option value="">Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </FormSelect>
                        </FloatingLabel>

                        <h6 className="fs-15 mb-3">Layout</h6>

                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Email address" className="mb-3">
                                    <FormControl type="email" defaultValue="mdo@example.com" placeholder="name@example.com" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingSelectGrid" label="Works with selects" className="mb-3">
                                    <FormSelect defaultValue="">
                                        <option value="">Open this select menu</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </FormSelect>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CommonCard>
        </Col>;
};
const FloatingDisabled = () => {
  return <Col lg={6}>
            <CommonCard title='Floating Disabled' titleClass='mb-0'>

                <FloatingLabel controlId="floatingInputDisabled" label="Email address" className="mb-3">
                    <FormControl type="email" placeholder="name@example.com" disabled />
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextareaDisabled" label="Comments" className="mb-3">
                    <FormControl as="textarea" placeholder="Leave a comment here" disabled />
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2Disabled" label="Comments" className="mb-3">
                    <FormControl as="textarea" placeholder="Leave a comment here" disabled style={{
          height: '100px'
        }} defaultValue="Disabled textarea with some text inside" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelectDisabled" label="Works with selects">
                    <FormSelect aria-label="Floating label disabled select example" disabled defaultValue="">
                        <option value="">Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </FormSelect>
                </FloatingLabel>
            </CommonCard>
        </Col>;
};
const InputGroups = () => {
  return <Col lg={6}>
            <CommonCard title='Input Group' titleClass='mb-0'>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </InputGroup>

                <InputGroup className="mb-3">
                    <FormControl placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <InputGroupText id="basic-addon2">@example.com</InputGroupText>
                </InputGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="basic-url">Your vanity URL</FormLabel>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon3">https://example.com/users/</InputGroup.Text>
                        <FormControl id="basic-url" aria-describedby="basic-addon3 basic-addon4" />
                    </InputGroup>
                    <FormText id="basic-addon4" muted>
                        Example help text goes outside the input group.
                    </FormText>
                </FormGroup>

                <InputGroup className="mb-3">
                    <InputGroupText>$</InputGroupText>
                    <FormControl aria-label="Amount (to the nearest dollar)" />
                    <InputGroupText>.00</InputGroupText>
                </InputGroup>

                <InputGroup className="mb-3">
                    <FormControl placeholder="Username" aria-label="Username" />
                    <InputGroupText>@</InputGroupText>
                    <FormControl placeholder="Server" aria-label="Server" />
                </InputGroup>

                <InputGroup>
                    <InputGroupText>With textarea</InputGroupText>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>
            </CommonCard>
        </Col>;
};
const DropDownButtos = () => {
  return <Col lg={6}>
            <CommonCard title='Buttons With Dropdowns' titleClass='mb-0'>
                <div className="mb-3">
                    <FormLabel>Dropdown</FormLabel>
                    <InputGroup>
                        <Form.Control type="text" aria-label="Text input with dropdown button" />
                        <Dropdown>
                            <DropdownToggle variant="outline-primary" id="dropdown-button">
                                Dropdown
                            </DropdownToggle>
                            <DropdownMenu align="end">
                                <DropdownItem href="#">Action</DropdownItem>
                                <DropdownItem href="#">Another action</DropdownItem>
                                <DropdownItem href="#">Something else here</DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="#">Separated link</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </InputGroup>
                </div>

                <div className="mb-0">
                    <FormLabel>Custom File Input</FormLabel>

                    <InputGroup className="mb-3">
                        <FormControl type="file" id="inputGroupFile02" />
                        <InputGroupText>Upload</InputGroupText>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupText>Upload</InputGroupText>
                        <FormControl type="file" id="inputGroupFile01" />
                    </InputGroup>
                </div>

            </CommonCard>
        </Col>;
};
const SwitchesSide = () => {
  return <Col lg={6}>
            <CommonCard title="Switches" titleClass='mb-0'>

                <h6 className="fs-15 mb-3">Left Side Switches</h6>

                <FormCheck type="switch" id="flexSwitchCheckDefault" label="Default switch checkbox input" className="mb-2" />

                <FormCheck type="switch" id="flexSwitchCheckChecked" label="Checked switch checkbox input" defaultChecked className="mb-2" />

                <FormCheck type="switch" id="flexSwitchCheckDisabled" label="Disabled switch checkbox input" disabled className="mb-2" />

                <FormCheck type="switch" id="flexSwitchCheckCheckedDisabled" label="Disabled checked switch checkbox input" defaultChecked disabled />
            </CommonCard>
        </Col>;
};
const GeneralElements = () => {
  return <>
            <Row>
                <InputType />
            </Row>
            <Row>
                <InputSizing />
                <FileInput />
                <BasicExample />
                <HorizontalForm />
                <Checkboxes />
                <Radios />
                <InputSize />
                <LabelSize />
            </Row>
            <Row>
                <InlineForm />
            </Row>
            <Row>
                <FloatingLabels />
            </Row>
            <Row>
                <FloatingDisabled />
                <InputGroups />
                <DropDownButtos />
                <SwitchesSide />
            </Row>

        </>;
};
export default GeneralElements;