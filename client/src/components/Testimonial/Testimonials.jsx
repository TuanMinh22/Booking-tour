import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      }
    ]
  }

  return <Slider {...settings}>
    <div className="testimonial py-4 px-3">
      <p>
        Trang web booking tour này là một nguồn tài nguyên tuyệt vời để lựa chọn các chuyến du lịch. Giao diện trực quan, tìm kiếm dễ dàng và thông tin chi tiết về từng tour.
      </p>

      <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
        <div>
          <h6 className='mb-0 mt-3'>Nguyễn Văn Linh</h6>
          <p>Khách hàng</p>
        </div>
      </div>
    </div>

    <div className="testimonial py-4 px-3">
      <p>Tôi rất ấn tượng với tính năng đánh giá từ khách hàng trước đây, giúp tôi đưa ra quyết định thông minh.
      </p>

      <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
        <div>
          <h6 className='mb-0 mt-3'>Dương Thùy Linh</h6>
          <p>Khách hàng</p>
        </div>
      </div>
    </div>

    <div className="testimonial py-4 px-3">
      <p>Quy trình đặt tour dễ dàng và thanh toán an toàn. Tôi cảm thấy yên tâm với chính sách hoàn tiền linh hoạt.
      </p>

      <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
        <div>
          <h6 className='mb-0 mt-3'>Phạm Quốc Tuấn</h6>
          <p>Khách hàng</p>
        </div>
      </div>
    </div>

    <div className="testimonial py-4 px-3">
      <p>Trang web cung cấp một loạt các tour đa dạng, từ tham quan thành phố đến khám phá thiên nhiên. Tôi chắc chắn sẽ quay lại để tìm tour mới.
      </p>

      <div className='d-flex align-items-center gap-4 mt-3'>
        <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
        <div>
          <h6 className='mb-0 mt-3'>Trương Minh Hiếu</h6>
          <p>Khách hàng</p>
        </div>
      </div>
    </div>
  </Slider>
}

export default Testimonials