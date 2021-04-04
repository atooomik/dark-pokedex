<template>
  <div>
    <div v-if="fetchStatus === 'idle'" class="flex h-56 p-4 bg-gray-800 transition-colors ease-out duration-500 rounded-lg">
      <p class="text-3xl text-gray-500">
        Selecciona un Pókemon para mostrar sus detalles
      </p>
    </div>
    <div v-else-if="fetchStatus === 'isSearching'" class="flex flex-col justify-center h-56 p-4 bg-gray-800 transition-colors ease-out duration-500 rounded-lg">
      <pokeball-icon stroke-width="2" class="animate-spin w-10 h-10 mx-auto mb-4 text-gray-500" />
      <p class="text-center text-gray-500">
        Buscando datos
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
          <p :class="`col-span-1 capitalize text-types-${pokemon.types[0].type.name} font-semibold text-2xl text-center`">
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
        <button class="flex flex-col items-center justify-end text-gray-400" :disabled="isDisabled" @click="addToFavorites(pokemon)">
          <p>Guardar como favorito</p>
          <heart-icon stroke-width="2" class="w-6 h-6 mx-2 text-gray-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DesktopCard',
  data () {
    return {
      fetchStatus: 'idle',
      pokemon: {},
      isLoaded: false,
      isDisabled: false
    }
  },
  computed: {
    ...mapGetters(['getFetchPokemon', 'getFavoritePokemon'])

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
    ...mapActions(['setActivePokemon', 'setFavoritePokemon']),
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
      if (this.getFavoritePokemon.length < 6) {
        this.setFavoritePokemon(pokemon)
      } else {
        this.isDisabled = true
      }
    }
  }
}
</script>
