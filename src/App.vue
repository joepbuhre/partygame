<template>
  <div class="">
    <MenuBar text="test" />
    <router-view/>
  </div>
</template>
<script>
import MenuBar from '@/components/MenuBar.vue'

export default {
  data () {
    return {
      text: 'test'
    }
  },
  components: {
    MenuBar
  },
  mounted() {
    this.$socket.on('user_login', (data) => {
      this.$store.commit('user_login', data)
    })
    this.$socket.on('user_logout', (id) => {
      this.$store.commit('user_logout', id)
    })
    this.$socket.emit('login', this.$store.getters.getConfig )

    this.$socket.on('connect', () => {
      this.$store.commit('setid', this.$socket.id)
    })

  },
  beforeUnmount() {
      this.$socket.disconnect()
  },
}
</script>
<style lang="scss">
#app {
  text-align: center;
}
img {
  max-width: 100%;
}
nav {
  padding: 30px;
}
</style>
