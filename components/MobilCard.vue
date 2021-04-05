<template>
  <div class="w-full">
    <div class="overlay z-10">
      <div v-if="fetchStatus === 'idle'" class="mx-auto">
        <pokeball-icon stroke-width="2" class="animate-spin w-10 h-10 text-gray-500" />
      </div>
      <div v-else-if="fetchStatus = 'isFinish'" :class="`relative flex flex-col w-full p-4 border-2 border-types-${pokemon.types[0].type.name} bg-gray-800 rounded-lg`">
        <div>
          <!-- Cerrar modal -->
          <button class="absolute top-0 right-0 mt-2 mr-2" @click="setPokemonFetch({ modal: false, pokemon: '' })">
            <circle-x-icon stroke-width="2" class="text-red-400" />
          </button>
          <div class="space-y-4">
            <!-- Pokeball de carga -->
            <pokeball-icon v-if="!isLoaded" stroke-width="2" class="animate-spin w-10 h-10 mx-auto mb-4 text-gray-500" />
            <!-- Sprite del pokemon -->
            <img
              :src="pokemon.sprites.versions['generation-v']['black-white'].animated['front_default']"
              :class="[isLoaded ? 'block' : 'hidden']"
              width="64"
              class="mx-auto"
              @load="isLoaded = true"
            >
            <!-- Nombre del pokemon -->
            <p :class="`capitalize text-center font-semibold text-types-${pokemon.types[0].type.name}`" v-text="pokemon.name" />
            <!-- Tipos del pokemon -->
            <div class="grid col-span-2" :class="[pokemon.types.length > 1 ? 'grid-cols-2' : '']">
              <img
                v-for="(value, index) in pokemon.types"
                :key="'value' + index"
                :src="`/images/types/${value.type.name}.png`"
                class="w-20 mx-auto"
                alt="pokemon type icon"
              >
            </div>
            <!-- Estadisticas -->
            <div class="grid grid-rows-3 grid-cols-2">
              <div v-for="(value, index) in pokemon.stats" :key="index" class="text-center">
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
            <!-- Agregar a favoritos -->
            <div class="flex justify-center">
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
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import * as _ from 'lodash'
export default {
  name: 'MobilCard',
  data () {
    return {
      fetchStatus: 'idle',
      pokemon: {},
      isLoaded: false,
      isDisabled: false
    }
  },
  computed: {
    ...mapGetters(['getFetchPokemon', 'getFavoritePokemon']),
    alreadyFavorite () {
      return _.includes(this.getFavoritePokemon.names, this.pokemon.name)
    },
    indexInFavorite () {
      return _.indexOf(this.getFavoritePokemon.names, this.pokemon.name, 0)
    }
  },
  mounted () {
    this.pokeFetch()
  },
  methods: {
    ...mapActions(['setPokemonFetch', 'setFavoritePokemon', 'unsetFavoritePokemon']),
    pokeFetch () {
      this.fetchStatus = 'idle'
      const pokemonSelected = this.getFetchPokemon.pokemonToFetch
      this.$axios.$get(`/pokemon/${pokemonSelected}`)
        .then((response) => {
          this.pokemon = response
          this.getStats()
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
