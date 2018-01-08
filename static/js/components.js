var Info=Vue.component('Info',{
    props:['mes','infoshow'],
    template:`
        <div class="info" v-show="infoshow==true">{{mes}}</div>
    `,
})

/*首页*/
var Index=Vue.component('Index',{
    template:`
        <div class="index">
            
            <div class="body">
                <div class="left">
                    <router-view name="left"></router-view>
    <!--给router-view起个名字，用来控制那个组件出现在哪个位置，以防一个组件出现在所有的router-view中-->
                </div>
                <div class="right">
                    <router-view name="right"></router-view>
                </div>
            </div>
        </div>
    `,
    data(){
        return{
            
        }
    }
});
/*Left*/
var Left=Vue.component('Left',{
    template:`
        <div class="Left">
            <ul v-for="item in datas">
                <router-link :to="'#'+item.id">
                    <li>{{item.title}}</li>
                </router-link>
                
                <ul v-for="item1 in item.child">
                <router-link :to="'#'+item1.id">
                    <li >
                        {{item1.title}}    
                    </li>
                </router-link>
                </ul>               
            </ul>
        </div>
    `,
    data(){
        return{
            menu:[]
        }
    },
    computed:{
        datas(){
            var arrOne=[];//用来放一级菜单
            for(var i=0;i<this.menu.length;i++){
                if(this.menu[i].pid==0){
                    arrOne.push(this.menu[i]);
                }else{
                    for(var j=0;j<arrOne.length;j++){
                        if(this.menu[i].pid==arrOne[j].id) {
                            if (!arrOne[j].child) {
                                arrOne[j].child = [];
                            }
                            arrOne[j].child.push(this.menu[i]);
                        }
                    }
                }
            }
            return arrOne;
        }
    },
    mounted(){
        fetch('./demo.txt').then(res=>{
            return res.json();
        }).then(res=>{
            this.menu=res;
        })
    },
    watch: {
        $route() {
            var num = (this.$route.hash.slice(1));
            var pos = document.querySelector(".a" + num).offsetTop - 50;

            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({number: pos}, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start();

            animate()
        }
    },
});
/*Right*/
var Right=Vue.component('Right',{
    template:`
        <div class="markdown-body">
            <div class="right" v-html="content">
               
            </div>
        </div>
    `,
    data(){
      return {
          content:'',
      }
    },
    mounted(){
        fetch('./right.txt').then(res=>{
            return res.text();
        }).then(res=>{
            this.content=res;
        })
    },

});

var Quick=Vue.component("quick",{
    template:`
        <div class="quick">
        在进入/离开的过渡中，会有 6 个 class 切换。

v-enter：定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。

v-enter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。

v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入一帧后生效 (与此同时 v-enter 被删除)，在 transition/animation 完成之后移除。

v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。

v-leave-active：定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。

v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发一帧后生效 (与此同时 v-leave 被删除)，在 transition/animation 完成之后移除。
</div>
    `
})

