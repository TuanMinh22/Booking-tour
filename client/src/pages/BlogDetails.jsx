import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import Newsletter from '../shared/Newsletter'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const BlogDetails = () => {
  const { user } = useContext(AuthContext)

  const [info, setInfo] = useState({});
  const [comment, setComment] = useState([]);
  const [cmt, setCmt] = useState({});
  const param = useParams();
  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/posts/${param.id}`);
      console.log(res.data);
      setInfo(res.data);
    }

    fetchData();
  }, [param.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/comment/post/${param.id}`);
        setComment(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [param.id]);

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("/comment/create", {
        Customer_ID: user.Customer_ID,
        Post_ID: info[0]?.Post_ID,
        text: cmt,
      });

      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <div className="tour__content">
              <img src={info[0]?.img} alt="" />

              <div className="tour__info">
                <h2>{info[0]?.title}</h2>

                <div className="tour__extra-details">
                  <h5 style={{ color: '#faa935' }}><i class='ri-group-line'></i> Tác giả: {`${info[0]?.firstName} ${info[0]?.lastName}`}</h5>
                  <h5 style={{ color: '#faa935' }}><i class='ri-map-pin-time-line'></i> Ngày viết: {new Date(info[0]?.dateCreate).toLocaleDateString('en-US', options)}</h5>
                </div>
                <h5>Nội dung</h5>
                {
                  info[0]?.des && info[0].des.split('\n').map((m) => (
                    <div>
                      <p> - {m}</p>
                    </div>
                  ))
                }

              </div>
              <div className="tour__reviews mt-4">
                <h4>Bình luận ({comment.length} bình luận)</h4>

                <Form>
                  <div className="review__input">
                    <input type="text" placeholder='Bạn nghĩ gì?' required onChange={e => setCmt(e.target.value)} style={{ backgroundColor: 'white' }} />
                    <button className='btn primary__btn text-white' type='submit' onClick={handleClick}>
                      Gửi
                    </button>
                  </div>
                </Form>

                <ListGroup className='user__reviews'>
                  {
                    comment.map((m) => (
                      <div className="review__item">
                        {
                          m.Image && <img src={m.Image} alt="" />
                        }
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{`${m.firstName} ${m.lastName}`}</h5>
                              <p>{new Date(m.createAt).toLocaleDateString('en-US', options)}</p>
                            </div>
                          </div>

                          <h6>{m.text}</h6>
                        </div>
                      </div>
                    ))
                  }
                </ListGroup>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>
  )
}

export default BlogDetails