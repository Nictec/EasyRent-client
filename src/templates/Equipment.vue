<template> 
<div class="equipment"> 
    <i  v-show="loading" class="fa fa-spinner fa-spin"></i> 
    <h1>{{ msg }}</h1> 
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
        <th><a class="btn-red" v-on:click="opm(equipment.id)">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            löchen
        </a></th>
    </tr>
</table> 
<div id="myModal" class="modal" v-if="delete_modal_open">
    
    <div class="modal-content"> 
    <div class="modal-header"> 
        <h3>Warnung</h3> 
        <span class="close" @click="delete_modal_open= false">&times;</span>
    </div> 
    <bold>Wollen Sie das Gerät wirklich löschen?</bold> 
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
     item:"",
    }
   }, 
   ready: function(){ 
    this.loading = true;
   },
   methods: { 
        opm: function(id){ 
        this.delete_modal_open = true; 
        this.item = id;
    }, 
       del: function(){ 
           var id = this.item; 
           this.$http.delete("http://localhost:8000/api/equipment/"+id)
           console.log("sucsessful deleted"); 
           this.delete_modal_open = false;
       }
   }, 
   created: function(){ 
    this.$http.get("http://localhost:8000/api/equipments") 
       .then( 
        function(response){
             this.equipment = response.data; 
            this.loading = false;
        });
   } 
   
  }
</script>
<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%; 
    overflow-x: auto; 
    @media screen and (max-width: 680px){ 
        padding-right: 2em;
    }
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
} 
    
.btn-red {
  background: #ff0a0a;
  background-image: -webkit-linear-gradient(top, #ff0a0a, #ff0000);
  background-image: -moz-linear-gradient(top, #ff0a0a, #ff0000);
  background-image: -ms-linear-gradient(top, #ff0a0a, #ff0000);
  background-image: -o-linear-gradient(top, #ff0a0a, #ff0000);
  background-image: linear-gradient(to bottom, #ff0a0a, #ff0000);
  -webkit-border-radius: 9;
  -moz-border-radius: 9;
  border-radius: 9px;
  font-family: Arial;
  color: #ffffff;
  font-size: 14px;
  padding: 8px 15px 8px 15px;
  text-decoration: none;
}

.btn-red:hover {
  background: #2bff00;
  background-image: -webkit-linear-gradient(top, #2bff00, #2bff00);
  background-image: -moz-linear-gradient(top, #de2828, #de2828);
  background-image: -ms-linear-gradient(top, #de2828, #de2828);
  background-image: -o-linear-gradient(top, #de2828, #de2828);
  background-image: linear-gradient(to bottom, #de2828, #de2828);
  text-decoration: none;
} 
    
.btn-blue {
  background: #4460ff;
  background-image: -webkit-linear-gradient(top, #4460ff, #ff0000);
  background-image: -moz-linear-gradient(top, #4460ff, #4460ff);
  background-image: -ms-linear-gradient(top, #4460ff, #4460ff);
  background-image: -o-linear-gradient(top, #4460ff, #4460ff);
  background-image: linear-gradient(to bottom, #4460ff, #4460ff);
  -webkit-border-radius: 9;
  -moz-border-radius: 9;
  border-radius: 9px;
  font-family: Arial;
  color: #ffffff;
  font-size: 14px;
  padding: 8px 15px 8px 15px;
  text-decoration: none;
}

.btn-blue:hover {
  background: #6078ff;
  background-image: -webkit-linear-gradient(top, #6078ff, #6078ff);
  background-image: -moz-linear-gradient(top, #6078ff, #6078ff);
  background-image: -ms-linear-gradient(top, #6078ff, #6078ff);
  background-image: -o-linear-gradient(top, #6078ff, #6078ff);
  background-image: linear-gradient(to bottom, #6078ff, #6078ff);
  text-decoration: none;
} 

 /* The Modal (background) */
.modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #484747; 
    color: white;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 40%; /* Could be more or less, depending on screen size */ 
    height: 20%; 
    font-family: roboto;
} 
    .modal-header { 
        width: 38.5em; 
        margin: -20px; 
        margin-top: -50px;
        margin-bottom: 10px;
        height: 3em; 
        background-color: #ff6c00;
    } 
    
    .modal-header h3{ 
        text-align: center; 
        padding-top: 0.7em; 
        font-family: roboto;
    } 
    
    .options{ 
        padding-top: 2em;
    }

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold; 
    margin-top: -1.7em; 
    padding-right: 0.5em;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>