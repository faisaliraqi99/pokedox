import {
  observable,
  action,
  decorate
} from 'mobx'
import axios from 'axios'
import scrollToTop from '../utils/scrollToTop'

class PokeStore {
  list = []
  listNames = []
  listTypes = []
  itemsCount = 0

  pageSize = 10
  currentPage = 1

  sliceList = {
    offset: 0,
    limit: 10
  }

  setPageSize = size => {
    this.pageSize = +size
    this.loadDetailsForList()
  }

  setPage = page => {
    this.currentPage = page
    scrollToTop(300)
    this.loadDetailsForList()
  }

  loadList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_POKEMONS_API}/pokemon`, {
      params: {
        limit: 1000
      }
    })

    this.listNames = response.data.results
    this.filters.listNames = response.data.results
    this.itemsCount = response.data.count

    this.loadDetailsForList()
    this.loadTypesList()
  }

  loadDetailsForList = async () => {
    const promiseList = []
    const offset = (this.currentPage - 1) * this.sliceList.limit
    const limit = this.currentPage * this.pageSize

    this.listNames.slice(offset, limit).forEach(item => {
      promiseList.push(axios.get(`${process.env.REACT_APP_POKEMONS_API}/pokemon/${item.name}`))
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

  loadTypesList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_POKEMONS_API}/type`)

    this.listTypes = response.data.results
  }

  filters = {
    searchName: '',
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
  }

  setFilterTypes = arr => {
    this.filters.types = arr
    this.filterListByTypes()
  }

  filterListByTypes = async () => {
    const promiseList = []

    this.filters.types.forEach(item => {
      promiseList.push(axios.get(`${process.env.REACT_APP_POKEMONS_API}/type/${item}`))
    })

    const response = await Promise.all(promiseList)
    const concatedArr = []

    response.forEach(item => {
      item.data.pokemon.forEach(item => {
        concatedArr.push(item.pokemon)
      })
    })

    const tmpArray = []

    const arrOfTypedNames = concatedArr.filter((item) => {
      if (tmpArray.indexOf(item.name) === -1) {
        tmpArray.push(item.name)
        return true
      }
      return false
    })

    if (!arrOfTypedNames.length) {
      this.loadList()
    } else {
      this.listNames = arrOfTypedNames
      this.loadDetailsForList()
      this.itemsCount = arrOfTypedNames.length
    }
  }
}

decorate(PokeStore, {
  list: observable,
  listNames: observable,
  listTypes: observable,
  itemsCount: observable,
  pageSize: observable,
  filters: observable,
  loadList: action,
  loadDetailsForList: action,
  loadTypesList: action,
  filterListByName: action,
  filterListByTypes: action,
  setPage: action,
  setPageSize: action,
  setFilterSearchName: action,
  setFilterTypes: action
})

export default new PokeStore()
