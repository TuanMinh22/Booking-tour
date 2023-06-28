import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SearchBarHotel = () => {
  const locationRef = useRef('')
  const distanceRef = useRef(0)
  const maxGroupSizeRef = useRef(0)
  const navigate = useNavigate()

  const searchHandler = async () => {
    const location = locationRef.current.value
    const distance = distanceRef.current.value
    const maxGroupSize = maxGroupSizeRef.current.value

    if (location === '' || distance === '' || maxGroupSize === '') {
      return alert('All fields are required!')
    }
    console.log(`city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

    const res = await axios.get(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

    console.log(res.data);

    // const result = await res.json()


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

        <span className='search__icon' type='submit' onClick={searchHandler}>
          <i class='ri-search-line'></i>
        </span>
      </Form>
    </div>
  </Col>
}

export default SearchBarHotel