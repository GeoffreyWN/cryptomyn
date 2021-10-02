import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import {
  GithubOutlined
} from '@ant-design/icons'
import { Navbar, HomePage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route exact path="/exchanges">
                <Exchanges />
              </Route>

              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>

              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>

              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title level={5} style={{ color: '#E1A95F', textAlign: 'center' }} >
            <p style={{ margin: '8px' }}>CryptoMyn &copy; {new Date().getFullYear()}</p>
            <GithubOutlined />
            <a href="https://github.com/GeoffreyWN/cryptomyn" target='_blank' rel='noreferrer' style={{ color: '#B8860B', fontWeight: 'bold' }} > GeoffreyWn </a>
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <span style={{ color: '#E1A95F', fontWeight: 'bold' }} > | </span>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <span style={{ color: '#E1A95F', fontWeight: 'bold' }} > | </span>
            <Link to="/exchanges">Exchanges</Link>
            <span style={{ color: '#E1A95F', fontWeight: 'bold' }} > | </span>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
