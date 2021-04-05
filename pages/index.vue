<template>
  <div class="max-w-xl w-full h-full mx-auto p-4 space-y-4 lg:space-y-8 lg:max-w-7xl">
    <div
      class="mt-8 mb-4 mx-auto p-4 rounded-lg bg-gray-800 lg:mt-12 lg:mb-8"
    >
      <p class="text-center text-gray-500">
        Bienvenido a la Pokédex
      </p>
    </div>
    <div class="lg:grid lg:grid-cols-2 lg:gap-4 lg:h-56">
      <div class="flex flex-col lg:h-56">
        <!--Toolbar para definir la region de busqueda-->
        <select-region-toolbar />
        <!--Toolbar para definir la region de busqueda-->
        <searcher-input />
      </div>
      <div v-if="getDeviceScreen === 'isDesktop'" class="hidden lg:block h-64">
        <desktop-card />
      </div>
    </div>
    <!--Busqueda-->
    <board-poke-list />
    <favorite-pokemon />
    <!--Modal mobil-->
    <div v-if="getDeviceScreen === 'isMobile' && getFetchPokemon.showModal">
      <mobil-card />
    </div>
    <!--Modal mobil-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      modalStatus: ''
    }
  },
  computed: {
    ...mapGetters(['getDeviceScreen', 'getFetchPokemon'])
  },
  mounted () {
    this.mobileScreen()
    window.addEventListener('resize', this.mobileScreen)
  },
  methods: {
    ...mapActions(['setScreen']),
    // Start request para el detalle de la modal
    // End request para el detalle de la modal
    mobileScreen () {
      if (window.innerWidth < 1024) {
        this.setScreen('isMobile')
      } else {
        this.setScreen('isDesktop')
      }
    }
  }
}
</script>
