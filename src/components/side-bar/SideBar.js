import React from 'react'
import { Input, Select } from 'antd'

import PokeStore from '../../store/PokeStore'

const { Search } = Input
const { Option } = Select

function SideBar () {
  return (
    <div className="side-bar">
      <Search
        className="side-bar__searchNameInput"
        placeholder="Search by name"
        onChange={event => PokeStore.setSearchName(event.target.value)}
      />
      <Select
        className="side-bar__typeSelect"
        defaultValue="Select items per page"
        onChange={limit => PokeStore.setLimit(limit)}
      >
        <Option value="10">10</Option>
        <Option value="20">20</Option>
        <Option value="50">50</Option>
      </Select>
    </div>
  )
}

export default SideBar
