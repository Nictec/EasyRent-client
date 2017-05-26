import Vue from 'vue'
import _ from 'underscore'
import moment from 'moment'
window.$ = window.jQuery = require("jquery")
import "./polyfiller.js"
import VueMarkdown from 'vue-markdown'
import Hello from './templates/Hello.vue'
import Test from './templates/Test.vue'
import Equipment from './templates/Equipment.vue'
import shelfs from './templates/shelfs.vue'
import newShelf from './templates/newShelf.vue'
import EquipmentDetails from './templates/EquipmentDetails.vue'
import EquipmentEdit from './templates/EquipmentEdit.vue'
import Dashboard from './templates/Dashboard.vue'
import Details from './templates/details.vue'
import NewEq from './templates/NewEq.vue'
import equipmentList from './templates/equipmentList.vue'
import Orders from './templates/Orders.vue'
import OrderDetails from './templates/OrderDetails.vue'
import NewOrder from './templates/NewOrder.vue'
import chooseeq from './templates/chooseeq.vue'
import clients from './templates/clients.vue'
import newClient from './templates/newClient.vue'
import clientDetails from './templates/clientDetails.vue'
import settings from './templates/settings.vue'
import newuser from './templates/newuser.vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import auth from './auth.js'
import VueTinymce from 'vue-tinymce'
Vue.use(VueTinymce)
Vue.use(VueRouter)
Vue.use(VueResource)

//moment config

moment.defineLocale("de",{
  months : "Jänner_Februar_März_April_Mai_Juni_Juli_August_Septermber_Oktober_November_Dezember".split("_"),
  monthsShort : "Jän_Feb_März_Apr_Mai_Juni_Juli_Aug_Sept_Okt_Nov_Dez".split("_"),
  weekdays : "Sonntag_ Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_")
});

//webshim config

 webshim.setOptions("basePath", "/dist/shims/")
  webshim.setOptions("forms-ext", {
    replaceUI: false, //if "auto" is used here, it replaces it on some tablets it wouldnt need to
                        //false means it really only replaces when necessary (eg. firefox, but not chrome)
    types: "date number datetime-local",
    date: {
      startView: 2,
      openOnFocus: true,
    },
    widgets: {
      // calculateWidth: false,
    },
  });
  webshim.polyfill("forms forms-ext");


//vue stuff

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {path:'/', component: Orders},
    {path: '/test', component: Test},
    {path: '/equipment', component: Equipment},
    {path: '/equipment/:equipment_id', component: EquipmentDetails},
    {path: '/equipment-edit/:equipment_id', component: EquipmentEdit},
    {path: '/neweq', component: NewEq},
    {path: '/orders', component: Orders},
    {path: '/order-details/:event', component: OrderDetails, props:true },
    {path: '/new-order', component: NewOrder},
    {path: '/choose-eq/:order_id', component: chooseeq},
    {path: '/equipment-list/:order_id', component: equipmentList},
    {path: '/details/:order_id', component: Details},
    {path: '/regale/', component: shelfs},
    {path: '/new-shelf/', component: newShelf},
    {path: '/clients/', component: clients},
    {path: '/new-client/', component: newClient},
    {path: '/client/:client_id', component: clientDetails},
    {path: '/settings/', component: settings},
    {path: '/settings/newuser/', component: newuser},
  ]
});

Vue.http.options.root = 'http://localhost:8000'
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', auth.getAuthHeader())
  next()
});

window.bus = new Vue();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
