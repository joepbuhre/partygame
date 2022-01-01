<template>
     <div class="row timer">
        <div class="innertimer col">
            <div class="wrapper">
                <span class="seconds-timer">{{timer}}</span>
                <div class="progress">
                    <div class="progress-bar" :class="progressbar.class" :style="'width: '+ progressbar.percentage * 100+'%'"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TimerCountdown',
    props: {
        timer: Number,
        progressbar: Object
    }
}
</script>

<style lang="scss" scoped>
.row.timer {
    .seconds-timer {
        font-size: 64px;
        color: white;
        transition: .4s ease;
    }
    .progress {
        margin: 10px 15px;
        width: 90%
    }
}

</style>