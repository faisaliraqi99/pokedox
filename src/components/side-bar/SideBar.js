import React from 'react'
import { Input, Select } from 'antd'

const { Search } = Input
const { Option } = Select

function SideBar () {
  return (
    <div className="side-bar">
      <Search
        className="side-bar__searchNameInput"
        placeholder="Search by name"
        onSearch={value => console.log(value)}
      />
      <Select
        className="side-bar__typeSelect"
        defaultValue="Select items per page"
      >
        <Option value="10">10</Option>
        <Option value="20">20</Option>
        <Option value="50">50</Option>
      </Select>
    </div>
  )
}

export default SideBar
