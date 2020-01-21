import {
  observable,
  action,
  decorate
} from 'mobx'
import axios from 'axios'
import scrollToTop from '../utils/scrollToTop'

class PokeStore {
  list = []
  oldList = []
  itemsCount = 0
  targetPokemon = {}

  loadListParams = {
    offset: 0,
    limit: 10
  }

  filters = {
    searchName: '',
    typesName: []
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
    this.oldList = newList
  }

  filterList = () => {
    // Доделать фильтр
    const newList = this.list.filter(item => {
      if (item.name.includes(this.filters.searchName)) return true
      return false
    })

    this.list = newList

    if (!this.filters.searchName) this.loadList()
  }

  setOffsetByPage = page => {
    this.loadListParams.offset = (page - 1) * this.loadListParams.limit
    scrollToTop(300)
    this.loadList()
  }

  setLimit = limit => {
    this.loadListParams.limit = limit
    this.loadList()
  }

  setSearchName = text => {
    this.filters.searchName = text
    this.filterList()
  }
}

decorate(PokeStore, {
  list: observable,
  itemsCount: observable,
  targetPokemon: observable,
  filters: observable,
  loadListParams: observable,
  loadList: action,
  loadDetailsForList: action,
  filterList: action,
  setOffsetByPage: action,
  setLimit: action,
  setSearchName: action
})

export default new PokeStore()
