import React, { useState } from 'react'
import 'antd/dist/antd.css'
import './sass/main.sass'
import { Layout } from 'antd'

import FilterBlock from './components/filter-block/FilterBlock'
import PokeList from './components/poke-list/PokeList'

const { Sider } = Layout

function App () {
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  window.addEventListener('resize', () => {
    setWindowSize(window.innerWidth)
  })

  return (
    <div className="main-page">
      {windowSize > 830 ? (
        <Sider
          className="main-page__sider"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed'
          }}
        >
          <FilterBlock />
        </Sider >
      ) : null}
      <div className="main-page__list" >
        {windowSize <= 830 ? (
          <FilterBlock />
        ) : null}
        <PokeList />
      </div>
    </div>
  )
}

export default App
