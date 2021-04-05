<template>
  <div class="w-full">
    <div class="overlay z-10">
      <div v-if="fetchStatus === 'idle'" class="mx-auto">
        <pokeball-icon stroke-width="2" class="animate-spin w-10 h-10 text-gray-500" />
      </div>
      <div v-else-if="fetchStatus = 'isFinish'" :class="`relative flex flex-col w-full p-4 border-2 border-types-${pokemon.types[0].type.name} bg-gray-800 rounded-lg`">
        <div>
          <!-- Cerrar modal -->
          <button class="absolute top-0 right-0" @click="setPokemonFetch({ modal: false, pokemon: '' })">
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
            <button class="flex justify-center items-center w-full text-gray-400" :disabled="isDisabled" @click="addToFavorites(pokemon)">
              <p>Guardar como favorito</p>
              <heart-icon stroke-width="2" class="w-6 h-6 mx-2 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters(['getFetchPokemon', 'getFavoritePokemon'])
  },
  mounted () {
    this.pokeFetch()
  },
  methods: {
    ...mapActions(['setPokemonFetch', 'setFavoritePokemon']),
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
      if (this.getFavoritePokemon.length < 6) {
        this.setFavoritePokemon(pokemon)
      } else {
        this.isDisabled = true
      }
    }
  }
}
</script>
