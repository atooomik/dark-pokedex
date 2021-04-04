<template>
  <div>
    <div
      class="p-6 rounded-lg text-gray-500 bg-gray-800 lg:mx-auto"
    >
      <v-select
        class="w-full bg-gray-700 rounded-lg capitalize"
        placeholder="Busca o selecciona un Pokemon de la lista"
        :options="getCollectionOfnames"
        :value="$store.myValue"
        @input="requestPokemonFetch"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SearcherInput',
  computed: {
    ...mapGetters(['getDeviceScreen', 'getCollectionOfnames'])
  },
  methods: {
    ...mapActions(['setPokemonFetch']),
    requestPokemonFetch (value) {
      if (this.getDeviceScreen === 'isMobile') {
        this.setPokemonFetch({ modal: true, pokemon: value })
      } else if (this.getDeviceScreen === 'isDesktop') {
        this.setPokemonFetch({ pokemon: value })
      }
    }
  }
}
</script>
