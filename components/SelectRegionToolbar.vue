<template>
  <div class="mb-4 p-6 space-y-4 bg-gray-800 rounded-lg">
    <p class="text-gray-500">
      Selecciona la region que quieras consultar
    </p>
    <div class="flex justify-evenly">
      <button
        class="rounded-lg px-4 py-2 transition-colors ease-out duration-500"
        :class="getRegionSelected === 2 ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-600'"
        @click="requestNewRegion(2)"
      >
        Kanto
      </button>
      <button
        class="rounded-lg px-4 py-2 transition-colors ease-out duration-500"
        :class="getRegionSelected === 3 ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-600'"
        @click="requestNewRegion(3)"
      >
        Johto
      </button>
      <button
        class="rounded-lg px-4 py-2 transition-colors ease-out duration-500"
        :class="getRegionSelected === 4 ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-600'"
        @click="requestNewRegion(4)"
      >
        Hoenn
      </button>
      <button
        class="rounded-lg px-4 py-2 transition-colors ease-out duration-500"
        :class="getRegionSelected === 5 ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-600'"
        @click="requestNewRegion(5)"
      >
        Sinooh
      </button>
      <button
        class="rounded-lg px-4 py-2 transition-colors ease-out duration-500"
        :class="getRegionSelected === 8 ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-600'"
        @click="requestNewRegion(8)"
      >
        Unova
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SelectRegionToolbar',
  computed: {
    ...mapGetters(['getRegionSelected'])
  },
  methods: {
    ...mapActions(['setRegion', 'setPokemonFetch', 'setActivePokemon']),
    requestNewRegion (region) {
      this.setRegion(region)
      this.setPokemonFetch({})
      this.setActivePokemon({})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
