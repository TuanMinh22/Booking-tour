import React, { useEffect, useState } from 'react'
import CommonSection from '../shared/CommonSection'
import { Col, Container, Row, Card, CardImg, CardTitle, CardSubtitle } from 'reactstrap'
import '../assets/style.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Blogs() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/posts");
        setInfo(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(info);
  }, []);

  return (
    <>
      <CommonSection title={"Danh sách bài viết"} index={2} />
      <section class="section-padding">
        <Container>
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Row>
                {
                  info.map((m) => (
                    <Col lg="3" md="6">
                      <Card className="post-grid mb-5" style={{ padding: "10px", height: "400px" }} >
                        <a className='a-img-post' href="blog-single.html">
                          <CardImg className="img-post" width="100%" src={m.img} alt="Blog post thumbnail" />
                        </a>
                        <span className="cat-name text-color font-extra text-sm text-uppercase letter-spacing-1">Explore</span>
                        <Link to={`/blogs/${m.Post_ID}`} style={{ textDecoration: 'none' }}>
                          <CardTitle className="post-title mt-1" ><a href="#" className="title-text">{m.title}</a></CardTitle>
                        </Link>
                        <CardSubtitle className="text-muted letter-spacing text-uppercase font-sm">{new Date(m.dateCreate).toDateString()}</CardSubtitle>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </Col>
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
    </>
  )
}

export default Blogs