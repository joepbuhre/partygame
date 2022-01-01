<template>
    <div>
        <h1>Test</h1>
        <div class="row justify-content-center">
            <TimerCountdown :timer="timer" :progressbar="progressbar" />
            <div class="col-sm-4">
                <form action="" @submit.prevent="emit_message($event)">
                    <div class="input-group">
                        <input type="text" name="message" class="form-control">
                        <button type="submit" class="btn btn-primary">Verstuur</button>
                    </div>
                </form>
                <div v-if="timesup" id="overlay">
                    <h1>Times up!</h1>
                    <button @click="this.socket.emit('times_up', false)" class="btn btn-primary">Helaas</button>
                </div>
                <button @click="test()" class="btn btn-outline-primary">Klik</button>
                <div>
                    <p v-for="message in messages" :key="message">{{message}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TimerCountdown from '@/components/TimerCountdown.vue'

export default {
    name: "WebSocket",
    data() {
        return {
            socket: null,
            messages: [],
            timer: 5,
            progressbar: {
                class: null,
                percentage: null,
            },
            interval: [],
            timesup: false
        }
    },
    created() {
    },
    beforeUnmount() {
    },
    components: {
        TimerCountdown
    },
    methods: {
        test() {
            console.log(this.$socket.id)
            this.$socket.emit('test', true)
        },
        emit_message(event) {
            // this.setTimer()
            const message = event.target.elements.message

            this.socket.emit('my_message', message.value)
            message.value = null
        },
        setTimer(initial = true) {
            if(initial) {
                this.initial_timer = this.timer
            }
            var temp_interval = setInterval(() => {
                this.timer--
                var percentage = this.progressbar.percentage = (this.timer/this.initial_timer)
                if( percentage < 0.25) {
                    this.progressbar.class = 'bg-danger'
                } else if (percentage < 0.5) { 
                    this.progressbar.class = 'bg-warning'
                } else if (percentage < 0.75) {
                    this.progressbar.class = 'bg-info'
                }
                    if (this.timer === 0) {                        
                        this.socket.emit('times_up', true)
                        this.clearIntervals();
                    }
            }, 1000);
            this.interval.push(temp_interval)
        },
        clearIntervals(){
            for (let i = 0; i < this.interval.length; i++) {
                const interval = this.interval[i];
                clearInterval(interval)
                this.interval.slice(i,1)
            }
        },
    }
}
</script>
<style lang="scss">
    .seconds-timer {
        color: black !important;
    }
    #overlay {
        background: red;
        display:flex;
        z-index: 99;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        h1 {
            margin:auto;
            font-size: 80px;
            color: white;
        }
    }
</style>