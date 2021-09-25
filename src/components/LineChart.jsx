import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice =[]
    const coinTimestamp =[]

    for (let index = 0; index < coinHistory?.data?.history?.length; index++) {
       coinPrice.push(coinHistory.data.history[index].price)
       coinTimestamp.push(new Date(coinHistory.data.history[index].timestamp).toLocaleDateString())
        
    }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

  return (
    <>
      <Row className='chart-header'>
        <Title leve={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-change'>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>

      <Line data={data} options={options} />
    </>
  )
}

export default LineChart
