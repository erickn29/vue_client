<script>
import Navbar from './components/Navbar.vue'
import UpArrow from './components/UpArrow.vue'

export default {
  components: {
    Navbar,
    UpArrow
    // sidebar,
    // dashboard,
    // logs
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<template>

  <header>
    <Navbar />
  </header>

  <main>
    <router-view></router-view>
    <UpArrow />
  </main>

</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

main {
  font-family: 'Montserrat', sans-serif;
}

hr {
  color: #0000996e !important;
}

h2 {
  font-size: 1.4rem !important;
  font-weight: 700 !important;
}

h3 {
  font-size: 1.3rem !important;
  font-weight: 600 !important;
}

</style>
