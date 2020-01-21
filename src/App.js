import React from 'react'
import 'antd/dist/antd.css'
import './sass/main.sass'
import { Layout } from 'antd'

import SideBar from './components/side-bar/SideBar'
import PokeList from './components/poke-list/PokeList'

const { Sider } = Layout
const siderWidth = 280

function App () {
  return (
    <div className="main-page">
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed'
          }}
          width={siderWidth}
        >
          <SideBar />
        </Sider >
      </Layout>
      <Layout style={{ marginLeft: siderWidth }}>
        <PokeList />
      </Layout>
    </div>
  )
}

export default App
