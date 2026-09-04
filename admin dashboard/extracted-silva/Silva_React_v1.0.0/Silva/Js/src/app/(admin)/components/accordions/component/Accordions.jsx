import { Accordion, Card, Row, Col, CardHeader, CardBody, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
const defaultItems = [{
  id: 'One',
  title: 'Accordion Item #1',
  body: <>
                <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.These classes control the overall appearance, as well as the showing and hiding via CSS transitions.You can modify any of this with custom CSS or overriding our default variables.It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </>
}, {
  id: 'Two',
  title: 'Accordion Item #2',
  body: <>
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </>
}, {
  id: 'Three',
  title: 'Accordion Item #3',
  body: <>
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </>
}];
const flushItems = [{
  id: 'One',
  title: 'Accordion Item #1',
  body: <>
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
            </>
}, {
  id: 'Two',
  title: 'Accordion Item #2',
  body: <>
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.
            </>
}, {
  id: 'Three',
  title: 'Accordion Item #3',
  body: <>
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
            </>
}];
const alwaysOpenItems = [{
  id: 'One',
  title: 'Accordion Item #1',
  body: <>
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </>
}, {
  id: 'Two',
  title: 'Accordion Item #2',
  body: <>
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </>
}, {
  id: 'Three',
  title: 'Accordion Item #3',
  body: <>
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </>
}];
const Accordions = () => {
  return <Row>
            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Accordion Example</h5>
                    </CardHeader>
                    <CardBody>
                        <Accordion defaultActiveKey="0">
                            {defaultItems.map((item, index) => <AccordionItem eventKey={index.toString()} key={index}>
                                    <AccordionHeader>{item.title}</AccordionHeader>
                                    <AccordionBody>{item.body}</AccordionBody>
                                </AccordionItem>)}
                        </Accordion>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Accordion Example Flush</h5>
                    </CardHeader>
                    <CardBody>
                        <Accordion flush>
                            {flushItems.map((item, index) => <AccordionItem eventKey={index.toString()} key={index}>
                                    <AccordionHeader>{item.title}</AccordionHeader>
                                    <AccordionBody>{item.body}</AccordionBody>
                                </AccordionItem>)}
                        </Accordion>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Accordion Always Open</h5>
                    </CardHeader>
                    <CardBody>
                        <Accordion alwaysOpen defaultActiveKey="0">
                            {alwaysOpenItems.map((item, index) => <AccordionItem eventKey={index.toString()} key={index}>
                                    <AccordionHeader>{item.title}</AccordionHeader>
                                    <AccordionBody>{item.body}</AccordionBody>

                                </AccordionItem>)}
                        </Accordion>
                    </CardBody>
                </Card>
            </Col>
        </Row>;
};
export default Accordions;