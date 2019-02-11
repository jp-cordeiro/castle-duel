const cloudAnimationDurations = {
    min: 10000,
    max: 50000
}

Vue.component('castle',{
    props: ['player','index'],
    template: `
    <div class="castle" :class="'player-' + index">
        <img class="building" :src="'svg/castle' + index + '.svg'"/>
        <img class="ground" :src="'svg/ground' + index + '.svg'"/>
        <castle-banners :player="player"></castle-banners>
    </div>
    `
})

Vue.component('castle-banners', {
    props: ['player'],
    template: `
    <div class="banners">
        <!--Comida-->
        <img class="food-icon" src="svg/food-icon.svg"/>
        <bubble type="food" :value="player.food" :ratio="foodRatio" />
        <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />
        
        <!--Saúde-->
        <img class="health-icon" src="svg/health-icon.svg" />
        <bubble type="health" :value="player.health" :ratio="healthRatio" />
        <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
    </div>
    `,
    computed:{
        foodRatio(){
            return this.player.food / maxFood
        },
        healthRatio(){
            return this.player.health / maxHealth
        }
    }
})

Vue.component('bubble',{
    props: ['type','value','ratio'],
    template: `
    <div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
        <img :src="'svg/' + type + '-bubble.svg'"/>
        <div class="counter"> {{ value }} </div>
    </div>
    `,
    computed: {
        bubbleStyle(){
            return{
                top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
            }
        }
    }
})

Vue.component('banner-bar',{
    props: ['color','ratio'],
    template: '#banner',
    data(){
        return{
            height: 0
        }
    },
    computed: {
        targetHeigth(){
            return 220 * this.ratio + 40
        }
    },
    watch:{
        targetHeigth(newValue,oldValue) {
            const vm = this
            new TWEEN.tween({value: oldValue})
                .easing(TWEEN.Easing.Cubic.InOut)
                .to({value: newValue},500)
                .onUpdate(function () {
                    vm.height = this.value.toFixed(0)
                })
                .start()
        }
    },
    created(){
        this.height = this.targetHeigth
    }
})

Vue.component('cloud', {
    props:['type'],
    template: `
    <div class="cloud" :class="'cloud' + type" :style="style">
        <img  :src="'svg/cloud' + type + '.svg'" @load="initPosition"/>
    </div>
    `,
    data(){
        return{
            style: {
                transform: 'none',
                zIndex: 0
            }
        }
    },
    methods:{
        setPosition(left,top){
            this.style.transform = `translate(${left}px, ${top}px`
        },
        initPosition(){
            const width = this.$el.clientWidth
            this.setPosition(-width, 0)
        },
        startAnimation(delay = 0){
            const vm = this

            const width = this.$el.clientWidth

            //Animação randômica
            const {min,max} = cloudAnimationDurations
            const animationDuration = Math.random() * (max - min) + min

            this.style.zIndex = Math.round(max - animationDuration)

            const top = Math.random() * (window.innerHeight * 0.3)

            new TWEEN.Tween({value: -width})
                .to({value:window.innerWidth}, animationDuration)
                .delay(delay)
                .onUpdate(function () {
                    vm.setPosition(this.value, top)
                })
                .onComplete(() => {
                    this.startAnimation((Math.random() * 10000))
                })
                .start()
        }
    },
    mounted(){
        this.startAnimation(-Math.random() * cloudAnimationDurations.min)
    }
})