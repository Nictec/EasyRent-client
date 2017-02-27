import Vue from 'vue' 
import _ from 'underscore' 
import moment from 'moment'
import Hello from './templates/Hello.vue' 
import Test from './templates/Test.vue' 
import Equipment from './templates/Equipment.vue' 
import shelfs from './templates/shelfs.vue' 
import newShelf from './templates/newShelf.vue'
import EquipmentDetails from './templates/EquipmentDetails.vue' 
import Dashboard from './templates/Dashboard.vue' 
import Details from './templates/details.vue' 
import NewEq from './templates/NewEq.vue' 
import equipmentList from './templates/equipmentList.vue' 
import Orders from './templates/Orders.vue' 
import OrderDetails from './templates/OrderDetails.vue' 
import NewOrder from './templates/NewOrder.vue' 
import chooseeq from './templates/chooseeq.vue'
import App from './App.vue'
import VueRouter from 'vue-router' 
import VueResource from 'vue-resource'   
Vue.use(VueRouter) 
Vue.use(VueResource)

//moment config 

    moment.defineLocale("de",{
        months : "Jänner_Februar_März_April_Mai_Juni_Juli_August_Septermber_Oktober_November_Dezember".split("_"), 
        monthsShort : "Jän_Feb_Mrz_Apr_Mai_Juni_Juli_Aug_Sept_Okt_Nov_Dez".split("_"), 
        weekdays : "Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag_Sonntag".split("_")
    }); 



//vue stuff

const router = new VueRouter({  
      mode: 'hash',
    routes: [ 
        {path:'/', component: Dashboard}, 
        {path: '/test', component: Test}, 
        {path: '/equipment', component: Equipment}, 
        {path: '/equipment/:equipment_id', component: EquipmentDetails}, 
        {path: '/neweq', component: NewEq}, 
        {path: '/orders', component: Orders}, 
        {path: '/order-details/:event', component: OrderDetails, props:true }, 
        {path: '/new-order', component: NewOrder}, 
        {path: '/choose-eq/:order_id', component: chooseeq}, 
        {path: '/equipment-list/:order_id', component: equipmentList}, 
        {path: '/details/:order_id', component: Details}, 
        {path: '/regale/', component: shelfs}, 
        {path: '/new-shelf/', component: newShelf},
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
