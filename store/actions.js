export default {
  setScreen ({ commit }, data) {
    commit('SET_SCREEN', data)
  },
  setRegion ({ commit }, data) {
    commit('SET_REGION', data)
  },
  setCollectionOfNames ({ commit }, data) {
    commit('SET_COLLECTION', data)
  },
  setPokemonFetch ({ commit }, data) {
    commit('SET_POKEMON_FETCH', data)
  },
  setActivePokemon ({ commit }, data) {
    commit('SET_ACTIVE', data)
  },
  setFavoritePokemon ({ commit }, data) {
    commit('SET_FAVORITE', data)
  },
  unsetFavoritePokemon ({ commit }, data) {
    commit('UNSET_FAVORITE', data)
  },
  setShowExportModal ({ commit }, data) {
    commit('SET_SHOW_EXPORT', data)
  }
}
