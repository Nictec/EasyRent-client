<template>
 <div class="orders">
   <div class="searchbar">
         <span>suche:</span>
         <br>
         <input type="text" v-model="searchstr">
  </div>
  <div class="searchbar2">
    <span>abgeschlossene Aufträge:</span>
    <br>
    <select v-model=filterstr>
      <option value="" default>anzeigen</option>
      <option value="f">nicht anzeigen</option>
    </select>
  </div>
  <br>
    <router-link class="btn-transparent pull-right top-space" to="/new-order" id="new">Neue Veranstaltung öffnen</router-link>
    <div class="container-fluid main" style="margin-top: 30px">

        <div class="table-row header">
            <div class="wrapper text-4">
                <div class="wrapper text-4">
                    <div class="text">Name</div>
                    <div class="text" id="options">Status</div>

                </div>

            </div>
            <div class="wrapper text" id="options">
                <div class="text">Optionen</div>
            </div>
        </div>
            <div class="table-row" v-for="orders in ordersToDisplay">
                <div class="wrapper text-4">
                    <div class="wrapper text-4">
                        <div class="text" @click="$router.push('/details/'+ orders.id)" id="details" v-bind:title="Details">{{orders.name}}</div>
                        <div class="text" style="margin-top:-20px;" id="options"><status :orders="orders"></status></div>
                    </div>

                    <div class="wrapper text" id="options">
                        <div class="text" v-bind:title="linfo"><span class="btn-blue" @click="$router.push('/equipment-list/'+ orders.id)"><i class="fa fa-list" aria-hidden="true"></i></span></div>
                        <div class="text"><span class="btn-blue" @click="$router.push('/choose-eq/'+orders.id)" :title="add"><i class="fa fa-plus" aria-hidden="true"></i></span></div>
                        <div class="text"> <span class="btn-red" @click="open(orders.id, orders.name)"><i class="fa fa-trash" aria-hidden="true"></i></span></div>
                    </div>
                </div>
            </div>
    </div>
    <i  v-show="loading" class="fa fa-circle-o-notch fa-spin spinner"></i>
    <p class="spinner txt" v-show="loading">lade Daten...</p>
    <div id="WarningModal" class="modal" v-if="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Warnung</h3>
                     <span class="close" @click="modal = false">&times;</span>
                    </div>
                        <bold>{{ modal_text }}</bold>
                    <div class="options">
                    <a class="btn-blue" @click="modal = false">Abbrechen</a>
                    <a class="btn-red" @click="del()">Löschen</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import status from '../components/status.vue'

    export default {
        name: 'Orders',
        data() {
            return{
                orders:[],
                order: "",
                linfo:"Benötigtes Equipment anzeigen",
                Details:"Details anzeigen",
                add:"Equipment hinzufügen",
                modal_text:"",
                modal: false,
                filterstr:"",
                searchstr:"",
                loading: true,
                id:"",
            }
        },
        components:{
          status
        },
        methods: {
            stupid:function(orders){
                var data = this.orders;
                Object.keys(data).forEach(function(key){
                    console.log(data[key].status);
                })
                },
                details:function(){
                    this.$router.push('/details/'+ this.orders.id)
                },
                open:function(id, name){
                    this.modal_text="Wollen Sie den Auftrag "+name+" wirklich löschen?";
                    this.modal = true;
                    this.id = id;
                },
                del:function(){
                    this.$http.delete('order/'+this.id+"/").then(function(response){
                        console.log("sucessfully  deleted");
                        this.$http.get("order/").then(function(response){
                            this.orders = response.data;
                            this.modal = false;
                        })
                    })
                },
                load(){
                  this.$http.get("order/").then(function(response){
                  this.orders = response.data;
                  this.loading = false;
            })
                }
            },
        created: function(){
            var context = this
            bus.$on('reload', function(){
              this.$http.get("order/").then(function(response){
                  context.orders=response.data
                  context.loading = false;
            },function(){console.log("fuck")})
            })
          this.load()
        },
        computed:{
         ordersToDisplay(){
           if(!this.filterstr) var afteropt = this.orders
           var filterstr = this.filterstr
           afteropt = this.orders.filter((elm)=>(elm.status.toLowerCase()!=filterstr) )
           if(!this.searchstr) return afteropt
           var searchstr = this.searchstr.toLowerCase()
           return afteropt.filter((elm)=>(elm.name.toLowerCase().indexOf(searchstr) >= 0))
         }
       },
        mounted: function(){
        }
    }
</script>


<style scoped>
    custom{
        height: 10px !important;
    }

    #new{
        margin-right: 3.5em !important;
    }

      #options{
        padding-left: 150px !important;
    }

    #details{
        cursor: pointer;
        text-decoration: underline;
     }

     .searchbar{
      margin-bottom: -55px;
      margin-left: -2.3em;
    }

    .searchbar2{
     margin-bottom: -72px;
     margin-left: 12em;
   }

   .searchbar2 select{
    height:30px;
   }

   select{
     width: 15em;
   }

</style>
