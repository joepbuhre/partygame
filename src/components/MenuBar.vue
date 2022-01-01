<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button @click="show_members()" class="btn" ><span v-html="teamname()"></span>
            <div v-if="showmembers" id="members"  class="hidden">
                <div v-show="this.$store.getters.teams">
                    <h4>Je speelt tegen</h4>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="team in this.$store.getters.teams" :key="team.id">
                            Team: {{team.data.team_setup.name}}
                            <ul>
                                <li v-for="member in team.data.team_setup.members" :key="member">{{member}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            </button>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <button @click="this.$store.commit('setConfig', null)" class="btn btn-primary">Begin opnieuw</button>
                </li>
                <li class="nav-item">
                    <GameRules />
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import GameRules from '@/components/GameRules.vue'

export default {
    name: "MenuBar",
    components: {
        GameRules
    },
    data() {
        return {
            showmembers: false,
            teams: {},
        }
    },
    mounted() {
        this.$socket.on('ws_config', (ws_config) => {
            this.$socket_config = ws_config
        })
        
    },
    methods: {
        teamname() {
            const config = this.$store.getters.getConfig
            if(config === false || config === null){
                return ''
            }
            if('team_setup' in config ){
                return 'Team: ' + this.$store.getters.getConfig.team_setup.name
            } else {
                return ''
            }
        },
        show_members() {
            this.showmembers = !this.showmembers
        }
    }
}
</script>

<style lang="scss" scoped>
#members {
    position:fixed;
    top: 55px;
    padding-left: 30px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    text-align: left;
    background: rgba(255, 255, 255, 0.75);
    li {
        color: black !important;
        background: none !important;
        z-index: 9999
    }
}
</style>