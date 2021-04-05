export default {
  SET_SCREEN (state, data) {
    state.deviceScreen = data
  },
  SET_REGION (state, data) {
    state.regionSelected = data
  },
  SET_COLLECTION (state, data) {
    state.collectionOfNames = data
  },
  SET_POKEMON_FETCH (state, data) {
    if (state.deviceScreen === 'isMobile') {
      state.fetchPokemon = {
        showModal: data.modal,
        pokemonToFetch: data.pokemon
      }
    } else if (state.deviceScreen === 'isDesktop') {
      state.fetchPokemon = {
        pokemonToFetch: data.pokemon
      }
    }
  },
  SET_ACTIVE (state, data) {
    state.activePokemon = {
      name: data.name,
      type: data.type
    }
  },
  SET_FAVORITE (state, data) {
    state.favoritePokemon.collection.push(data.newPokemon)
    state.favoritePokemon.names.push(data.name)
  },
  UNSET_FAVORITE (state, data) {
    state.favoritePokemon.collection.splice(data.index, 1)
    state.favoritePokemon.names.splice(data.index, 1)
  },
  SET_SHOW_EXPORT (state, data) {
    state.showExportModal = data
  }
}
