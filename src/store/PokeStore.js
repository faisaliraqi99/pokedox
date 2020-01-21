import {
  observable,
  action,
  decorate
} from 'mobx'
import axios from 'axios'

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
  }

  loadDetails = async name => {
    const response = await axios.get(`${process.env.REACT_APP_POKEMONS_API}/${name}`)

    this.targetPokemon = response.data
  }

  setOffsetByPage = page => {
    this.loadListParams.offset = (page - 1) * this.loadListParams.limit
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
  loadDetails: action,
  setOffsetByPage: action
})

export default new PokeStore()
