import React from 'react'
import millify from 'millify'
import { Helmet } from 'react-helmet'
import { Row, Typography, Card, Col, Statistic } from 'antd'
import {
  FundProjectionScreenOutlined,
  DollarOutlined,
  AreaChartOutlined,
  SwapOutlined,
  TransactionOutlined,
  BankOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import News from './News'
import Cryptocurrencies from './Cryptocurrencies'
import Loader from './Loader'

const { Title } = Typography

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats

  if (isFetching) return <Loader />
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>CryptoMyn | Home</title>
        <meta
          name='description'
          content='Cryptocurrency news at the touch of a button'
        />
      </Helmet>
      <Title level={2} className='heading main-heading '>
        Global Crypto Stats
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title='Total Cryptocurrencies'
              value={globalStats.total}
              valueStyle={{ color: '#00159' }}
              prefix={<TransactionOutlined />}
            />
          </Card>
        </Col>

        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title='Total Market Cap'
              value={millify(globalStats.totalMarketCap)}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title='Total Exchanges'
              value={millify(globalStats.totalExchanges)}
              valueStyle={{ color: '#3f8600' }}
              prefix={<SwapOutlined />}
            />
          </Card>
        </Col>

        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title='Total 24h Volume'
              value={millify(globalStats.total24hVolume)}
              valueStyle={{ color: '#b8860b' }}
              prefix={<AreaChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title='Total Markets'
              value={millify(globalStats.totalMarkets)}
              valueStyle={{ color: '#1890ff' }}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={3} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Title>
        {/* <Title level={4} className='show-more'> */}
        <Link to='/cryptocurrencies'>
          <button className='btn-show-more'>Show more</button>
        </Link>
        {/* </Title> */}
      </div>
      <Cryptocurrencies simplified />

      <div className='home-heading-container'>
        <Title level={3} className='home-title'>
          Latest Crypto News
        </Title>
        <Title level={4} className='show-more'>
          <Link to='/news'>
            <button className='btn-show-more'>Show more</button>
          </Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default HomePage
