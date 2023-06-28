import React, { useContext } from 'react'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
import ChatBox from '../Message/ChatBox'
import { AuthContext } from '../../context/AuthContext'

const Layout = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Header />
      <Routers />
      <Footer />
      {
        user && <ChatBox />
      }
    </>
  )
}

export default Layout