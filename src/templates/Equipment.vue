<template> 

<div class="equipment"> 
  <transition name="fade"> 
    <div v-show="alert_open" class="alert" ><h3>{{ alert }}</h3><span @click="alert_open=false"><a>&times;</a></span> </div>
  </transition> 
    <i  v-show="loading" class="fa fa-spinner fa-spin"></i>  
<router-link to="/neweq" class="btn-blue pull-right top-space">Equipment hinzufügen</router-link>
<table> 
    <tr> 
        <th id="top">Name</th> 
        <th id="top">Hersteller</th> 
        <th id="top">Gesamtanzahl</th> 
        <th id="top">id</th> 
        <th id="top">Optionen</th>
    </tr> 
    <tr v-for="equipment in equipment"> 
        <th>{{ equipment.name }}</th>
        <th>{{ equipment.fabricator }}</th>
        <th>{{ equipment.max_quantity }}</th> 
        <th>{{ equipment.id }}</th>
        <th><a class="btn-red" v-on:click="opm(equipment.id, equipment)">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            löchen
        </a></th>
    </tr>
</table> 
<div id="WarningModal" class="modal" v-if="delete_modal_open">
    
    <div class="modal-content"> 
    <div class="modal-header"> 
        <h3>{{ modal_head }}</h3> 
        <span class="close" @click="delete_modal_open= false">&times;</span>
    </div> 
    <bold>{{ modal_text }}</bold> 
    <div class="options"> 
        <a class="btn-blue" @click="delete_modal_open=false">Abbrechen</a> 
       <a class="btn-red" @click="del()">Löschen</a> 
    </div>
</div>
  
</div> 

</div>
</template>

<script>
export default {
  name: 'equipment',
  data () {
    return { 
     msg:"Equipment", 
     equipment:[], 
     loading: false, 
     delete_modal_open: false, 
     add_modal_open: false,
     item:"", 
     name:"", 
     alert:"", 
     alert_open:false, 
     modal_head:"", 
     modal_content:"", 
     modal_text:"", 
     modal_options:"",
    }
   }, 
   ready: function(){ 
    this.loading = true;
   },
   methods: { 
        opm: function(id, name){ 
        this.delete_modal_open = true; 
        this.modal_head = "Warnung"; 
        this.modal_text = "Wollen Sie dieses Gerät wirklich löschen?" 
        this.modal_options = ` ` 
       
        this.item = id; 
        this.name = name;
    }, 
       del: function(){ 
           var id = this.item; 
           var name = this.name;
           this.$http.delete("equipment/"+id).then(function(){this.$http.get("equipments") 
       .then( 
        function(response){
             this.equipment = response.data; 
            this.loading = false;
        });})
           console.log("sucsessful deleted"); 
           this.alert = "Item Gelöscht";
           this.alert_open = true;
           this.delete_modal_open = false;
       }, 
       
       newEq: function(){ 
       }
   }, 
   created: function(){ 
    this.$http.get("equipments/all") 
       .then( 
        function(response){
             this.equipment = response.data; 
            this.loading = false;
        });
   } 
   
  }
</script>
<style lang="less"> 
@import "../font-awesome-4.7.0/less/font-awesome.less";
@import "../external_css/tables.less"; 
@import "../external_css/modals.less"; 
@import "../external_css/buttons.less";

    .alert{ 
      background-color: greenyellow; 
      width: 70em; 
      height: 3em; 
      margin-top: 1em; 
      border-radius: 10px;
    } 
    
    .alert span{ 
     font-weight: bold; 
     float:right; 
     font-size: 25px; 
     margin-top:-39px; 
     padding-right: 10px; 
     position:relative;
    } 
    
    .alert h3{ 
        text-align: center; 
        padding-top: 10px; 
        font-family: roboto;
    } 
    
    #add{ 
        float:right; 
        margin-bottom: 8px;
    } 
    
    .heading{ 
        font-family: roboto;
    }
</style>