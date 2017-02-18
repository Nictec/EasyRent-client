
<template> 
  <div class="equipment">  
   <table> 
       <tr> 
           <th>Name</th> 
           <th>Hersteller</th> 
           <th>Options</th>
       </tr> 
       <tr v-for="equipment in equipment"> 
           <th>{{equipment.name}}</th> 
           <th>{{equipment.fabricator}}</th>
       </tr>
   </table>
  </div>
</template>

<script>
export default {
  name: 'chooseeq',
  data () {
    return { 
        equipment:"",
    }
   }, 
  methods: { 
    alert: function(){ 
      alert(this.orderId);  
    },
  },
  computed: {
    orderId(){
      return this.$route.params.order_id
    }
  }, 
    
  created: function(){ 
    this.$http.get("equipments/all") 
       .then( 
        function(response){
             this.equipment = response.data; 
        });
   }
}
</script>
<style lang="less"> 
@import "../font-awesome-4.7.0/less/font-awesome.less";
@import "../external_css/tables.less"; 
@import "../external_css/modals.less"; 
@import "../external_css/buttons.less"; 
@import "../external_css/alerts.less";

body{ 
    overflow: visible !important; 
    overflow-x: hidden;
} 
#add{ 
        float:right; 
        margin-bottom: 8px;
    } 
    
    .heading{ 
        font-family: roboto;
    } 
    
    #button{ 
        margin-right: 3.5em !important; 
    }
    
    #delete{ 
        margin-right: 0px !important;
    }
    
    .spinner{ 
        margin-left: 40%; 
        margin-top: 200px;
        font-size: 70px;
    }
    
    .txt{ 
        font-size: 20px !important; 
        margin-top: 3px; 
        margin-left: 39.3% !important;
        font-family: roboto;
    } 
    
    #options{ 
        padding-left: 30px;
    }
    
</style>
