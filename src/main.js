import Vue from 'vue'
import Hello from './components/Hello.vue' 
import Test from './components/Test.vue' 
import Equipment from './components/Equipment.vue' 
import App from './App.vue'
import VueRouter from 'vue-router' 
import VueResource from 'vue-resource'
    
Vue.use(VueRouter) 
Vue.use(VueResource)

const router = new VueRouter({ 
    base: __dirname, 
    routes: [ 
        {path:'/', component: Hello}, 
        {path: '/test', component: Test}, 
        {path: '/equipment', component: Equipment},
    ]
});


//new Vue({ 
//router,
//}).$mount('#app') 

new Vue({
    router, 
    render: h => h(App)
}).$mount('#app')