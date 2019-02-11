//Variáveis utilitárias
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

//Estado da aplicação
var state = {
    //Mundo
    worldRatio: getWorlRatio(),
    //Jogo
    turn: 1,
    players: [
        {
            name: 'Jogador 1'
        },
        {
            name: 'Jogador 2'
        }
    ],
    currentPlayerIndex: Math.round(Math.random())
}