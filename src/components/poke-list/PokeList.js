import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Card, Pagination } from 'antd'

import PokeStore from '../../store/PokeStore'

function PokeList (props) {
  useEffect(() => { PokeStore.loadList() }, [])

  return (
    <div className="poke-content">

      <div className="poke-list">
        {PokeStore.list.map((item, index) => {
          return <Card
            className="poke-card"
            key={index}
            title={item.name}
            onClick={() => PokeStore.loadDetails(item.name)}
            loading={true}
          >
          </Card>
        })}
      </div>

      <Pagination
        className="poke-pagination"
        total={500}
        defaultCurrent={1}
        onChange={page => PokeStore.setOffsetByPage(page)}
      />

    </div>
  )
}

export default observer(PokeList)
