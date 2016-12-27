import Vue from 'vue'
import Hello from './templates/Hello.vue' 
import Test from './templates/Test.vue' 
import Equipment from './templates/Equipment.vue' 
import Dashboard from './templates/Dashboard.vue'
import App from './App.vue'
import VueRouter from 'vue-router' 
import VueResource from 'vue-resource'
    
Vue.use(VueRouter) 
Vue.use(VueResource)

const router = new VueRouter({ 
//    base: __dirname, 
    routes: [ 
        {path:'/', component: Dashboard}, 
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