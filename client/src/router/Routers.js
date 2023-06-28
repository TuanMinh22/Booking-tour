import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import Blogs from '../pages/Blogs'
import BlogDetails from '../pages/BlogDetails'
import MyProfile from '../pages/MyProfile'
import OrderHistory from '../pages/History'
import Hotels from '../pages/Hotel'
import HotelDetails from '../pages/HotelDetail'
import RoomDetails from '../pages/RoomDetail'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/hotels' element={<Hotels />} />
      <Route path='/hotels/:id' element={<HotelDetails />} />
      <Route path='/rooms/:id' element={<RoomDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/thank-you' element={<ThankYou />} />
      <Route path='/me' element={<MyProfile />} />
      <Route path='/history' element={<OrderHistory />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/blogs/:id' element={<BlogDetails />} />
    </Routes>
  )
}

export default Routers