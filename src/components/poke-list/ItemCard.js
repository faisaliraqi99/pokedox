import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

function ItemCard ({ item, index }) {
  const isLoading = item.avatar === undefined
  const typesColor = {
    poison: '#8DFF00',
    grass: '#3BFF58',
    fire: '#FF2218',
    bug: '#80110B',
    water: '#2C8AFF',
    flying: '#AEFFF8',
    normal: '#E6C77E',
    electric: '#FFFF47',
    ground: '#803D22',
    fairy: '#BF71B9'
  }

  return (
    <Card
      className="poke-card"
      key={index}
      title={item.name}
      loading={isLoading}
    >
      {!isLoading ? (
        <>
          <img src={item.avatar} alt={item.name} />
          <ul className="poke-card__list">
            {item.types.map((typesItem, index) => <li
              key={index}
              style={{
                backgroundColor: typesColor[typesItem.text] ? typesColor[typesItem.text] : null,
                border: `5px solid ${typesItem.selected ? 'red' : 'transparent'}`
              }}
            >{typesItem.text}</li>)}
          </ul>
        </>
      ) : null}
    </Card>
  )
}

ItemCard.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

export default ItemCard
