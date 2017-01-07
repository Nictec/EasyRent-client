import Vue from 'vue' 
import _ from 'underscore'
import Hello from './templates/Hello.vue' 
import Test from './templates/Test.vue' 
import Equipment from './templates/Equipment.vue' 
import Dashboard from './templates/Dashboard.vue' 
import NewEq from './templates/NewEq.vue' 
import Orders from './templates/Orders.vue' 
import OrderDetails from './templates/OrderDetails.vue' 
import NewOrder from './templates/NewOrder.vue'
import App from './App.vue'
import VueRouter from 'vue-router' 
import VueResource from 'vue-resource'
    
Vue.use(VueRouter) 
Vue.use(VueResource)

const router = new VueRouter({  
      mode: 'hash',
    routes: [ 
        {path:'/', component: Dashboard}, 
        {path: '/test', component: Test}, 
        {path: '/equipment', component: Equipment}, 
        {path: '/neweq', component: NewEq}, 
        {path: '/orders', component: Orders}, 
        {path: '/order-details/:event', component: OrderDetails, props:true }, 
        {path: '/new-order', component: NewOrder}
    ]
});

Vue.http.options.root = 'http://localhost:8000/api'
//new Vue({ 
//router,
//}).$mount('#app') 

new Vue({
    router, 
    render: h => h(App)
}).$mount('#app')