<template>

<div class="equipment">
<div class="searchbar">
      <span>suchen:</span>
      <br>
      <input type="text" v-model="searchstr">
    </div>
<router-link to="/neweq" class="btn-transparent pull-right top-space" id="button" v-bind:title="newInfo">Equipment registrieren</router-link>
<div class="container-fluid main"  v-show="!loading">
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

    <div class="table-row" v-for="equipment in equipmentsToDisplay">
       <div class="wrapper text-4">
           <div class="wrapper text-2">
               <div class="text" @click="$router.push('/equipment/'+ equipment.id)" id="link">{{equipment.fabricator}}</div>
               <div class="text">{{equipment.name}}</div>
           </div>
           <div class="wrapper text-2">
               <div class="text">{{equipment.max_quantity}}</div>
               <div class="text">{{equipment.avail_quantity}}</div>
           </div>
           <div class="wrapper text">
              <div class="text">
                   <a class="btn-red" id="delete" v-on:click="opm(equipment.id, equipment.name)" v-bind:title="dinfo">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                   </a>
              </div>
                   <div class="text">
                      <span class="btn-blue" @click="$router.push('/equipment-edit/'+ equipment.id)">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
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
     searchstr:"",
    }
   },
   ready: function(){
    this.loading = true;
   },
   methods: {
        opm: function(id, name){
        this.delete_modal_open = true;
        this.modal_head = "Warnung";
        this.modal_text = 'Wollen Sie "'+name+'" wirklich löschen?'
        this.modal_options = ` `

        this.item = id;
        this.name = name;
    },
       del: function(){
           var id = this.item;
           var name = this.name;
           this.$http.delete("equipment/"+id+"/").then(function(){this.$http.get("equipment/")
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
   },
   created: function(){
    this.$http.get("equipment/")
       .then(
        function(response){
             this.equipment = response.data;
            this.loading = false;
        });
   },
   mounted(){
    bus.$on('reload', function(){
      console.log("received")
      this.$http.get("equipment/").then(function(response){
        this.equipment = response.data;
        this.loading = false;
      })
    })
   },
   computed:{
    equipmentsToDisplay(){
      if(!this.searchstr) return this.equipment
      var searchstr = this.searchstr.toLowerCase()
      return this.equipment.filter((elm)=>(elm.name.toLowerCase().indexOf(searchstr) >= 0 || elm.fabricator.toLowerCase().indexOf(searchstr) >= 0) )
    }
   }

  }
</script>
<style lang="less">
/*@import "../font-awesome-4.7.0/less/font-awesome.less";*/
@import "../external_css/tables.less";
@import "../external_css/modals.less";
@import "../external_css/buttons.less";
@import "../external_css/alerts.less";

    body{
      background-color: #524f4f;
      color: white;
      font-family: roboto;
      overflow: scroll;
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

    #link{
      cursor: pointer;
      text-decoration: underline;
     }

     .searchbar{
      margin-top: 3em;
      margin-bottom: -3em;
      margin-left: -2.3em;
    }

    .searchbar input{
      width: 15em;
      height: 2em;
      background-color: #555;
      border: solid;
      border-color: white;
      color: white;
    }


</style>
