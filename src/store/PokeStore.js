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
      params: this.loadListParams
    })

    this.list = response.data.results
    this.itemsCount = response.data.count

    this.loadDetailsForList(response.data.results)
  }

  loadDetailsForList = async list => {
    const promiseList = []

    list.forEach(item => {
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
    list: this.list
  }

  setFilterSearchName = text => {
    this.filters.searchName = text
    this.filterListByName()
  }

  filterListByName = () => {
    const newList = this.filters.list.filter(item => {
      return item.name.includes(this.filters.searchName)
    })

    this.list = newList
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
    const newList = this.filters.list.map(item => ({
      ...item,
      types: item.types.map(itemType => ({
        ...itemType,
        selected: Boolean(this.filters.types.includes(itemType.text))
      }))
    }))

    this.list = newList
  }
}

decorate(PokeStore, {
  list: observable,
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
