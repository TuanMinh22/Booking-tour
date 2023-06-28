import React from 'react'
import './common-section.css'
import { Container, Row, Col } from 'reactstrap'

const CommonSection = ({ title, index }) => {
   return (
      <section className={index === 1 ? "common__section" : "common__section_post"}>
         <Container>
            <Row>
               <Col lg='12'>
                  <h1>{title}</h1>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default CommonSection