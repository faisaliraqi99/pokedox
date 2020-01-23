import React from 'react'
import { Input, Select } from 'antd'
import { observer } from 'mobx-react'

import PokeStore from '../../store/PokeStore'

const { Search } = Input
const { Option } = Select

function FilterBlock () {
  return (
    <div className="filter-block">
      <Search
        className="filter-block__searchNameInput"
        placeholder="Search by name"
        onChange={event => PokeStore.setFilterSearchName(event.target.value)}
      />
      <Select
        className="filter-block__typeSelect"
        mode="multiple"
        placeholder="Filter types"
        onChange={arr => PokeStore.setFilterTypes(arr)}
        getPopupContainer={triggerNode => triggerNode.parentNode}
      >
        {PokeStore.typesOption.map((item, index) => (
          <Option value={item} key={index}>{item}</Option>
        ))}
      </Select>
      <Select
        className="filter-block__typeSelect"
        placeholder="Select items per page"
        onChange={limit => PokeStore.setLimit(limit)}
        getPopupContainer={triggerNode => triggerNode.parentNode}
      >
        <Option value="10">10</Option>
        <Option value="20">20</Option>
        <Option value="50">50</Option>
      </Select>
    </div>
  )
}

export default observer(FilterBlock)