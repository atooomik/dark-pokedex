<template>
  <div class="w-full">
    <div class="overlay">
      <div v-if="fetchStatus === 'idle'" class="mx-auto">
        <pokeball-icon stroke-width="2" class="animate-spin w-10 h-10 text-gray-500" />
      </div>
      <div v-else-if="fetchStatus = 'isFinish'" :class="`detail-card bg-types-${pokemon.types[0].type.name}`">
        <div class="detail-card__main-info">
          <div class="detail-card__sprite">
            <img
              :src="pokemon.sprites['front_default']"
              width="96"
              height="96"
            >
          </div>

          <div class="detail-card__data">
            <div class="flex">
              <p class="mr-2">
                Entrada en la pokedex nacional:
              </p>
              <p class="col-span-1">
                {{ pokemon.id }}
              </p>
            </div>
            <p class="col-span-1">
              {{ pokemon.name }}
            </p>
            <div class="grid grid-cols-2 col-span-2">
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
        <div class="stats flex w-full">
          <div class="w-1/2 text-left">
            <p v-for="(value, index) in pokemon.stats" :key="index">
              {{ value.stat.name }}
            </p>
          </div>
          <div class="w-1/2">
            <p
              v-for="(value, index) in pokemon.stats"
              :key="'value' + index"
            >
              {{ value.base_stat }}
            </p>
          </div>
        </div>
        <button @click="setPokemonFetch({ modal: false, pokemon: '' })">
          <circle-x-icon stroke-width="2" class="text-gray-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DetailCard',
  data () {
    return {
      fetchStatus: 'idle',
      pokemon: {}
    }
  },
  computed: {
    ...mapGetters(['getFetchPokemon'])
  },
  mounted () {
    this.pokeFetch()
  },
  methods: {
    ...mapActions(['setPokemonFetch']),
    pokeFetch () {
      this.fetchStatus = 'idle'
      const pokemonSelected = this.getFetchPokemon.pokemonToFetch
      this.$axios.$get(`${pokemonSelected}`)
        .then((response) => {
          this.pokemon = response
          this.fetchStatus = 'isFinish'
        })
        .catch((error) => {
          throw error
        })
    }
  }
}
</script>
