<template>
  <div>
    <div v-if="fetchStatus === 'idle'" class="flex items-center h-56 p-4 bg-gray-800 transition-colors ease-out duration-500 rounded-lg">
      <p class="text-3xl text-center text-gray-500">
        Selecciona un Pókemon para mostrar sus detalles
      </p>
    </div>
    <div v-else-if="fetchStatus === 'isSearching'" class="flex flex-col justify-center h-56 p-4 bg-gray-800 transition-colors ease-out duration-500 rounded-lg">
      <pokeball-icon stroke-width="2" class="animate-spin w-10 h-10 mx-auto mb-4 text-gray-500" />
      <p class="text-center text-gray-500">
        Llamando Pokémon
      </p>
    </div>
    <div v-else-if="fetchStatus === 'isFinish'" :class="`grid grid-cols-3 h-56 p-4 border-types-${pokemon.types[0].type.name} border-2 transition-colors ease-out duration-700 rounded-lg bg-gray-800`">
      <div class="col-span-1">
        <div class="flex flex-col justify-center items-center w-full h-full space-y-2">
          <pokeball-icon v-if="!isLoaded" stroke-width="2" class="animate-spin w-10 h-10 mx-auto mb-4 text-gray-500" />
          <img
            :src="pokemon.sprites.versions['generation-v']['black-white'].animated['front_default']"
            :class="[isLoaded ? 'block' : 'hidden']"
            width="64"
            class="mx-auto"
            @load="isLoaded = true"
          >
          <p :class="`col-span-1 capitalize text-types-${pokemon.types[0].type.name} font-semibold text-2xl text-center text-types-feary`">
            {{ pokemon.name }}
          </p>
          <div class="flex space-x-2">
            <img
              v-for="(value, index) in pokemon.types"
              :key="'value' + index"
              :src="`/images/types/${value.type.name}.png`"
              class="w-20 mx-auto"
              alt="pokemon type icon"
            >
          </div>
        </div>
      </div>
      <div class="grid col-span-2 w-full">
        <div class="grid grid-rows-3 grid-cols-2">
          <div v-for="(value, index) in pokemon.stats" :key="index" class="flex">
            <p :class="`text-types-${pokemon.types[0].type.name}`">
              {{ value.stat.name }}
            </p>
            <p
              class="ml-4 text-gray-400"
            >
              {{ value.base_stat }}
            </p>
          </div>
        </div>
        <div class="flex justify-center items-end">
          <button class="p-2 text-sm text-gray-400 bg-gray-700 rounded-lg" :disabled="favoritesAreFull" @click="addToFavorites(pokemon)">
            <div v-if="alreadyFavorite" class="flex items-center justify-end space-x-2">
              <p>
                Quitar de favoritos
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(239, 68, 68);transform:;-ms-filter:"><path d="M20.205,4.791c-1.137-1.131-2.631-1.754-4.209-1.754c-1.483,0-2.892,0.552-3.996,1.558 c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412L12,21.414 l8.207-8.207C22.561,10.854,22.562,7.158,20.205,4.791z" /></svg>
            </div>
            <div v-else-if="!alreadyFavorite" class="flex items-center justify-end space-x-2">
              <p>
                Agregar a favoritos
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(113, 113, 122);transform:;-ms-filter:"><path d="M20.205,4.791c-1.137-1.131-2.631-1.754-4.209-1.754c-1.483,0-2.892,0.552-3.996,1.558 c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412L12,21.414 l8.207-8.207C22.561,10.854,22.562,7.158,20.205,4.791z" /></svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import * as _ from 'lodash'
export default {
  name: 'DesktopCard',
  data () {
    return {
      fetchStatus: 'idle',
      pokemon: {},
      isLoaded: false,
      isDisabled: false,
      isFavorite: false
    }
  },
  computed: {
    ...mapGetters(['getFetchPokemon', 'getFavoritePokemon']),
    favoritesAreFull () {
      return this.getFavoritePokemon.length === 6
    },
    alreadyFavorite () {
      return _.includes(this.getFavoritePokemon.names, this.pokemon.name)
    },
    indexInFavorite () {
      return _.indexOf(this.getFavoritePokemon.names, this.pokemon.name, 0)
    }
  },
  watch: {
    'getFetchPokemon' () {
      if (this.getFetchPokemon.pokemonToFetch === undefined) {
        this.fetchStatus = 'idle'
        this.pokemon = {}
      } else {
        this.pokeFetch()
      }
    }
  },
  methods: {
    ...mapActions(['setActivePokemon', 'setFavoritePokemon', 'unsetFavoritePokemon']),
    pokeFetch () {
      const pokemonSelected = this.getFetchPokemon.pokemonToFetch
      this.fetchStatus = 'isSearching'
      this.$axios.$get(`pokemon/${pokemonSelected}`)
        .then((response) => {
          this.pokemon = response
          this.getStats()
          this.setActivePokemon({ name: this.pokemon.name, type: this.pokemon.types[0].type.name })
          this.fetchStatus = 'isFinish'
        })
        .catch((error) => {
          throw error
        })
    },
    getStats () {
      this.pokemon.stats.forEach((item) => {
        switch (item.stat.name) {
          case 'hp':
            item.stat.name = 'Salud'
            return
          case 'attack':
            item.stat.name = 'Ataque'
            return
          case 'defense':
            item.stat.name = 'Defensa'
            return
          case 'special-attack':
            item.stat.name = 'Ataque especial'
            return
          case 'special-defense':
            item.stat.name = 'Defensa especial'
            return
          case 'speed':
            item.stat.name = 'Velocidad'
            return
          default:
            return 0
        }
      })
    },
    addToFavorites (pokemon) {
      if (this.alreadyFavorite) {
        this.unsetFavoritePokemon({ index: this.indexInFavorite })
      } else {
        this.setFavoritePokemon({ newPokemon: pokemon, name: pokemon.name })
      }
    }
  }
}
</script>
