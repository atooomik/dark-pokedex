<template>
  <div class="grid grid-cols-6 gap-4 h-32 p-4 bg-gray-800 rounded-lg">
    <div v-for="(pokemon,i) in getFavoritePokemon" :key="i" :class="`relative p-2 border border-types-${pokemon.types[0].type.name} bg-gray-700 rounded-lg`">
      <pokeball-icon v-if="!isLoaded" stroke-width="2" class="animate-spin w-10 h-10 mx-auto mb-4 text-gray-500" />
      <img
        class="mx-auto"
        :class="[isLoaded ? 'block' : 'hidden']"
        :src="imageUrl + pokemon.id + '.png'"
        width="48"
        height="48"
        :alt="pokemon.name + ' sprite'"
        @load="isLoaded = true"
      >
      <p :class="`capitalize font-semibold text-center text-types-${pokemon.types[0].type.name}`" v-text="pokemon.name" />
      <button class="absolute top-0 right-0" @click="unsetFavoritePokemon({index: i})">
        <circle-x-icon stroke-width="2" class="text-red-400" />
      </button>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FavoritePokemon',
  data () {
    return {
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      isLoaded: false
    }
  },
  computed: {
    ...mapGetters(['getFavoritePokemon'])
  },
  methods: {
    ...mapActions(['unsetFavoritePokemon'])
  }
}
</script>
