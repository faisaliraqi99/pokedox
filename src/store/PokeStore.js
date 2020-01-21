import {
  observable,
  action,
  decorate
} from 'mobx'
import axios from 'axios'
import scrollToTop from '../utils/scrollToTop'

class PokeStore {
  list = []
  itemsCount = 0
  targetPokemon = {}
  loadListParams = {
    offset: 0,
    limit: 10
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
}

decorate(PokeStore, {
  list: observable,
  itemsCount: observable,
  targetPokemon: observable,
  loadListParams: observable,
  loadList: action,
  loadDetailsForList: action,
  setOffsetByPage: action,
  setLimit: action
})

export default new PokeStore()
