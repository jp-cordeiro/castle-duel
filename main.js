new Vue({
    name: 'game',
    name: 'game',
    el: '#app',
    data: state,
    template: `
    <div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
     </div>
    `
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorlRatio()
})