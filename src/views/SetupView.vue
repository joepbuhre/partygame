<template>
  <div class="about">
      <div class="ismobile">
          <div class="container-fluid">
              <div id="setup" v-if="!(config.team_setup.global === 'ready')" class="container-fluid">
                <div class="wrapper" v-if="config.team_setup.global === 'beforenames'">
                    <div v-if="config.team_setup.name === null" class="row name">
                        <div class="col">
                            <form @submit.prevent="setName($event)">
                              <h4>Jullie teamnaam!</h4>
                              <div class="input-group mb-3">
                                  <span class="input-group-text">Team</span>
                                  <input type="text" id="teamname" name="teamname" class="form-control">
                              </div>
                              <button type="submit" class="btn btn-success">Yes dit wordt mijn teamnaam!</button>
                            </form>
                        </div>
                    </div>
                    <div v-if="config.team_setup.name !== null" class="row">
                        <div class="col">
                          <h4>Hoi Team <strong>{{config.team_setup.name}}</strong>! Wie zit er bij jullie in het team?</h4>
                        <ul class="list-group">
                          <li v-for="(key,value) in config.team_setup.members" :key="key" class="list-group-item"> {{config.team_setup.members[value]}} </li>
                        </ul>
                        <form @submit.prevent="addMember($event)">
                          <div class="input-group mb-3">
                              <input name="member" type="text" class="form-control" aria-describedby="button-addon1">
                              <button type="submit" class="btn btn-outline-secondary" id="button-addon1">Voeg toe</button>
                          </div>
                        </form>
                        <button @click="config.team_setup.global = 'afternames'" class="btn btn-success">Yes dit zijn mijn teamgenoten!</button>
                        </div>
                    </div>
                </div>
                <div v-if="config.team_setup.global === 'afternames' " class="wrapper">
                    <div class="row">
                        <div class="col">
                            <h4>Welkom {{config.team_setup.name}}</h4>
                            <p>In jullie team zitten:
                            <ul class="list-group list-group-flush" v-if="value !== null">
                                <li class="list-group-item" v-for="value in config.team_setup.members" :key="value">{{value}}</li>
                            </ul>
                            </p>
                        </div>
                        <button @click="readyGame()" class="btn btn-success">Letsgo!</button>
                    </div>
                </div>
              </div>
          </div>
        </div>
  </div>
</template>
<script>
  export default {
      data() {
          return {
              config: {
                  presents_count: 3,
                  pawns_count: 3,
                  team_setup: {
                      global: 'beforenames',
                      name: null,
                      members: []
                  }
              },
              ismobile: false,
          }
      },
      methods: {
        setName(form){
          const val = form.target.elements.teamname.value
          if(val.length === 0){
            alert('Je hebt geen naam ingevuld. Probeer het opnieuw')
            return false;
          }

          this.config.team_setup.name = val
        },
        addMember(event){
          const $member = event.target.elements.member
          if(/iva/gi.test($member.value)){
            if(!confirm("Weet je het 100% zeker dat je deze naam wilt gebruiken? Ik hou je in de gaten 👀")){
              return false;
            }
          }
          this.config.team_setup.members.push($member.value)
          $member.value = ''
        },
        readyGame(){
          this.$store.commit('setConfig', this.config)
          this.$router.push('game')
          this.$socket.emit('login', this.$store.getters.getConfig )

        }
      }
  }

</script>
<style lang="scss" scoped>
  .wrapper .row{
    margin-top: 25vh;
  }
</style>