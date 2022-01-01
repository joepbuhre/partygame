<template>
  <div class="home">
     <div v-if="!ismobile">
            <div class="flex flex-row flex-wrap	">
                <div class="basis-full">

                    <h1 style="text-align: center;">Scan de QR code hieronder om te openen op je mobiel</h1>
                    <h5 style="text-align: center;">Al op mobiel? Voeg toe als Link op je homescreen!</h5>
                </div>
                <div class="basis-full justify-center flex">
                    <img class="" src="../assets/images/qrcode.svg" alt="">
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted() {
    this.$router.push('/setup')
  }
}
</script>

<style lang="scss">

</style>