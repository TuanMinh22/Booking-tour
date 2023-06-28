import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
  {
    imgUrl: weatherImg,
    title: `Tính thời tiết`,
    desc: `Tính toán thời tiết để có được chuyến đi tốt nhất`,
  },
  {
    imgUrl: guideImg,
    title: `Hướng dẫn viên du lịch tốt nhất`,
    desc: `Tuyền chọn những hướng dẫn viên lành nghề và quen thuộc với địa điểm du lịch`,
  },
  {
    imgUrl: customizationImg,
    title: 'Tùy chọn',
    desc: `Các hỗ trợ tùy chọn khác dành cho khách hàng theo yêu cần của từng khách hàng`,
  },
]

const ServiceList = () => {
  return <>
    {
      servicesData.map((item, index) => (
        <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
          <ServiceCard item={item} />
        </Col>))
    }
  </>

}

export default ServiceList