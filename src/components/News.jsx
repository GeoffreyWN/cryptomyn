import React, { useState } from 'react'
import moment from 'moment'
import { Helmet } from 'react-helmet'

import { Row, Card, Col, Select, Avatar, Input, Typography } from 'antd'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi.js'
import { useGetCryptosQuery } from '../services/cryptoApi.js'
import Loader from './Loader.js'

const { Text, Title } = Typography
const { Option } = Select

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data } = useGetCryptosQuery(100)

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  })

  if (!cryptoNews?.value) return <Loader />

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>CryptoMyn | News</title>
        <meta name='description' content='Cryptocurrency news' />
      </Helmet>

      {!simplified && (
        <div className='search-crypto'>
          <Title level={3} className='heading main-heading '>
            Crypto News
          </Title>

          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='Cryptocurrency '>Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option key={coin.name} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      <Row gutter={[24, 24]}>
        {/* {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select a Crypto'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value='Cryptocurrency '>Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option key={coin.name} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )} */}
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt='news'
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      borderRadius: '10px',
                    }}
                  />
                </div>

                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}{' '}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt='provider'
                    />
                    <Text className='provider-name'>
                      {' '}
                      {news.provider[0]?.name}{' '}
                    </Text>
                  </div>

                  <Text className='period'>
                    {' '}
                    {moment(news.datePublished).startOf('ss').fromNow()}{' '}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News
