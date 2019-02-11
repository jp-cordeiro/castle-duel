let cards = [
    {
        id: 'pikemen',
        type: 'attack',
        title: 'Lanceiros',
        description: 'Gaste 1 de <b>Suprimentos</b> <br/> Inflija 1 de <b>Dano</b>',
        note: 'Eu cravarei minha lança em sua alma!',
        play (player, opponent){
            player.food -= 1
            opponent.health -= 1
        }
    },
    {
        id: 'catapult',
        type: 'attack',
        title: 'Catapulta',
        description: 'Gaste 2 de <b>Suprimentos</b> <br> Inflija 2 de <b>Dano</b>',
        note: 'Olhe lá no céu, o que é aquilo? ... BOOOOM!',
        play (player, opponent){
            player.food -= 2
            opponent.health -= 2
        }
    },
    {
        id: 'trebuchet',
        type: 'attack',
        title: 'Trabuco',
        description: 'Gaste 3 de <b>Suprimentos</b> <br> Leve 1 de <b>Danod</b> <br> Inflija 4 de <b>Dano</b>',
        note: 'A arma suprema de destruição!',
        play (player, opponent){
            player.food -= 3
            player.health -= 1
            opponent -= 4
        }
    },
    {
        id: 'archers',
        type: 'attack',
        title: 'Arqueiros',
        description: 'Gaste 3 de <b>Suprimentos</b> <br> Inflija 3 de <b>Dano</b>',
        note: 'Preparem seus arcos, ao meu comando .... AGORAAAA!!!!',
        play (player, opponent){
            player.food -= 3
            opponent.health -= 3
        }
    },
    {
        id: 'knighthood',
        type: 'attack',
        title: 'Cavalaria',
        description: 'Gaste 7 de <b>Suprimentos</b><br>Inflija 5 de<b>Dano</b>',
        note: 'A armada suprema do meu reino te subjugará!!!!',
        play (player, opponent) {
            player.food -= 7
            opponent.health -= 5
        },
    },
    {
        id: 'repair',
        type: 'support',
        title: 'Reparos',
        description: 'Cura 5 de <b>Dano</b><br>Pula o próximo turno',
        note: 'Chamem os melhores engenheiros do reino!!!!',
        play (player, opponent) {
            player.skipTurn = true
            player.health += 5
        }
    },
    {
        id: 'quick-repair',
        type: 'support',
        title: 'Quick Repair',
        description: 'Gaste 3 de <b>Suprimentos</b><br>Cure 3 de <b>Dano</b>',
        note: 'Eu sei das consequêcias, mas preciso de energia!',
        play (player, opponent) {
            player.food -= 3
            player.health += 3
        }
    },
    {
        id: 'farm',
        type: 'support',
        title: 'Fazenda',
        description: 'Ganhe 5 de <b>Suprimentos</b><br>Pula o próximo turno',
        note: 'Devemos esperar a colheita, sejamos pacientes!',
        play (player, opponent) {
            player.skipTurn = true
            player.food += 5
        },
    },
    {
        id: 'granary',
        type: 'support',
        title: 'Celeiro',
        description: 'Ganhe 2 de <b>Suprimentos</b>',
        note: 'Nosso exército tem fome!',
        play (player, opponent) {
            player.food += 2
        }
    },
    {
        id: 'poison',
        type: 'special',
        title: 'Enxame de gafanhotos',
        description: 'Gaste 1 de <b>Suprimentos</b><br>Seu oponente perde 3 de <b>Suprimentos</b>',
        note: 'Encantador de gafanhotos, dê o seu melhor agora!',
        play (player, opponent) {
            player.food -= 1
            opponent.food -= 3
        },
    },
    {
        id: 'fireball',
        type: 'special',
        title: 'BOLA DE FOGO!',
        description: 'Leve 3 de <b>Dano</b><br>Inflija 5 de <b>Dano</b><br>Pule o próximo turno',
        note: 'Que seu reino seja consumido em chamas ... BOLA DE FOGO!',
        play (player, opponent) {
            player.health -= 3
            player.skipTurn = true
            opponent.health -= 5
        },
    },
    {
        id: 'chapel',
        type: 'special',
        title: 'Capela',
        description: 'Só o criador para nos salvar agora ... T.T',
        note: 'Vamos orar por nossas vidas!!!!',
        play (player, opponent) {
            // Nada acontece...
        },
    },
    {
        id: 'curse',
        type: 'special',
        title: 'Maldição',
        description: 'Todos perdem! <br>Percam 3 de <b>Suprimentos</b><br>Recebam 3 de <b>Dano</b>',
        note: 'Você não deveria ter aberto aquela tumba amaldiçoada!!!!',
        play (player, opponent) {
            player.food -= 3
            player.health -= 3
            opponent.food -= 3
            opponent.health -= 3
        },
    },
    {
        id: 'miracle',
        type: 'special',
        title: 'Milagre',
        description: 'Todos ganham:<br>Ganhem 3 de <b>Suprimentos</b><br>Curem 3 de  <b>Dano</b>',
        note: 'O criador ouviu minhas preces!!!',
        play (player, opponent) {
            player.food += 3
            player.health += 3
            opponent.food += 3
            opponent.health += 3
        },
    },
]

cards = cards.reduce((map,card) => {
    card.description = card.description.replace(/\d+\s+<b>.*?<\/b>/gi, '<span class="effect">$&</span>')
    card.description = card.description.replace(/<b>(.*?)<\/b>/gi, (match, pl) => {
        const id = (pl === 'Dano' ? 'Damage' : 'Food').toLowerCase()
        return `<b class="keyword ${id}">${pl} <img src="svg/${id}.svg"></b>`
    })
    map[card.id] = card
    return map
}, {})

let pile = {
    pikemen: 4,
    catapult: 4,
    trebuchet: 3,
    archers: 3,
    knighthood: 3,
    'quick-repair': 4,
    granary: 4,
    repair: 3,
    farm: 3,
    poison: 2,
    fireball: 2,
    chapel: 2,
    curse: 1,
    miracle: 1,
}