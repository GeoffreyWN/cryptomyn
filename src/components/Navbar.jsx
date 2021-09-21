import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Typography, Avatar } from 'antd'
import { HomeOutlined, MoneyCollectOUtlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons' 

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar />
                <Typography.Title level={2} className="logo">
                    <Link to="/" >CrypoMyn</Link>
                </Typography.Title>
                {/* <Button className="menu-control-container"></Button> */}
            </div>
        </div>
    )
}

export default Navbar
