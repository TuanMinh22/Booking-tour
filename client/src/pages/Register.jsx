import React, { useState, useContext, useRef, useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import axios from 'axios'

const Register = () => {
  const firstRef = useRef()
  const lastRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const passwordRef = useRef()

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    console.log({
      firstName: firstRef.current.value,
      lastName: lastRef.current.value,
      Email: emailRef.current.value,
      Phone: phoneRef.current.value,
      Password: passwordRef.current.value,
    })
  })

  const handleClick = async e => {
    e.preventDefault()

    try {
      const res = await axios.post("/auth/register", {
        firstName: firstRef.current.value,
        lastName: lastRef.current.value,
        Email: emailRef.current.value,
        Phone: phoneRef.current.value,
        Password: passwordRef.current.value,
      });

      console.log(res.data);

      dispatch({ type: 'REGISTER_SUCCESS' })
      navigate('/login')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Đăng ký</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="text" placeholder='Firstname' id='firstname' ref={firstRef} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder='LastName' id='lastname' ref={lastRef} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder='Số điện thoại' id='phone' ref={phoneRef} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="email" placeholder='Email' id='email' ref={emailRef} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Mật khẩu' id='password' ref={passwordRef} required />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit'>Đăng ký</Button>
                </Form>
                <p>Bạn đã có tài khoản? <Link to='/login'>Đăng nhập</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register