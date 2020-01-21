import React from 'react'
import 'antd/dist/antd.css'
import './sass/main.sass'
import { Row, Col } from 'antd'

import SideBar from './components/side-bar/SideBar'
import PokeList from './components/poke-list/PokeList'

function App () {
  return (
    <div className="App">
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20}>
          <PokeList />
        </Col>
      </Row>
    </div>
  )
}

export default App
