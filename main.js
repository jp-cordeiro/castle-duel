new Vue({
    name: 'game',
    el: '#app',
    data: state,
    template: `
    <div id="#app" :class="cssClass">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
        <div class="world">
            <div class="clouds">
                <cloud v-for="index in 10" :key="index" :type="(index - 1) % 5 + 1" />
            </div>
                <castle v-for="(player,index) in players" :player="player" :index="index" :key="player.name"/>
                <div class="land"/>
        </div>
        <transition name="hand">
            <hand v-if="!activeOverlay" :cards="currentHand" @card-play="handlePlayCard" @card-leave-end="handleCardLeaveEnd"/>
        </transition>
        <transition name="zoom">
            <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">           
                <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" :opponent="currentOpponent" :players="players"/>          
            </overlay>   
        </transition>
        <transition name="fade">
            <div class="overlay-background" v-if="activeOverlay"/>
        </transition>
     </div>
    `,
    methods:{
        handlePlayCard(card) {
            playCard(card)
        },
        handleCardLeaveEnd(){
            applyCard()
        },
        handleOverlayClose(){
            overlayCloseHandlers[this.activeOverlay]()
        }
    },
    computed: {
        cssClass(){
            return{
                'can-play': this.canPlay
            }
        }
    },
    // created(){
    //     this.testHand = this.createTestHand()
    // },
    mounted() {
        beginGame()
    }
})

var overlayCloseHandlers = {
    'player-turn' (){
        if(state.turn > 1){
            state.activeOverlay = 'last-play'
        }else{
            newTurn()
        }
    },
    'last-play' (){
        newTurn()
    },
    'game-over' (){
        //Reinicia o jogo
        document.location.reload()
    }
}

//Tween.js
requestAnimationFrame(animate)

function animate(time){
    requestAnimationFrame(animate)
    TWEEN.update(time)
}

window.addEventListener('resize', () => {
    state.worldRatio = getWorlRatio()
})

//Jogo

state.activeOverlay = 'player-turn'

function beginGame(){
    state.players.forEach(drawInitialHand)
}

function playCard(card){
    if(state.canPlay){
        state.canPlay = false
        currentPlayingCard = card

        //Remove a carta da mão do jogador
        const index = state.currentPlayer.hand.indexOf(card)
        state.currentPlayer.hand.splice(index,1)

        //Adiciona a carta para a pilha de discarte
        addCardToPile(state.discardPile, card.id)
    }
}

function applyCard(){
    //Recebe o cartão jogado e aplica o efeito
    const card = currentPlayingCard
    applyCardEffect(card)

    //Espera um pouco para o jogador veja o ação executada
    setTimeout(() => {
        //Verifica se algum jogador morreu
        state.players.forEach(checkPlayerLost)

        if(isOnePlayerDead()){
            endGame()
        }else{
            nextTurn()
        }
    }, 700)
}


function nextTurn(){
    state.turn ++
    state.currentPlayerIndex = state.currentOpponentId
    state.activeOverlay = 'player-turn'
}

function newTurn() {
    state.activeOverlay = null
    if(state.currentPlayer.skipTurn){
        skipTurn()
    }else{
        startTurn()
    }
}

function skipTurn() {
    state.currentPlayer.skippedTurn = true
    state.currentPlayer.skipTurn = false
    nextTurn()
}

function startTurn() {
    state.currentPlayer.skippedTurn = false
    //Se ambos já passarem do primeiro turno
    if(state.turn > 2){
        //Puxa uma carta
        setTimeout(() => {
            state.currentPlayer.hand.push(drawCard())
            state.canPlay = true
        }, 800)
    }else{
        state.canPlay = true
    }
}

function endGame(){
    state.activeOverlay = 'game-over'
}