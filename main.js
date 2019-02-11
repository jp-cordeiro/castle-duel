new Vue({
    name: 'game',
    name: 'game',
    el: '#app',
    data: state,
    template: `
    <div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
        <hand :cards="testHand"/>
     </div>
    `,
    computed:{
        testCard(){
            return cards.archers
        },

    },
    methods:{
        createTestHand(){
            const cards = []
            const inds = Object.keys(cards)

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
        }
    },
    created(){
        this.testHand = this.createTestHand()
    }
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorlRatio()
})