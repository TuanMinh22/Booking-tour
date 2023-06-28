import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/thank-you.css'
import axios from 'axios'

const ThankYou = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.put("/booking/updatePay");

      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='pt-5 text-center'>
            <div className="thank__you">
              <span><i class='ri-checkbox-circle-line'></i></span>
              <h1 className='mb-3 fw-semibold'>Thank You</h1>
              <h3 className='mb-4'>Your Tour Is Bookked</h3>

              <Button className='btn primary__btn w-25'><Link to='/home'>Back To Home</Link></Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ThankYou