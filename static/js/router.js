var router=new VueRouter({
    routes:[

        {
            path:'/',
            component:Index,
            children:[
                {
                    path:"",//如果不写路径的话，就默认和"/"一起显示
                    components:{
                        left:Left,//给父组件的两个router-view分别起个名字，各自的名字对应各自的组件
                        right:Right
                    }
                }
            ]
        },
        {
            path:"/quick",
            component:Quick
        }
    ]
})

