import gallery1 from "@/assets/images/gallery/1.jpg"
import gallery2 from "@/assets/images/gallery/2.jpg"
import gallery3 from "@/assets/images/gallery/3.jpg"
import gallery4 from "@/assets/images/gallery/4.jpg"
import gallery5 from "@/assets/images/gallery/5.jpg"
import gallery6 from "@/assets/images/gallery/6.jpg"
import gallery7 from "@/assets/images/gallery/7.jpg"
import gallery8 from "@/assets/images/gallery/8.jpg"
import gallery9 from "@/assets/images/gallery/9.jpg"
import gallery10 from "@/assets/images/gallery/10.png"
import gallery11 from "@/assets/images/gallery/11.png"
import gallery12 from "@/assets/images/gallery/12.png"
import { Col, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"


type GalleryItem = {
    Img: string,
    alt: string
}

const galleryItems: GalleryItem[] = [
    { Img: gallery1, alt: 'gallery-image' },
    { Img: gallery2, alt: 'gallery-image' },
    { Img: gallery3, alt: 'gallery-image' },
    { Img: gallery4, alt: 'gallery-image' },
    { Img: gallery5, alt: 'gallery-image' },
    { Img: gallery6, alt: 'gallery-image' },
    { Img: gallery7, alt: 'gallery-image' },
    { Img: gallery8, alt: 'gallery-image' },
    { Img: gallery9, alt: 'gallery-image' },
    { Img: gallery10, alt: 'gallery-image' },
    { Img: gallery11, alt: 'gallery-image' },
    { Img: gallery12, alt: 'gallery-image' }
]

const Gallery = () => {
    return (
        <Row>
            <Col lg={12}>
                <Row>
                    {galleryItems.map((item, index) => (
                        <Col lg={3} md={3} key={index}>
                            <div className={`card gallery-container gallery-grid position-relative d-block overflow-hidden rounded ${index >= 6 ? 'mb-0' : ''}`}>
                                <div className="card-body gallery-image p-0">
                                    <Link to="gallery" className="image-popup d-inline-block">
                                        <img src={item.Img} className="img-fluid" alt={item.alt} />
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default Gallery
