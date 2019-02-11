Vue.component('top-bar',{
    props: ['players','currentPlayerIndex','turn'],
    template: `
<div class="top-bar" :class="'player-' + currentPlayerIndex">
    <div class="player p0">{{ players[0].name}}</div>
    <div class="turn-counter">
        <img class="arrow" src="svg/turn.svg">
        <div class="turn"> Turno {{ turn }}</div>
    </div>
    <div class="player p1">{{ players[1].name}}</div>
    </div>
`
})

Vue.component('card',{
    props: ['def'],
    template: `
<div class="card" :class="'type-' + def.type" @click="play">
    <div>
         <div class="title">{{ def.title }}</div>
         <img class="separator" src="svg/card-separator.svg" alt="">
         <div class="description">
            <div v-html="def.description"></div>
         </div>
         <div class="note">
            <div v-html="def.note"></div>
         </div>
    </div>
</div>
    `,
    methods:{
        play(){
            this.$emit('play')
        }
    }
})

Vue.component('hand',{
    props:['cards'],
    template:`
<div class="hand">
    <div class="wrapper">
        <!--Cartas-->
        <transition-group name="card" tag="div" class="cards">
            <card v-for="card in cards" :def="card.def" :key="card.uid" @play="handlePlay(card)"/>
        </transition-group>     
    </div>
</div>
    `,
    methods: {
        handlePlay(card){
            this.$emit('card-play',card)
        }
    }
})

Vue.component('overlay',{
    template: `
<div class="overlay" @click="handleClick">
    <div class="content">
        <slot />
    </div>
</div>
    `,
    methods:{
        handleClick(){
            this.$emit('close')
        }
    }
})

Vue.component('overlay-content-player-turn',{
    props: ['player'],
    template: `
<div>
    <div class="big" v-if="player.skipTurn">{{ player.name }}, <br> você pulou seu turno.</div>
    <div class="big" v-else>{{ player.name }},<br> seu turno!</div>
    <div>Clique para continuar</div>
</div>
    `
})

Vue.component('overlay-content-last-play',{
    props: ['opponent'],
    template: `
<div>
    <div v-if="opponent.slippedTurn">
        {{ opponent.name }} pulou o turno!
    </div> 
    <template v-else>
        <div>{{ opponent.name }} jogou:</div>
        <card :def="lastPlayedCard"></card>
    </template>
</div>
    `,
    computed:{
        lastPlayedCard(){
            return getLastPlayedCard(this.opponent)
        }
    }
})

Vue.component('player-result',{
    props: ['player'],
    template: `
<div class="player-result" :class="result">
    <span class="name">{{ player.name }}</span>
    <span class="result">{{ result }}</span>
</div>
    `,
    computed:{
        result(){
            return this.player.dead ? 'defeated' : 'victorious'
        }
    }
})

Vue.component('overlay-content-game-over',{
    props: ['players'],
    template: `
<div>
    <div class="big">Game Over</div>
    <player-result v-for="player in players" :player="player"></player-result>
</div>
    `
})