//Mundo

function getWorlRatio() {
    return 1 / 1920 * window.innerWidth
}

//Jogo

//Pilha de Cartas

//Puxar uma carta
function drawCard() {
    //Caso a pilha esteja zerada ele reembaralha as cartas descartas
    if(getDrawPileCount() === 0){
        refillPile()
    }

    const choice = Math.round(Math.random() * (getDrawPileCount() - 1)) + 1

    for (let k in state.drawPile){
        accumulation += state.drawPile[k]
        if(choice <= accumulation){
            //Puxa uma carta da pilha
            state.drawPile[k] --
            return {
                id: k,
                uid: cardUid,
                def: cards[k]
            }
        }

    }
}

//Mão inicial
function drawInitialHand(player) {
    for(let i = 0; i < handSize; i++){
        player.hand.push(drawCard())
    }
}

//Adicionar carta à pilha
function addCardToPile(pile, cardId) {
    typeof pile[card] === 'number' ? pile[cardId] ++ : pile[cardId] = 1
}

//Repôr a pilha caso esteja zerada
function refillPile() {
    Object.assign(state.drawPile, state.dicardPile)
    state.discardPile = {}
}

function getDrawPileCount() {
    let result = 0
    for(let k in state.drawPile){
        result += state.drawPile[k]
    }
    return result
}

//Jogando as cartas

//Aplicando efeito nas cartas
function applyCardEffect(card) {
    state.currentPlayer.lastPlayedCardId = card.id
    card.def.play(state.currentPlayer, state.currentOpponent)
    //Verifica se as estatísticas de comida e saúde estão dentro dos limites
    state.players.forEach(checkStatsBounds)
}

//Última carta jogada
function getLastPlayedCard(player) {
    return cards[player.lastPlayedCardId]
}

//Jogador

//Checa e normaliza o status
function checkStatsBounds(player) {
    //Saúde
    if(player.health < 0){
        player.health = 0
    } else if(player.health > maxHealth){
        player.health = maxHealth
    }

    //Comida
    if(player.food < 0){
        player.food = 0
    } else if(player.food > maxFood){
        player.food = maxFood
    }
}

//Verifa se o jogador perdeu
function checkPlayerLost(player) {
    player.dead = (player.health === 0 || player.food === 0)
}

function isOnePlayerDead() {
    return state.players.some( p => p.dead)
}