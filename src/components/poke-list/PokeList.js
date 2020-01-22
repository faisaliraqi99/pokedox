import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Pagination } from 'antd'

import ItemCard from './ItemCard'
import PokeStore from '../../store/PokeStore'

function PokeList (props) {
  useEffect(() => { PokeStore.loadList() }, [])

  return (
    <div className="poke-content">

      <div className="poke-list">
        {PokeStore.list.map((item, index) => (
          <ItemCard
            item={item}
            index={index}
            key={index}
          />
        ))}
      </div>

      <Pagination
        className="poke-pagination"
        total={PokeStore.itemsCount}
        pageSize={PokeStore.loadListParams.limit}
        defaultCurrent={1}
        onChange={page => PokeStore.setOffsetByPage(page)}
      />

    </div>
  )
}

export default observer(PokeList)
