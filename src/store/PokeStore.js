import {
  observable,
  action,
  computed,
  decorate
} from 'mobx'
import axios from 'axios'
import scrollToTop from '../utils/scrollToTop'

class PokeStore {
  list = []
  listNames = []
  itemsCount = 0
  loadListParams = {
    offset: 0,
    limit: 10
  }

  setLimit = limit => {
    this.loadListParams.limit = limit
    this.loadList()
  }

  setOffsetByPage = page => {
    this.loadListParams.offset = (page - 1) * this.loadListParams.limit
    scrollToTop(300)
    this.loadList()
  }

  loadList = async () => {
    const response = await axios.get(process.env.REACT_APP_POKEMONS_API, {
      params: {
        limit: 1000
      }
    })

    this.listNames = response.data.results
    this.filters.listNames = response.data.results
    this.itemsCount = response.data.count

    this.loadDetailsForList()
  }

  loadDetailsForList = async () => {
    const promiseList = []
    const offset = this.loadListParams.offset
    const limit = this.loadListParams.limit

    this.listNames.slice(offset, limit).forEach(item => {
      promiseList.push(axios.get(`${process.env.REACT_APP_POKEMONS_API}/${item.name}`))
    })

    const response = await Promise.all(promiseList)
    const newList = response.map(item => ({
      name: item.data.name,
      stats: item.data.stats.map(statsItem => statsItem.stat.name),
      types: item.data.types.map(typesItem => ({ text: typesItem.type.name, selected: false })),
      avatar: item.data.sprites.front_default
    }))

    this.list = newList
    this.filters.list = newList
  }

  filters = {
    searchName: '',
    types: [],
    list: this.list,
    listNames: this.listNames
  }

  setFilterSearchName = text => {
    this.filters.searchName = text
    this.filterListByName()
  }

  filterListByName = () => {
    const newList = this.filters.listNames.filter(item => {
      return item.name.includes(this.filters.searchName)
    })

    this.listNames = newList
    this.loadDetailsForList()
    this.itemsCount = newList.length
    this.filterListByTypes()
  }

  get typesOption () {
    const newTypesOption = []
    const fullList = this.filters.list

    for (let listItem = 0; listItem < fullList.length; listItem++) {
      for (const typesItem of fullList[listItem].types) {
        if (!newTypesOption.includes(typesItem.text)) newTypesOption.push(typesItem.text)
      }
    }

    return newTypesOption
  }

  setFilterTypes = arr => {
    this.filters.types = arr
    this.filterListByTypes()
  }

  filterListByTypes = () => {
    const newList = this.list.map(item => {
      return {
        ...item,
        types: item.types.map(itemType => {
          return {
            ...itemType,
            selected: !!this.filters.types.includes(itemType.text)
          }
        })
      }
    })

    this.list = newList
  }
}

decorate(PokeStore, {
  list: observable,
  listNames: observable,
  itemsCount: observable,
  filters: observable,
  typesOption: computed,
  loadListParams: observable,
  loadList: action,
  loadDetailsForList: action,
  filterListByName: action,
  setOffsetByPage: action,
  setLimit: action,
  setFilterSearchName: action,
  setFilterTypes: action
})

export default new PokeStore()
