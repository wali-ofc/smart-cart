import CommonCard from '@/component/CommonCard';
import { Col, Row } from 'react-bootstrap';
const Typography = () => {
  return <>
            <Row>
                <Col xl={6}>
                    <CommonCard title='Heading' titleClass='mb-0'>
                        <h1>h1. Bootstrap heading</h1>
                        <h2>h2. Bootstrap heading</h2>
                        <h3>h3. Bootstrap heading</h3>
                        <h4>h4. Bootstrap heading</h4>
                        <h5>h5. Bootstrap heading</h5>
                        <h6 className="mb-0">h6. Bootstrap heading</h6>
                    </CommonCard>
                </Col>

                <Col xl={6}>
                    <CommonCard title='Description List Alignment' titleClass='mb-0'>
                        <dl className="row">
                            <dt className="col-sm-3">Description lists</dt>
                            <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

                            <dt className="col-sm-3">Term</dt>
                            <dd className="col-sm-9">
                                <p>Definition for the term.</p>
                                <p>And some more placeholder definition text.</p>
                            </dd>

                            <dt className="col-sm-3">Another term</dt>
                            <dd className="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>

                            <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
                            <dd className="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

                            <dt className="col-sm-3">Nesting</dt>
                            <dd className="col-sm-9">
                                <dl className="row">
                                    <dt className="col-sm-4">Nested definition list</dt>
                                    <dd className="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
                                </dl>
                            </dd>
                        </dl>
                    </CommonCard>
                </Col>

            </Row>

            <Row>
                <Col xl={12}>
                    <CommonCard title='Display headings' titleClass='mb-0'>
                        <h1 className="display-1">Display 1</h1>
                        <h1 className="display-2">Display 2</h1>
                        <h1 className="display-3">Display 3</h1>
                        <h1 className="display-4">Display 4</h1>
                        <h1 className="display-5">Display 5</h1>
                        <h1 className="display-6 mb-0">Display 6</h1>
                    </CommonCard>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <CommonCard title='Blockquotes' titleClass='mb-0'>
                        <Row>
                            <Col md={12}>
                                <figure>
                                    <blockquote className="blockquote font-size-16 mb-0">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer mt-2 mb-0">
                                        Someone famous in <cite title="Source Title">Source Title</cite>
                                    </figcaption>
                                </figure>
                            </Col>

                            <Col md={12}>
                                <figure className="text-center">
                                    <blockquote className="blockquote font-size-16 mb-0">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer mt-2 mb-0">
                                        Someone famous in <cite title="Source Title">Source Title</cite>
                                    </figcaption>
                                </figure>
                            </Col>

                            <Col md={12}>
                                <figure className="text-end mb-0">
                                    <blockquote className="blockquote font-size-16 mb-0">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer mt-2 mb-0">
                                        Someone famous in <cite title="Source Title">Source Title</cite>
                                    </figcaption>
                                </figure>
                            </Col>

                        </Row>
                    </CommonCard>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <CommonCard title='Inline Text Elements' titleClass='mb-0'>
                        <p>You can use the mark tag to <mark>highlight</mark> text.</p>
                        <p><del>This line of text is meant to be treated as deleted text.</del></p>
                        <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
                        <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
                        <p><u>This line of text will render as underlined.</u></p>
                        <p><small>This line of text is meant to be treated as fine print.</small></p>
                        <p><strong>This line rendered as bold text.</strong></p>
                        <p className="mb-0"><em>This line rendered as italicized text.</em></p>
                    </CommonCard>
                </Col>

                <Col xl={6}>
                    <Row>
                        <Col xs={12}>
                            <CommonCard title='Unstyled List' titleClass='mb-0'>
                                <ul className="list-unstyled mb-0">
                                    <li>This is a list.</li>
                                    <li>It appears completely unstyled.</li>
                                    <li>Structurally, it's still a list.</li>
                                    <li>However, this style only applies to immediate child elements.</li>
                                    <li>Nested lists:
                                        <ul>
                                            <li>are unaffected by this style</li>
                                            <li>will still show a bullet</li>
                                            <li>and have appropriate left margin</li>
                                        </ul>
                                    </li>
                                    <li>This may still come in handy in some situations.</li>
                                </ul>
                            </CommonCard>
                        </Col>

                        <Col xs={12}>
                            <CommonCard title='Inline List' titleClass='mb-0'>

                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">This is a list item.</li>
                                    <li className="list-inline-item">And another one.</li>
                                    <li className="list-inline-item">But they're displayed inline.</li>
                                </ul>
                            </CommonCard>
                        </Col>

                    </Row>
                </Col>

                <Col xl={6}>
                    <CommonCard title='Unordered' titleClass='mb-0'>
                        <ul className="mb-0">
                            <li>
                                This is a list.
                            </li>
                            <li>
                                It appears completely unstyled.
                            </li>
                            <li>
                                Structurally, it's still a list.
                            </li>
                            <li>
                                However, this style only applies to immediate child elements.
                            </li>
                            <li>
                                Nested lists:
                                <ol>
                                    <li>
                                        Are unaffected by this style
                                    </li>
                                    <li>
                                        Will still show a bullet
                                    </li>
                                    <li>
                                        And have appropriate left margin
                                    </li>
                                    <li>
                                        Ac tristique libero volutpat at
                                    </li>
                                </ol>
                            </li>
                            <li>
                                This may still come in handy in some situations
                            </li>
                        </ul>
                    </CommonCard>
                </Col>

                <Col xl={6}>
                    <CommonCard title='Ordered' titleClass='mb-0'>

                        <ol className="mb-0">
                            <li>
                                This is a list.
                            </li>
                            <li>
                                It appears completely unstyled.
                            </li>
                            <li>
                                Structurally, it's still a list.
                            </li>
                            <li>
                                However, this style only applies to immediate child elements.
                            </li>
                            <li>
                                Nested lists:
                                <ol>
                                    <li>
                                        Are unaffected by this style
                                    </li>
                                    <li>
                                        Will still show a bullet
                                    </li>
                                    <li>
                                        And have appropriate left margin
                                    </li>
                                    <li>
                                        Ac tristique libero volutpat at
                                    </li>
                                </ol>
                            </li>
                            <li>
                                This may still come in handy in some situations
                            </li>
                        </ol>
                    </CommonCard>
                </Col>

            </Row>
        </>;
};
export default Typography;