import React from 'react'
import millify from 'millify'
import { Helmet } from 'react-helmet'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser'

import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text, Title } = Typography
const { Panel } = Collapse

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery()
  const exchangesList = data?.data?.exchanges

  if (isFetching) return <Loader />

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>CryptoMyn | Exchanges</title>
        <meta name='description' content='Cryptocurrency exchange news' />
      </Helmet>

      <div className='search-crypto'>
        <Title level={3} className='heading main-heading '>
          Crypto Exchanges
        </Title>
      </div>
      <Row>
        <Col span={6} className='col-headers'>
          Exchanges
        </Col>
        <Col span={6} className='col-headers'>
          24h Trade Volume
        </Col>
        <Col span={6} className='col-headers'>
          Markets
        </Col>
        <Col span={6} className='col-headers'>
          Change
        </Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className='exchange-image'
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col
                      span={6}
                      style={{ fontWeight: 'bold', color: '#B8860B' }}
                    >
                      ${millify(exchange.volume)}
                    </Col>
                    <Col
                      span={6}
                      style={{ fontWeight: 'bold', color: '#3f8600' }}
                    >
                      {millify(exchange.numberOfMarkets)}
                    </Col>
                    <Col
                      span={6}
                      style={{ fontWeight: 'bold', color: '#1890ff' }}
                    >
                      {millify(exchange.marketShare)}%
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges
