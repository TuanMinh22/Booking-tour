import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
// import tourData from '../assets/data/tours'
import '../styles/tour.css'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import Newsletter from './../shared/Newsletter'
import { Col, Container, Row } from 'reactstrap'
import useFetch from '../hooks/useFetch'
import axios from 'axios';
import HotelCard from '../shared/HotelCard'
import SearchBarHotel from '../shared/SearchBarHotel'

const Hotels = () => {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/hotels`);
      console.log(res.data.count_page);
      setInfo(res.data);
    }

    fetchData();
  }, [page]);

  return (
    <>
      <CommonSection title={"Danh sách khách sạn"} index={1} />
      <section>
        <Container>
          <Row>
            <SearchBarHotel />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>

            {
              info.data?.map(hotel => (<Col lg='3' md='6' sm='6' className='mb-4' key={hotel.Hotel_ID}> <HotelCard hotel={hotel} /> </Col>))
            }


            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                <span
                  className="active__page"
                >
                  1
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Hotels