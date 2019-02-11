new Vue({
    name: 'game',
    name: 'game',
    el: '#app',
    data: state,
    template: `
    <div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
        <div class="world">
            <div class="clouds">
                <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
            </div>
                <castle v-for="(player,index) in players" :player="player" :index="index" :key="player.name"/>
                <div class="land"/>
        </div>
        <transition name="hand">
            <hand v-if="!activeOverlay" :cards="testHand" @card-play="testPlayCard"/>
        </transition>
        <transition name="zoom">
            <overlay v-if="activeOverlay" :key="activeOverlay">           
                <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" :opponent="currentOpponent" :players="players"/>          
            </overlay>   
        </transition>
        <transition name="fade">
            <div class="overlay-background" v-if="activeOverlay"/>
        </transition>
     </div>
    `,
    methods:{
        createTestHand(){
            const cards = []
            const ids = Object.keys(cards)

            for(let i =0; i < 5; i++){
                cards.push(this.testDrawCard())
            }

            return cards
        },
        testDrawCard(){
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]

            return{
                uid: cardUid++,
                id: randomId,
                def: cards[randomId]
            }
        },
        testPlayCard(card){
            const index = this.testHand.indexOf(card)
            this.testHand.splice(index,1)
        }
    },
    created(){
        this.testHand = this.createTestHand()
    }
})

//Tween.js
requestAnimationFrame(animate)

function animate(time){
    requestAnimationFrame(animate)
    TWEEN.update(time)
}

window.addEventListener('resize', () => {
    state.worldRatio = getWorlRatio()
})