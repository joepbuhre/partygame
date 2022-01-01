<template>
    <div v-if="showItem" style="" data-modal id="exploding-present">
        <div class="wrapper">
            <h4>{{txt}}</h4>
            <img :src="src" alt="">
            <button id="close" class="btn btn-success">
                Yes bedankt!
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showItem: Boolean,
        src: String,
        txt: String,
    },
    
}
</script>

<style lang="scss" scoped>
#exploding-present {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgb(0 0 0 / 40%);
    display: flex;
    z-index: 999;
    .wrapper {
        margin: auto;
        color: white;
        text-align: center;
    }
    img {
        margin: auto;
    }
}
</style>