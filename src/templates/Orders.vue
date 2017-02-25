<template> 
 <div class="orders"> 
    <router-link class="btn-transparent pull-right top-space" to="/new-order" id="new">Neue Veranstaltung öffnen</router-link> 
<!--
     <table> 
         <tr>  
             <th id="top">Name</th> 
             <th id="top">Status</th> 
             <th id="top">Optionen</th>
         </tr> 
         <tr v-for="orders in orders"> 
             <th>{{orders.name}}</th> 
             <th> <status :orders="orders"></status></th> 
             <th></th>
         </tr>
     </table> 
--> 
    <div class="container-fluid main" style="margin-top: 10px"> 
        
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
            <div class="table-row" v-for="orders in orders">
                <div class="wrapper text-4">
                    <div class="wrapper text-4">
                        <div class="text" @click="$router.push('/details/'+ orders.id)" id="details" v-bind:title="Details">{{orders.name}}</div> 
                        <div class="text" style="margin-top:-20px;" id="options"><status :orders="orders"></status></div> 
                    </div> 
                    
                    <div class="wrapper text" id="options"> 
                        <div class="text" v-bind:title="linfo"><span class="btn-blue" @click="$router.push('/equipment-list/'+ orders.id)"><i class="fa fa-list" aria-hidden="true"></i></span></div>  
                    </div>
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
                }
            },  
        created: function(){ 
            this.$http.get("order/").then(function(response){ 
                this.orders = response.data; 
            })
        }, 
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
   
</style>