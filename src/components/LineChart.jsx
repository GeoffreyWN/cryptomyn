import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []
  const coinTimestamp = []

  for (let index = 0; index < coinHistory?.data?.history?.length; index++) {
    coinPrice.push(coinHistory.data.history[index].price)
    coinTimestamp.push(
      new Date(coinHistory.data.history[index].timestamp).toLocaleDateString()
    )
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#e1a95f',
        borderColor: '#0071bd',
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <Row className='chart-header'>
        <Title leve={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            Change:{' '}
            <span style={{ fontWeight: 'bold', color: '#0071bd' }}>
              {coinHistory?.data?.change}%
            </span>
          </Title>
          <Title level={5} className='current-price'>
            Current {coinName} Price:{' '}
            <span style={{ fontWeight: 'bold', color: '#3f8600' }}>
              {' '}
              $ {currentPrice}{' '}
            </span>
          </Title>
        </Col>
      </Row>

      <Line data={data} options={options} />
    </>
  )
}

export default LineChart
