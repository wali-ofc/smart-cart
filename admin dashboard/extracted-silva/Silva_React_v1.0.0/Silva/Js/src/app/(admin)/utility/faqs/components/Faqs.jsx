import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { Copy, Disc, HardDrive, Loader, MessageSquare, Smile, User, Zap } from 'react-feather';
const faqData = [{
  icon: <Smile className="fea icon-md text-primary" />,
  question: "Is there a free trail available?",
  answer: "The admin panel SaaS is a platform that provides administrators with a centralized interface to manage various aspects of their software."
}, {
  icon: <Copy className="fea icon-md text-primary" />,
  question: "What features does the admin panel SaaS offer?",
  answer: "The features may vary depending on the specific platform, but commonly included features are user authentication and authorization."
}, {
  icon: <Disc className="fea icon-md text-primary" />,
  question: "How can I sign up for the admin panel SaaS?",
  answer: "To sign up, visit our website and follow the registration process. You'll need to provide some basic information and choose a subscription plan."
}, {
  icon: <User className="fea icon-md text-primary" />,
  question: "What is the Installation?",
  answer: "The Installation SaaS is a platform designed to streamline the installation process for various software applications or systems."
}, {
  icon: <HardDrive className="fea icon-md text-primary" />,
  question: "Is the admin panel customizable?",
  answer: "Yes, the admin panel SaaS often offers customization options to tailor the interface to your specific requirements. This may include branding customization."
}, {
  icon: <Loader className="fea icon-md text-primary" />,
  question: "Is there a mobile app for the admin panel?",
  answer: "Some admin panel SaaS platforms offer mobile apps or have responsive web designs, allowing you to access the admin panel from mobile devices."
}, {
  icon: <MessageSquare className="fea icon-md text-primary" />,
  question: "Can I integrate the admin panel SaaS with other tools or services?",
  answer: "Yes, the admin panel SaaS often supports integrations with various third-party tools and services through APIs or pre-built connectors."
}, {
  icon: <Zap className="fea icon-md text-primary" />,
  question: "How does it work?",
  answer: "The Buying Product SaaS is a platform that facilitates the purchase process for both buyers and sellers. It provides a centralized marketplace."
}];
const Faqs = () => {
  return <>
            <Row>
                <Col xxl={12}>
                    <div className="profile-container p-5">
                        <div className="justify-content-center align-content-center text-center">
                            <p className="fs-14 mb-0 text-white fw-medium">FAQs</p>
                            <h3 className="mb-0 fs-26 text-white">Frequently Asked Questions</h3>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xxl={12}>
                    <Card>
                        <CardBody>
                            <Row className="mt-4">
                                {[0, 1].map(colIndex => <Col xl={6} key={colIndex}>
                                        <div className="p-2">
                                            {faqData.slice(colIndex * 4, colIndex * 4 + 4).map((faq, index) => <div className={`mb-3 ${index === 3 ? '' : ''}`} key={faq.question}>
                                                        <div className="faq-icon-box bg-primary-subtle">
                                                            {faq.icon}
                                                        </div>
                                                        <h4 className="f-question">{faq.question}</h4>
                                                        <p className={`f-answer ${index === 3 ? 'mb-0' : 'mb-4'}`}>{faq.answer}</p>
                                                    </div>)}
                                        </div>
                                    </Col>)}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>;
};
export default Faqs;