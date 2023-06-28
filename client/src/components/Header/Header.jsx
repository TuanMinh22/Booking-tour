import React, { useState, useRef, useContext, useEffect } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import "./header.css"
import { AuthContext } from '../../context/AuthContext'
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

const nav__links = [
  {
    path: '/home',
    display: 'Trang chủ'
  },
  {
    path: '/hotels',
    display: 'Khách sạn'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
  {
    path: '/blogs',
    display: 'Bài viết'
  },
]

const MENU_OPTIONS = [
  {
    path: '/home',
    label: 'Trang chủ',
    icon: 'eva:home-fill',
  },
  {
    path: '/me',
    label: 'Trang cá nhân',
    icon: 'eva:person-fill',
  },
  {
    path: '/history',
    label: 'Lịch sử đặt tour',
    icon: 'eva:settings-2-fill',
  },
];

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [open, setOpen] = useState(null);
  const { user, dispatch } = useContext(AuthContext)

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  useEffect(() => {
    console.log(user);
  })

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

  return (
    <header className='header' ref={headerRef}>
      {user && (
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
              {/* ========== LOGO ========== */}
              <Link to='/'>
                <div className="logo">
                  <span>𝓜𝓲𝓷𝓱 𝓟𝓱𝓾̛𝓸̛𝓷𝓰</span>
                </div>
              </Link>
              {/* ========================== */}

              {/* ========== MENU START ========== */}
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <ul className="menu d-flex align-items-center gap-5">
                  {
                    nav__links.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                      </li>
                    ))
                  }
                </ul>
              </div>
              {/* ================================ */}

              {/* <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-2">
                {
                  user ? <> <h5 className='mb-0'>{user.firstName + ' ' + user.lastName}</h5>
                    <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                  </> : <>
                    <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                    <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                  </>
                }
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div> */}
              <div>
                <IconButton
                  onClick={handleOpen}
                  sx={{
                    p: 0,
                    ...(open && {
                      '&:before': {
                        zIndex: 1,
                        content: "''",
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        position: 'absolute',
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                      },
                    }),
                  }}
                >
                  <Avatar src={user.Image} alt="photoURL" />
                </IconButton>

                <Popover
                  open={Boolean(open)}
                  anchorEl={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      p: 0,
                      mt: 1.5,
                      ml: 0.75,
                      width: 180,
                      '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                      },
                    },
                  }}
                >
                  <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      {user.Email}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderStyle: 'dashed' }} />

                  <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                      <MenuItem key={option.label}>
                        <NavLink to={option.path} className="active__link" style={{ textDecoration: "none", color: "black" }}>{option.label}</NavLink>
                      </MenuItem>
                    ))}
                  </Stack>

                  <Divider sx={{ borderStyle: 'dashed' }} />

                  <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Đăng xuất
                  </MenuItem>
                </Popover>
              </div>
            </div>
          </Row>
        </Container>

      )}
    </header>
  )
}

export default Header