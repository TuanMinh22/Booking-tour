import React from 'react'
import '../styles/home.css'
import { Container, Row, Col, CardSubtitle } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png'

import Subtitle from './../shared/subtitle'
import SearchBar from './../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'
import NewsLetter from '../shared/Newsletter'

const Home = () => {
  return <>
    {/* ========== HERO SECTION ========== */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="hero__content">
              <div className="hero__subtitle d-flex align-items-center">
                <Subtitle subtitle={'Hiểu Biết Trước Khi Bạn Đi'} />
                <img src={worldImg} alt="" />
              </div>
              <h1>Du lịch mở ra cánh cửa để tạo ra những kỷ niệm <span className='hightlight'> memories</span></h1>
              <p>
                Du lịch là cánh cửa mở ra thế giới mới, mang đến trải nghiệm đầy màu sắc và hấp dẫn. Từ những cung đường xanh mướt đến những nét văn hóa độc đáo, du lịch là hành trình tìm kiếm sự kỳ diệu và khám phá bản thân.
              </p>
            </div>
          </Col>

          <Col lg='2'>
            <div className="hero__img-box">
              <img src={heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box hero__video-box mt-4">
              <video src={heroVideo} alt="" controls />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-5">
              <img src={heroImg02} alt="" />
            </div>
          </Col>

          <SearchBar />
        </Row>
      </Container>
    </section>
    {/* ============================================================== */}

    {/* ==================== HERO SECTION START ====================== */}
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <h5 className="services__subtitle">Những gì chúng tôi phục vụ</h5>
            <h2 className="services__title">Chúng tôi cung cấp dịch vụ tốt nhất của chúng tôi</h2>
          </Col>
          <ServiceList />
        </Row>
      </Container>
    </section>

    {/* ========== FEATURED TOUR SECTION START ========== */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
            <Subtitle subtitle={'Khám phá'} />
            <h2 className='featured__tour-title'>Tour du lịch nổi bật của chúng tôi</h2>
          </Col>
          <FeaturedTourList />
        </Row>
      </Container>
    </section>
    {/* ========== FEATURED TOUR SECTION END =========== */}

    {/* ========== EXPERIENCE SECTION START ============ */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="experience__content">
              <Subtitle subtitle={'Kinh nghiệm'} />
              <h2>Với tất cả kinh nghiệm của chúng tôi <br /> chúng tôi sẽ phục vụ bạn</h2>
              <p>Với tất cả kinh nghiệm của chúng tôi, chúng tôi sẽ tận tâm phục vụ bạn,
                <br /> đáp ứng mọi nhu cầu và mang đến trải nghiệm du lịch tuyệt vời nhất. </p>
            </div>

            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>Chuyến đi thành công</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Khách hàng thường xuyên</h6>
              </div>
              <div className="counter__box">
                <span>15</span>
                <h6>Năm kinh nghiệm</h6>
              </div>
            </div>
          </Col>
          <Col lg='6'>
            <div className="experience__img">
              <img src={experienceImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/* ========== EXPERIENCE SECTION END ============== */}

    {/* ========== GALLERY SECTION START ============== */}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={'Trưng bày'} />
            <h2 className="gallery__title">Ghé thăm phòng trưng bày du lịch khách hàng của chúng tôi</h2>
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
    </section>
    {/* ========== GALLERY SECTION END ================ */}

    {/* ========== TESTIMONIAL SECTION START ================ */}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={'Những người yêu thích'} />
            <h2 className="testimonial__title">Người hâm mộ nói gì về chúng tôi</h2>
          </Col>
          <Col lg='12'>
            <Testimonials />
          </Col>
        </Row>
      </Container>
    </section>
    {/* ========== TESTIMONIAL SECTION END ================== */}
    <NewsLetter />
  </>
}

export default Home