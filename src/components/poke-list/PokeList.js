import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Card } from 'antd'

import PokeStore from '../../store/PokeStore'

function PokeList (props) {
  useEffect(() => { PokeStore.loadList() }, [])

  return (
    <div className="poke-list">
      {PokeStore.list.map((item, index) => {
        return <Card
          title={item.name}
          className="poke-card"
          key={index}
        >
        </Card>
      })}
    </div>
  )
}

export default observer(PokeList)
