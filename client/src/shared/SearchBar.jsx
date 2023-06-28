import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SearchBar = () => {
  const locationRef = useRef('')
  const distanceRef = useRef(0)
  const maxGroupSizeRef = useRef(0)
  const navigate = useNavigate()

  const searchHandler = async () => {
    const location = locationRef.current.value
    const distance = distanceRef.current.value || 0
    const maxGroupSize = maxGroupSizeRef.current.value || 0

    if (location === '' || distance === '' || maxGroupSize === '') {
      return alert('All fields are required!')
    }
    console.log(`city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

    const res = await axios.get(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

    console.log(res.data);

    navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: res.data.data })
  }

  return <Col lg="12">
    <div className="search__bar">
      <Form className='d-flex align-items-center gap-4'>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
          <span><i class='ri-map-pin-line'></i></span>
          <div>
            <h6>Địa điểm</h6>
            <input type="text" placeholder='Bạn muốn đi đâu?' ref={locationRef} />
          </div>
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
          <span><i class='ri-map-pin-time-line'></i></span>
          <div>
            <h6>Giá tiền</h6>
            <input type="number" placeholder='tiền đ' ref={distanceRef} />
          </div>
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-last'>
          <span><i class='ri-group-line'></i></span>
          <div>
            <h6>Số người</h6>
            <input type="number" min="0" placeholder='0' ref={maxGroupSizeRef} />
          </div>
        </FormGroup>

        <span className='search__icon' type='submit' onClick={searchHandler}>
          <i class='ri-search-line'></i>
        </span>
      </Form>
    </div>
  </Col>
}

export default SearchBar