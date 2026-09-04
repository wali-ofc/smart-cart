import samllImg1 from "@/assets/images/small/img-1.jpg";
import smallImg2 from "@/assets/images/small/img-2.jpg";
import smallImg3 from "@/assets/images/small/img-3.jpg";
import smallImg4 from "@/assets/images/small/img-4.jpg";
import smallImg5 from "@/assets/images/small/img-5.jpg";
import smallImg7 from "@/assets/images/small/img-7.jpg";
import smallImg6 from "@/assets/images/small/img-6.jpg";
import smallImg8 from "@/assets/images/small/img-8.jpg";
import samllImg9 from "@/assets/images/small/img-9.jpg";
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import IconifyIcon from '@/component/wrapper/IconifyIcon';
const Cards = () => {
  const SizingData = [{
    id: 1,
    title: 'Special title treatment 1',
    text: 'With supporting text below as a natural lead-in to additional content.',
    link: '#'
  }, {
    id: 2,
    title: 'Special title treatment 2',
    text: 'With supporting text below as a natural lead-in to additional content.',
    link: '#'
  }];
  const TextAlignmentData = [{
    id: 1,
    alignClass: '',
    title: 'Special title treatment',
    text: 'With supporting text below as a natural lead-in to additional content.',
    link: '#'
  }, {
    id: 2,
    alignClass: 'text-center',
    title: 'Special title treatment',
    text: 'With supporting text below as a natural lead-in to additional content.',
    link: '#'
  }, {
    id: 3,
    alignClass: 'text-end',
    title: 'Special title treatment',
    text: 'With supporting text below as a natural lead-in to additional content.',
    link: '#'
  }];
  const CardStyle = [{
    bgClass: "text-bg-primary",
    title: "Primary Card"
  }, {
    bgClass: "text-bg-secondary",
    title: "Secondary Card"
  }, {
    bgClass: "text-bg-success",
    title: "Success Card"
  }, {
    bgClass: "text-bg-danger",
    title: "Danger Card"
  }, {
    bgClass: "text-bg-warning",
    title: "Warning Card"
  }, {
    bgClass: "text-bg-info",
    title: "Info Card"
  }, {
    bgClass: "text-bg-light",
    title: "Light Card"
  }, {
    bgClass: "text-bg-dark",
    title: "Dark Card"
  }, {
    bgClass: "bg-white",
    title: "White Card",
    textColor: "text-dark"
  }];
  const outlineCards = [{
    borderColor: "primary",
    textColor: "text-primary",
    title: "Primary Outline Card"
  }, {
    borderColor: "secondary",
    textColor: "text-secondary",
    title: "Secondary Outline Card"
  }, {
    borderColor: "success",
    textColor: "text-success",
    title: "Success Outline Card"
  }, {
    borderColor: "danger",
    textColor: "text-danger",
    title: "Danger Outline Card"
  }, {
    borderColor: "warning",
    textColor: "text-warning",
    title: "Warning Outline Card"
  }, {
    borderColor: "info",
    textColor: "text-info",
    title: "Info Outline Card"
  }, {
    borderColor: "light",
    textColor: "text-dark",
    title: "Light Outline Card"
  }, {
    borderColor: "dark",
    textColor: "text-dark",
    title: "Dark Outline Card"
  }, {
    borderColor: "white",
    textColor: "text-dark",
    title: "White Outline Card"
  }];
  const cardGroups = [[{
    img: smallImg6,
    title: "Card title",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    footer: "Last updated 3 mins ago"
  }, {
    img: smallImg7,
    title: "Card title",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    footer: "Last updated 3 mins ago"
  }, {
    img: samllImg9,
    title: "Card title",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    footer: "Last updated 3 mins ago"
  }], [{
    img: samllImg1,
    title: "Card title",
    text: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
    footer: "Last updated 3 mins ago"
  }, {
    img: smallImg2,
    title: "Card title",
    text: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
    footer: "Last updated 3 mins ago"
  }, {
    img: smallImg3,
    title: "Card title",
    text: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
    footer: "Last updated 3 mins ago"
  }]];
  const GridCardData = [{
    image: smallImg6,
    title: 'Card title',
    text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
  }, {
    image: smallImg7,
    title: 'Card title',
    text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
  }, {
    image: smallImg5,
    title: 'Card title',
    text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
  }, {
    image: smallImg4,
    title: 'Card title',
    text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
  }];
  const cardData = [{
    img: smallImg6,
    title: 'Card title'
  }, {
    img: samllImg1,
    title: 'Card title'
  }, {
    img: smallImg3,
    title: 'Card title'
  }, {
    img: smallImg7,
    title: 'Card title'
  }, {
    img: samllImg1,
    title: 'Card title'
  }, {
    img: smallImg6,
    title: 'Card title',
    text: 'This is a short card.'
  }, {
    img: smallImg5,
    title: 'Card title'
  }, {
    img: smallImg3,
    title: 'Card title'
  }];
  return <>
      <Row>
        <Col sm={6} xl={3}>
          <Card className="d-block">
            <img className="card-img-top rounded-top img-fluid" src={samllImg1} alt="Card image cap" />
            <CardBody>
              <h4 className="card-title">Card title</h4>
              <p className="card-text text-muted">Some quick example text to build on the card title and make
                up the bulk of the card's content.</p>
              <Link to="javascript: void(0);" className="btn btn-primary">Button</Link>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="d-block">
            <img className="card-img-top rounded-top img-fluid" src={smallImg2} alt="Card image cap" />
            <CardBody>
              <h4 className="card-title">Card title</h4>
              <p className="card-text text-muted">Some quick example text to build on the card..</p>
            </CardBody>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-white">Cras justo odio</li>
            </ul>
            <CardBody>
              <Link to="javascript: void(0);" className="card-link fw-medium">Card link</Link>
              <Link to="javascript: void(0);" className="card-link fw-medium">Another link</Link>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="d-block">
            <img className="card-img-top rounded-top img-fluid" src={smallImg3} alt="Card image cap" />
            <CardBody>
              <p className="card-text text-muted">Some quick example text to build on the card title and make
                up the bulk of the card's content. Some quick example text to build on the card
                title and make up.</p>
              <Link to="javascript: void(0);" className="btn btn-primary">Button</Link>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="d-block">
            <CardBody>
              <h4 className="card-title">Card title</h4>
              <h6 className="card-subtitle text-muted">Support card subtitle</h6>
            </CardBody>
            <img className="img-fluid" src={smallImg4} alt="Card image cap" />
            <CardBody>
              <p className="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <Link to="javascript: void(0);" className="card-link text-custom">Card link</Link>
              <Link to="javascript: void(0);" className="card-link text-custom">Another link</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Header and footer</h5>
        </Col>
      </Row>

      <Row>
        <Col sm={6} lg={4}>
          <Card className="d-block">
            <h5 className="card-header">Featured</h5>
            <CardBody>
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text text-muted">With supporting text below as a natural lead-in to additional content.</p>
              <Link to="#" className="btn btn-primary">Go somewhere</Link>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} lg={4}>
          <Card className="d-block">
            <CardHeader>Quote</CardHeader>

            <CardBody>
              <blockquote className="card-blockquote mb-0">
                <p className="card-text text-muted">With supporting text below as a natural lead-in to additional content.</p>
                <footer className="blockquote-footer mt-0 font-size-12">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </CardBody>

          </Card>
        </Col>

        <Col sm={6} lg={4}>
          <Card className="d-block">
            <CardHeader>Featured</CardHeader>
            <CardBody>
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text text-muted">With supporting text below as a natural lead-in to additional content.</p>
              <Link to="#" className="btn btn-primary">Go somewhere</Link>
            </CardBody>
            <div className="card-footer text-body-secondary bg-transparent border-top text-muted">2 days ago</div>
          </Card>
        </Col>


        <Col sm={6} lg={4}>
          <Card className="d-block">
            <CardHeader>
              <h4 className="card-title mb-0">Basic Card</h4>
            </CardHeader>
            <CardBody>
              <p className="text-muted">Nemo enim ipsam voluptatem quia voluptas site that aspernatur aut odit aut fugit sed quia consequunture magni that is dolores qui ratione voluptateme.</p>
              <p className="text-muted mb-0">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} lg={4}>
          <Card className="d-block">
            <CardHeader>
              <h4 className="card-title">Card Sub Title</h4>
              <p className="card-text text-muted mb-0">With supporting text below as a natural lead-in to additional content.</p>
            </CardHeader>
            <CardBody>
              <p className="card-text text-muted mb-0">Nemo enim ipsam voluptatem quia voluptas site that aspernatur aut odit aut fugit sed quia consequunture magni that is dolores qui ratione voluptateme.</p>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} lg={4}>
          <Card className="d-block">
            <CardHeader>
              <h4 className="card-title"> <IconifyIcon icon="mdi:emoticon-wink-outline" className="me-1" />Icon with Heading</h4>
            </CardHeader>
            <CardBody>
              <p className="card-text text-muted mb-0">Nemo enim ipsam voluptatem quia voluptas site that aspernatur aut odit aut fugit sed quia consequunture magni that is dolores qui ratione voluptateme.</p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Sizing</h5>
        </Col>
      </Row>
      <Row>
        {SizingData.map(card => <Col md={6} key={card.id}>
            <Card>
              <CardBody>
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text text-muted">{card.text}</p>
                <Link to={card.link} className="btn btn-primary">Go somewhere</Link>
              </CardBody>
            </Card>
          </Col>)}
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Text alignment</h5>
        </Col>
      </Row>

      <Row>
        {TextAlignmentData.map(cardAlign => <Col lg={4} className={cardAlign.alignClass} key={cardAlign.id}>
            <Card className="card-body">
              <h5 className="card-title">{cardAlign.title}</h5>
              <p className="card-text text-muted">{cardAlign.text}</p>
              <Link to={cardAlign.link} className="btn btn-primary">Go somewhere</Link>
            </Card>
          </Col>)}
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Navigation</h5>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="text-center">
            <CardHeader>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="true" to="#">Active</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Link</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link disabled" aria-disabled="true">Disabled</Link>
                </li>
              </ul>
            </CardHeader>
            <CardBody>
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text text-muted">With supporting text below as a natural lead-in to additional content.</p>
              <Link to="#" className="btn btn-primary">Go somewhere</Link>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6} className="text-center">
          <Card className="text-center">

            <CardHeader>
              <ul className="nav nav-pills card-header-pills">
                <li className="nav-item">
                  <Link className="nav-link active" to="#">Active</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Link</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link disabled" aria-disabled="true">Disabled</Link>
                </li>
              </ul>
            </CardHeader>
            <CardBody>
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text text-muted">With supporting text below as a natural lead-in to additional content.</p>
              <Link to="#" className="btn btn-primary">Go somewhere</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Image Caps & Overlays</h5>
        </Col>
      </Row>


      <Row>
        <Col lg={4} md={6}>
          <Card>
            <img className="card-img-top rounded-top img-fluid" src={smallImg5} alt="Card image top" />
            <CardBody>
              <h5 className="card-title">Card title</h5>
              <p className="card-text text-muted">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </CardBody>
          </Card>
        </Col>

        <Col lg={4} md={6}>
          <Card>
            <CardBody>
              <h5 className="card-title">Card title</h5>
              <p className="card-text text-muted">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </CardBody>
            <img className="card-img-bottom rounded-bottom img-fluid" src={smallImg7} alt="Card image bottom" />
          </Card>
        </Col>

        <Col lg={4} md={6}>
          <Card className="text-bg-dark">
            <img className="card-img rounded img-fluid" src={smallImg6} alt="Card image overlay" />
            <div className="card-img-overlay">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small>Last updated 3 mins ago</small></p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Horizontal</h5>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card>
            <Row className="no-gutters align-items-center">
              <Col md={5}>
                <img className="card-img img-fluid rounde" src={smallImg8} alt="Card image" />
              </Col>
              <Col md={7}>
                <CardBody>
                  <h5 className="card-title mb-1">Card title</h5>
                  <p className="card-text text-muted">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Row className="no-gutters align-items-center">
              <Col md={7}>
                <CardBody>
                  <h5 className="card-title mb-1">Card title</h5>
                  <p className="card-text text-muted">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </CardBody>
              </Col>
              <Col md={5}>
                <img className="card-img img-fluid" src={samllImg9} alt="Card image" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Card Styles</h5>
        </Col>
      </Row>

      <Row>
        {CardStyle.map((card, index) => <Col lg={4} md={6} key={index}>
            <div className={`card ${card.bgClass} ${card.textColor || ""}`}>
              <div className="card-header">
                <h4 className="card-title mb-0">{card.title}</h4>
              </div>
              <CardBody>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </CardBody>
            </div>
          </Col>)}
      </Row>

      <Row>
        {outlineCards.map((card, index) => <Col lg={4} md={6} key={index}>
            <div className={`card border border-${card.borderColor}`}>
              <div className={`card-header bg-transparent border-${card.borderColor}`}>
                <h4 className={`card-title mb-0 ${card.textColor}`}>{card.title}</h4>
              </div>
              <CardBody className={card.textColor}>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </CardBody>
            </div>
          </Col>)}
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Card Groups</h5>
        </Col>
      </Row>

      <>
        {cardGroups.map((group, groupIndex) => <Row className={`${groupIndex !== 0 ? ' mt-3' : ''}`} key={groupIndex}>
            <Col xs={12}>
              <div className="card-deck-wrapper">
                <div className="card-group">
                  {group.map((card, cardIndex) => <Card key={cardIndex}>
                      <img className="card-img-top img-fluid" src={card.img} alt="Card image cap" />
                      <CardBody>
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text text-muted">{card.text}</p>
                        {card.footer && !groupIndex && <p className="card-text">
                            <small className="text-body-secondary">
                              {card.footer}
                            </small>
                          </p>}
                      </CardBody>
                      {card.footer && groupIndex === 1 && <div className="card-footer border-top">
                          <small className="text-body-secondary">{card.footer}</small>
                        </div>}
                    </Card>)}
                </div>
              </div>
            </Col>
          </Row>)}
      </>

      <Row>
        <Col lg={12} md={12}>
          <h5 className="mb-4 mt-4">Grid cards</h5>
        </Col>
      </Row>


      <Row>
        <Col xs={12}>
          <Row className="row-cols-1 row-cols-md-2">
            {GridCardData.map((card, index) => <Col key={index}>
                <Card>
                  <img src={card.image} className="card-img-top rounded-top" alt="grid card" />
                  <CardBody>
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text text-muted">{card.text}</p>
                  </CardBody>
                </Card>
              </Col>)}
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Row className="row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
            {cardData.map((card, index) => <Col key={index}>
                <Card className="h-100">
                  <img src={card.img} className="card-img-top rounded-top img-fluid" alt="grid card" />
                  <CardBody>
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text text-muted">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </CardBody>
                </Card>
              </Col>)}
          </Row>
        </Col>
      </Row>
    </>;
};
export default Cards;