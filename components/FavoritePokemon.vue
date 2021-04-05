<template>
  <div class="p-2 bg-gray-800 rounded-lg lg:p-4">
    <div class="flex">
      <p class="text-gray-500 mb-2">
        Favoritos: <span class="font-semibold text-gray-400">{{ getFavoritePokemon.length }}</span>
      </p>
      <button v-if="getFavoritePokemon.length > 0" class="flex items-center mr-0 ml-auto" @click="showFavorites">
        <p v-if="!isOpen" class="text-gray-500 mr-2">
          Mostrar
        </p>
        <p v-else class="text-gray-500 mr-2">
          Ocultar
        </p>
        <component :is="isOpen ? 'eye-off-icon' : 'eye-icon'" stroke-width="2" class="w-6 h-6 text-gray-500" />
      </button>
    </div>
    <div v-show="isOpen" class="grid grid-cols-3 lg:grid-cols-6 lg:gap-4" :class="[isOpen ? 'h-20' : 'h-0']">
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
      isLoaded: false,
      isOpen: false
    }
  },
  computed: {
    ...mapGetters(['getFavoritePokemon'])
  },
  methods: {
    ...mapActions(['unsetFavoritePokemon']),
    showFavorites () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
