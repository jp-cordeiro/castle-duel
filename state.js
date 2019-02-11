//Variáveis utilitárias
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

//Estado da aplicação
var state = {
    //UI
    activeOverlay: null,
    //Mundo
    worldRatio: getWorlRatio(),
    //Jogo
    turn: 1,
    players: [
        {
            name: 'Jogador 1',
            food: 10,
            health: 10,
            skipTurn: false,
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        },
        {
            name: 'Jogador 2',
            food: 10,
            health: 10,
            skipTurn: false,
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        }
    ],
    currentPlayerIndex: Math.round(Math.random()),
    get currentPlayer(){
        return state.players[state.currentPlayerIndex]
    },
    get currentOpponentId(){
        return state.players[state.currentPlayerIndex === 0 ? 1 : 0]
    },
    get currentOpponent(){
        return state.players[state.currentOpponentId]
    }
}