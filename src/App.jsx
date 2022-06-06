import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import "./App.scss"
import { Layout } from 'antd';
import './i18n/config'
import { withTranslation } from 'react-i18next';

// 页面
import Sidebar from "./components/Sidebar"
import Index from "./pages/Index"
import Raft from './pages/Raft';
import Rate from './pages/Rate';
import Topbar from './components/Topbar'
import AccessList from './pages/AccessList';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  componentDidMount() { }
  render() {
    const { t } = this.props;
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <Sidebar />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Topbar />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="content" style={{ padding: 24, background: "rgb(250, 250, 250)" }}>
              <Switch>
                <Route path="/cluster" component={Raft}/>
                <Route path="/rate" component={Rate}/>
                <Route path="/acl" component={AccessList}/>
                <Route path="/" component={Index}/>
              </Switch>
              {/* <Route path="/category" component={Category}></Route> */}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>{t('footer.detail')}</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default withTranslation()(App);