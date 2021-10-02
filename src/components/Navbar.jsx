import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Typography, Avatar } from 'antd'
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import icon from '../images/logo4.png'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(null)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link className='logo-title' to='/'>
            CryptoMyn
          </Link>
        </Typography.Title>
        <Button
          className='menu-control-container'
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item
            key='Home'
            className='menu-item'
            icon={<HomeOutlined className='nav-link-icon' />}
          >
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item
            key='cryptocurrencies'
            className='menu-item'
            icon={<FundOutlined className='nav-link-icon' />}
          >
            <Link to='/cryptocurrencies' className='nav-link'>
              Cryptocurrencies
            </Link>
          </Menu.Item>
          <Menu.Item
            key='exchanges'
            className='menu-item'
            icon={<MoneyCollectOutlined className='nav-link-icon' />}
          >
            <Link to='/exchanges' className='nav-link'>
              Exchanges
            </Link>
          </Menu.Item>
          <Menu.Item
            key='news'
            className='menu-item'
            icon={<BulbOutlined className='nav-link-icon' />}
          >
            <Link to='/news' className='nav-link'>
              News
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default Navbar
