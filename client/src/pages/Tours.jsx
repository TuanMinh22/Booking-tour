import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
// import tourData from '../assets/data/tours'
import '../styles/tour.css'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import Newsletter from './../shared/Newsletter'
import { Col, Container, Row } from 'reactstrap'
import axios from 'axios';

const Tours = () => {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/tours?page=${page}`);
      console.log(res.data.count_page);
      setInfo(res.data);
    }

    fetchData();
  }, [page]);

  return (
    <>
      <CommonSection title={"Danh sách Tour"} index={1} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
              info.data?.map(tour => (<Col lg='3' md='6' sm='6' className='mb-4' key={tour.Tour_ID}> <TourCard tour={tour} /> </Col>))
            }


            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {
                  [...Array(info.count_page).keys()].map(number => (
                    <span
                      key={number}
                      onClick={() => setPage(number + 1)}
                      className={page === number + 1 ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))
                }
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Tours