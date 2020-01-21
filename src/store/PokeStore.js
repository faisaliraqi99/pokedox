import {
  observable,
  action,
  decorate
} from 'mobx'
import axios from 'axios'

class PokeStore {
  list = []
  offset = 0
  limit = 20

  loadList = async () => {
    const response = await axios.get(process.env.REACT_APP_POKEMONS_API, {
      params: {
        offset: this.offset,
        limit: this.limit
      }
    })

    this.list = response.data.results
  }
}

decorate(PokeStore, {
  list: observable,
  loadList: action
})

export default new PokeStore()
