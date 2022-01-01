<template>
   <div class="game pt-8">
        <ExplodingItem :showItem="show_item.presents" txt='Whoop! Whoop! Je mag een cadeautje openmaken!' src='https://i.pinimg.com/originals/fd/2c/1a/fd2c1a96b654e220d09525f006482477.gif' @click="hideItem('presents')" />
        <ExplodingItem :showItem="show_item.pawns" txt='Yess je mag een pion op het bord zetten!' @click="hideItem('pawns')" />
        <div class="container-fluid">
            <div id="meters" :style="metersStyle" class="row">
                <div class="col-6">
                    <div :data-present-count="team1.presents" class="presents-meter meter">
                        <div :key="n" v-for="n in $store.getters.getConfig.presents_count" :data-present-id="($store.getters.getConfig.presents_count - n + 1)" class="present">
                            <img :class="( team1.presents <= ($store.getters.getConfig.presents_count - n )) ? 'locked' : ''" src="../assets/images/gift-box.png" alt="">
                        </div>
                    </div>
                </div> 
                <div class="col-6">
                    <div :data-pawn-count="team1.pawns" class="pawns-meter meter">
                        <div v-for="n in $store.getters.getConfig.pawns_count" :data-pawn-id="n" :key="n" class="pawn">
                            <img :class="( team1.pawns <= ($store.getters.getConfig.pawns_count - n )) ? 'locked' : ''" src="../assets/images/pawn.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="dice" style="margin-top: 30px;" class="container-fluid">
            <div class="row">
                <h3>Klik hieronder aan wat je hebt gedobbeld</h3>
                <div class="col">
                    <img @click="noMinigame('Helaas je moet een stap terug met een pion naar keuze')" src="../assets/images/dice/dice-1.png" alt="">
                </div>
                <div class="col">
                    <img @click="minigame('pictionary')" src="../assets/images/dice/dice-2.png" alt="">
                </div>
                <div class="col">
                    <img @click="minigame('questions')" src="../assets/images/dice/dice-3.png" alt="">
                </div>
            </div>
            <div style="margin-top: 10px;" class="row">
                <div class="col">
                    <img @click="minigame('30seconds')" src="../assets/images/dice/dice-4.png" alt="">
                </div>
                <div @click="addItem('presents'), noMinigame('Je krijgt een cadeautje erbij!')" class="col">
                    <img src="../assets/images/dice/dice-5.png" alt="">
                </div>
                <div class="col" @click="minigame('uitbeelden')">
                    <img src="../assets/images/dice/dice-6.png" alt="">
                </div>
            </div>
        </div>
        <div id="minigames" class="container-fluid"> 
            <div id="overlay" v-if="overlay.show || ws_config.timesup" @click="pauseTimer()"></div>
            <!-- 30seconds -->
            <div v-show="checking.startminigame && checking.whichminigame === '30seconds'" @click="closeMinigame" id="30seconds" class="minigame">
               <TimerCountdown :timer="timer" :progressbar="progressbar" />
                <div class="row minigame-card" :class="{'blur-md':checking.blurred}">
                    <div class="minigame-card-inner">
                        <p :key="question" :style="{visibility: checking.seconds.questions ? 'visible' : 'hidden'}" v-for="question in minigames.seconds">{{question.questions}}</p>
                    </div>
                </div>
            </div>

            <!-- questions -->
            <div v-show="checking.startminigame && checking.whichminigame === 'questions'" id="questions" class="minigame">
                <TimerCountdown :timer="timer" :progressbar="progressbar" />

                  <div class="row minigame-card" >
                    <div class="col">
                        <div class="minigame-card-inner">
                            <p> {{minigames.questions.question}} </p>
                            <p :style="{visibility: checking.questions.answer ? 'visible' : 'hidden'}"> {{minigames.questions.answer}} </p>
                        </div>
                    </div>
                    <div class="col-12 buttons">
                        <button v-show="!checking.questions.answer" @click="checking.questions.answer = true" class="btn btn-success">Laat Antwoord zien</button>
                        <div v-show="checking.questions.answer || timer === 0 " class="btn-group">
                            <button @click="afterMinigame(true)" class="btn btn-success">Gehaald</button>
                            <button @click="afterMinigame(false)" class="btn btn-danger">Niet gehaald</button>
                        </div>

                    </div>
                </div>
            </div>
            <!-- pictionary -->
            <div v-show="checking.startminigame && (checking.whichminigame === 'pictionary' || checking.whichminigame === 'uitbeelden')" id="pictionary" class="minigame">
               <TimerCountdown :timer="timer" :progressbar="progressbar" />

                <div class="row minigame-card">
                    <div class="minigame-card-inner">
                        <p v-if="checking.whichminigame === 'pictionary'"> Teken het object: <strong>{{minigames.pictionary.word}}</strong> </p>
                        <p v-if="checking.whichminigame === 'uitbeelden'"> Beeld uit het object: <strong>{{minigames.pictionary.word}}</strong> </p>
                        <div class="btn-group">
                            <button @click="afterMinigame(true)" class="btn btn-success">Gehaald</button>
                            <button @click="afterMinigame(false)" class="btn btn-danger">Niet gehaald</button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="checking.startready" id="startready" class="minigame">
               <div v-if="checking.whichminigame !== 'nominigame'" >
                    <h5>Je gaat het spel <strong>{{checking.whichminigame}}</strong> spelen. Ben je er klaar voor?</h5>
                    <p v-if="checking.whichminigame === '30seconds'" > Je moet minimaal {{ checking.seconds.correct_answers }} vragen goed hebben om deze minigame te halen </p>
                    <button @click="startMinigame()" class="btn btn-primary">Start minigame</button>
               </div>
               <div v-if="checking.whichminigame === 'nominigame'" >
                   <p>{{checking.helptext}}</p>
                    <button @click="overlay.show = false, checking.startready = false" class="btn btn-primary">Oke</button>

               </div>
            </div>
        </div>
        <div v-show="(timer === 0 && checking.whichminigame !== 'questions') || ws_config.timesup" id="timesup">
            <div class="row inner">
                <div class="col">
                    <h1>Tijd is om!</h1>
                    <div v-if="!ws_config.timesup" class="btn-group">
                        <button @click="afterMinigame(true)" class="btn btn-success">Gehaald</button>
                        <button @click="afterMinigame(false)" class="btn btn-danger">Niet gehaald</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import axios from 'axios'
import TimerCountdown from '@/components/TimerCountdown.vue'
import ExplodingItem from '@/components/ExplodingItem.vue'
import logging from '@/services/logging.js'


export default {
    data() {
        return {
            ws: null,
            ws_config: {
                timesup: false
            },
            ajax_url: 'https://dev.merces.me/game/assets/php/ajax.php',
            timer: null,
            initial_timer: null,
            interval: [],
            log: null,
            overlay: {
                show: false,
                css: {
                    backgroundColor: 'black'
                }
            },
            metersStyle: {
                fontSize: '659px'
            },
            show_item: {
                presents: false,
                pawns: false
            },
            progressbar: {
                class: null,
                percentage: 1,
            },
            team1: {
                presents: 0,
                pawns: 0
            },
            teams: {},
            checking: {
                whichminigame: null,
                startminigame: false,
                startready: false,
                blurred: false,
                helptext: null,
                seconds: {
                    questions: true,
                    correct_answers: 5,
                },
                questions: {
                    answer: false,
                },
                pictionary: {
                    word: false
                },
            },
            minigames: {
                questions: {
                    answer: null
                },
                pictionary: {
                    word: null
                }
            }
        }
    },
    mounted() {
        this.metersStyle.fontSize = window.innerHeight + 'px'
        
        this.$socket.on('ws_config', (ws_config) => {
            this.ws_config = ws_config
        })
        this.$socket.on('user_logout', (id) => {
            delete this.teams[id]
        })
        this.$socket.emit('login', this.$store.getters.getConfig )


    },
    components: {
        TimerCountdown, 
        ExplodingItem
    },
    methods: {
        async minigame(minigame) {
            this.checking.whichminigame = minigame
            this.overlay.show = true
            logging.info(`${minigame} started`)
            if(minigame === 'uitbeelden'){
                minigame = 'pictionary'
            }
            var result;
            await axios({
                method: "POST",
                url: this.ajax_url,
                data: {
                    action: "minigame",
                    game: minigame
                }
            }).then(function(res) {
                result = res.data.message
                console.log(res)
            })
            if (minigame === '30seconds') {
                this.minigames.seconds = result
                this.checking.seconds.correct_answers = Math.floor(Math.random() * (5 - 3 + 1) + 3)
                this.timer = 30
            }
            if (minigame === 'questions') {
                this.minigames.questions.question = result[0].question
                this.minigames.questions.answer = result[0].answer
                this.timer = 20
            }
            if (minigame === 'pictionary' || minigame === 'uitbeelden') {
                this.minigames.pictionary.word = result[0].word
                this.timer = 60
            }
            this.checking.startready = true
        },
        noMinigame(text) {
            if(this.team1.presents === 3) {
                return false;
            }
            this.overlay.show = true
            this.checking.startready = true
            this.checking.whichminigame = 'nominigame'
            this.checking.helptext = text
        },
        clearIntervals(){
            for (let i = 0; i < this.interval.length; i++) {
                const interval = this.interval[i];
                clearInterval(interval)
                this.interval.slice(i,1)
            }
        },
        hideItem(choice) {
            this.team1[choice] = 0
            this.show_item[choice] = false
        },
        addItem(choice) {
            this.team1[choice]++
            logging.succes(`Added ${choice}`)
            if(this.team1.presents === this.$store.getters.getConfig.presents_count) {
                this.show_item.presents = true
            }
            if(this.team1.pawns === this.$store.getters.getConfig.pawns_count) {
                this.show_item.pawns= true
            }
        },
        startMinigame() {
            this.checking.startready = false
            this.checking.startminigame = true
            this.setTimer()
        },
        pauseTimer() {
            if(this.ws_config.timesup === true) {
                this.ws_config.timesup = false
                return false;
            }
            this.checking.blurred = true
            this.clearIntervals()
            setTimeout(() => {
                logging.warn(`Minigame paused`)
                if(confirm("Weet je zeker dat je wilt stoppen?")) {
                    this.afterMinigame(false)
                    this.checking.startminigame = false
                    this.checking.blurred = false
                    this.checking.startready = false

                } else {
                    this.setTimer(false)
                    this.checking.blurred = false

                }

            }, 0);

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
                        this.checking.questions.answer = true
                        if(this.checking.whichminigame !== 'questions') {
                            this.checking.startminigame = false
                        }
                        this.timerEnded()
                        this.clearIntervals()
                    }
            }, 1000);
            this.interval.push(temp_interval)
        },
        timerEnded(){
            const ended = {
                timesup: true
            }
            this.$socket.emit('ws_config', ended )
        },
        afterMinigame(success) {
            this.clearIntervals()
            this.overlay.show = false
            this.timer = null
            this.progressbar.percentage = 1
            this.progressbar.class = null
            this.checking.questions.answer = false
            this.checking.startminigame = false
            if(success) {
                this.addItem('pawns')
            }
            this.$socket.emit('ws_config', this.ws_config)
        }

    },
}
</script>
<style lang="scss" scoped>
.locked {
    filter: grayscale(100%);
    transition: 1s ease;
}
.present,
.pawn {
    display: flex;
    img {
        transition: 1s ease;
        margin: auto;
        height: 0.125em;
        width: auto;
        margin-top: 10px;
    }
}

.minigame {
    position: fixed;
    top: 20vh;
    width: 95%;
    z-index:9999;
    .minigame-card {
        .col-12.buttons {
            display: flex;
            justify-content: center;
        }
        .minigame-card-inner {
            background: #f6fbff;
            border: #c9e4ff solid 1px;
            color: black;
            padding: 5px 30px;
            margin-top: 20px;
            font-weight: bolder;
            width: 90%;
            margin: auto;
            border-radius: 10px;
        }
    }
}
#overlay{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: black;
    opacity: 0.8
}
#timesup {
    position: fixed;
    top: 25vh;
    left: 20px;
    right: 20px;
    color: white;
}
#startready {
    background: white;
    padding: 10px;
    border-radius: 3px;
    z-index: 9999;
}

#confirmdialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    .inner {
        margin: auto;
        background: white;
        min-height: 130px;
        width: 90%;
        padding: 10px;
        text-align: center;
        border-radius: 10px;
        border: var(--bs-blue) solid thin;
    }
}
</style>