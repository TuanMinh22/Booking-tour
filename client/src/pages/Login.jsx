import React, { useContext, useRef, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import axios from 'axios'

const Login = () => {
  const userRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState(null);

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = async e => {
    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })

    try {
      const res = await axios.post("/auth/login", {
        Email: userRef.current.value,
        Password: passwordRef.current.value
      });
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate('/');
    } catch (err) {
      setError(err.response.data);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Đăng Nhập</h2>

                <Form>
                  <FormGroup>
                    <input type="email" placeholder='Email' id='email' ref={userRef} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Mật khẩu' id='password' ref={passwordRef} required />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit' onClick={handleClick}>Đăng Nhập</Button>
                  {error && <p style={{ color: 'white' }}>Bạn nhập sai thông tin</p>}
                </Form>
                <p>Bạn chưa có tài khoản? <Link to='/register'>Đăng ký</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login