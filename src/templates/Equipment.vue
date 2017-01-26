<template> 

<div class="equipment">  
<router-link to="/neweq" class="btn-transparent pull-right top-space" id="button" v-bind:title="newInfo">Equipment hinzufügen</router-link>
<!--
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
--> 

<div class="container-fluid main" style="margin-top: 10px" v-show="!loading"> 
    
    <div class="table-row header"> 
        <div class="wrapper text-4">
            <div class="wrapper text-2">  
                <div class="text">Hersteller</div>
                <div class="text">Name</div>
            </div> 
            <div class="wrapper text-2"> 
                <div class="text">Gesamtanzahl</div>
                <div class="text">vorhandene Anzahl</div>
            </div> 
            <div class="wrapper text" id="options"> 
                <div class="text">Optionen</div> 
            </div>
        </div>
    </div> 
    
    <div class="table-row" v-for="equipment in equipment"> 
       <div class="wrapper text-4"> 
           <div class="wrapper text-2"> 
               <div class="text">{{equipment.fabricator}}</div>
               <div class="text">{{equipment.name}}</div>
           </div> 
           <div class="wrapper text-2">
               <div class="text">{{equipment.max_quantity}}</div>
               <div class="text">5</div>
           </div> 
           <div class="wrapper text" id="options"> 
               <div class="text"> 
                   <a class="btn-red" id="delete" v-on:click="opm(equipment.id, equipment)" v-bind:title="dinfo">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                   </a> 
                   <span class="btn-blue">
                       <i class="fa fa-pencil-square-o" aria-hidden="true" v-bind:title="einfo"></i>
                    </span>   
               </div>  
           </div>
       </div> 
    </div>
    
</div>

<i  v-show="loading" class="fa fa-circle-o-notch fa-spin spinner"></i> 
<p class="spinner txt" v-show="loading">lade Daten...</p> 

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
    <div v-show="alert_open" class="alert" ><span @click="alert_open=false">&times;</span> <h3>{{ alert }}</h3></div> 
</div>
</template>

<script>
export default {
  name: 'equipment',
  data () {
    return { 
     msg:"Equipment", 
     equipment:[], 
     loading: true, 
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
     dinfo: "Equipment löschen", 
     einfo:"Equipment bearbeiten", 
     newInfo:"Neues Equipment erstellen",
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
           this.delete_modal_open = false;
           this.alert_open = true;
           
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