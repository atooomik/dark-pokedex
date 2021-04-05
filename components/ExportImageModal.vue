<template>
  <div class="overlay z-10">
    <div class="relative max-w-2xl w-full mx-auto bg-gray-900">
      <button title="Cerrar tarjeta" class="absolute top-0 right-0 -mt-8 lg:-mr-8 text-gray-500" @click="setShowExportModal(false)">
        <circle-x-icon stroke-width="2" class="text-red-400" />
      </button>
      <div id="myFavorites" class="py-6 px-3 border-2 border-types-poison bg-gray-900 rounded-lg">
        <div class="max-w-sm w-full flex flex-col justify-center items-center mx-auto mb-4">
          <img :src="`/trainers/${trainer}.png`" class="w-24 mb-4">
          <input type="text" placeholder="Tu nombre de entrenador" class=" border border-gray-800 rounded-lg bg-gray-700 p-2 text-gray-400 font-semibold text-center">
        </div>
        <div class="max-w-lg w-full grid grid-cols-3 gap-2 mx-auto lg:gap-4 bg-gray-900">
          <div v-for="(pokemon,i) in getFavoritePokemon.collection" :key="i" :class="`relative p-2 border border-types-${pokemon.types[0].type.name} bg-gray-700 rounded-lg`">
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
          </div>
        </div>
      </div>
    </div>
    <button class="flex justify-center items-center mt-4 mx-auto p-2 text-gray-500 bg-gray-800 rounded-lg" @click="saveOnImage">
      <p class="font-semibold text-gray-400">
        Guardar imagen
      </p>
      <download-icon stroke-width="2" class="mx-2 text-gray-400" />
    </button>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import domtoimage from 'dom-to-image'
export default {
  name: 'ExportImageModal',
  data () {
    return {
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      trainer: 'Spr_B2W2_Steven',
      isLoaded: false
    }
  },
  computed: {
    ...mapGetters(['getFavoritePokemon'])
  },
  methods: {
    ...mapActions(['setShowExportModal']),
    saveOnImage () {
      domtoimage.toJpeg(document.getElementById('myFavorites'), { quality: 1 })
        .then(function (dataUrl) {
          const link = document.createElement('a')
          link.download = 'my-favorite-pokemon.jpeg'
          link.href = dataUrl
          link.click()
        })
    }
  }

}
</script>
