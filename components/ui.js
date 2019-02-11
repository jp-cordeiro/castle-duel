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
        <card v-for="card in cards" :def="card.def" :key="card.uid" @play="handlePlay(card)"/>
    </div>
</div>
    `,
    methods: {
        handlePlay(card){
            this.$emit('card-play',card)
        }
    }
})