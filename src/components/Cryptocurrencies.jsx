import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Helmet } from 'react-helmet'
import { Row, Card, Col, Input, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Title } = Typography

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return <Loader />

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>CryptoMyn | Cryptocurrencies</title>
        <meta name='description' content='All cryptocurrency news' />
      </Helmet>
      {!simplified && (
        <div className='search-crypto'>
          <Title level={3} className='heading main-heading '>
            Cryptocurrencies
          </Title>
          <Input
            placeholder='Search Cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-crypto-input'
            prefix={
              <SearchOutlined
                style={{
                  fontSize: 18,
                  color: '#B8860B',
                }}
              />
            }
          />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className='crypto-image'
                    src={currency.iconUrl}
                    alt={currency.name}
                  />
                }
                hoverable
                className='crypto-card-info'
              >
                <div className='crypto-card-stats'>
                  <p>
                    Price:
                    <span style={{ fontWeight: 'bold', color: '#b8860b' }}>
                      {' '}
                      {millify(currency.price)}{' '}
                    </span>
                  </p>
                  <p>
                    Market Cap:
                    <span style={{ fontWeight: 'bold', color: '#3f8600' }}>
                      {' '}
                      {millify(currency.marketCap)}{' '}
                    </span>
                  </p>
                  <p>
                    Daily Change:
                    <span style={{ fontWeight: 'bold', color: '#001529' }}>
                      {' '}
                      {millify(currency.change)} %{' '}
                    </span>
                  </p>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
