<template>
  <div>
    <div
      v-if="pokemons.length > 0"
      class="poke-container h-80 grid grid-cols-3 p-2 gap-4 text-center border-2 border-gray-800 rounded-lg lg:grid-cols-4 lg:h-96 lg:p-6"
    >
      <div
        v-for="(poke, index) in pokemons"
        :key="index"
        class="w-full bg-gray-800 rounded-lg cursor-pointer transition-colors ease-out duration-700"
        :class="[getActivePokemon.name === poke.pokemon_species.name ? `border-2 border-types-${getActivePokemon.type}` : '']"
        @click="setPokemonFetch({ modal: true, pokemon: poke.entry_number })"
      >
        <pokeball-icon v-if="!isLoaded" stroke-width="2" class="animate-spin w-10 h-10 mx-auto mb-4 text-gray-500" />
        <img
          class="mx-auto"
          :class="[isLoaded ? 'block' : 'hidden']"
          :src="imageUrl + poke.entry_number + '.png'"
          width="48"
          height="48"
          @load="isLoaded = true"
        >
        <p class="capitalize" :class="[getActivePokemon.name === poke.pokemon_species.name ? `font-semibold text-types-${getActivePokemon.type}` : 'text-gray-600']" v-text="poke.pokemon_species.name" />
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-56 lg:h-96">
      <pokeball-icon stroke-width="2" class="animate-spin w-10 h-10 mx-auto mb-4 text-gray-500" />
      <p class="text-3xl text-gray-500">
        Llamando Pokémon
      </p>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BoardPokeList',
  data: () => {
    return {
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      pokemons: [],
      isLoaded: false
    }
  },
  computed: {
    ...mapGetters(['getRegionSelected', 'getActivePokemon'])
  },
  watch: {
    'getRegionSelected' () {
      this.setCollectionOfNames()
      this.fetchPokemon()
    }
  },
  mounted () {
    this.fetchPokemon()
  },
  methods: {
    ...mapActions(['setCollectionOfNames', 'setPokemonFetch']),
    fetchPokemon () {
      const regionToFetch = this.getRegionSelected

      this.pokemons = []
      this.$axios.$get(`pokedex/${regionToFetch}`)
        .then((response) => {
          this.pokemons = response.pokemon_entries
          this.pokemons.forEach((index) => {
            index.entry_number = index.pokemon_species.url
              .split('/')
              .splice(6, 1)
              .toString()
          })
          return this.pokemons
        })
        .then(() => {
          this.arrayOfNames()
        })
        .catch((error) => {
          throw error
        })
    },
    arrayOfNames () {
      const pokemonForSearcher = []
      this.pokemons.forEach((item) => {
        pokemonForSearcher.push(item.pokemon_species.name)
      })
      this.setCollectionOfNames(pokemonForSearcher)
    }
  }
}
</script>

<style lang="scss">
.poke-container {
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  cursor: move;
}
</style>
