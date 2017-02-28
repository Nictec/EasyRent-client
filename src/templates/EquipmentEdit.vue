
<template> 
  <div class="equipment">  
    <h1>{{equipment.fabricator}} {{equipment.name}} bearbeiten</h1> 

    <div class="form"> 
      <label for="description">Beschreibung:</label> 
      <br> 
      <input type="text" name="description" :placeholder="equipment.beschreibung" v-model="description"> 
      <br> 
      <label for="max">Bestand</label> 
      <br> 
      <input type="number" name="max" :placeholder="equipment.max_quantity" v-model="max_quantity"> 
      <br> 
      <label for="rp">Vermietpreis</label> 
      <br> 
      <input type="number" name="rp" :placeholder="equipment.rent_price+'€'" v-model="rent_price"> 
      <br> 
      <label for="pp">Einkaufspreis</label> 
      <br> 
      <input type="number" name="pp" :placeholder="equipment.purchasing_price+'€'" v-model="purchasing_price"> 
    </div> 
    <span class="btn-blue" id="button" @click="save">speichern</span> 
    <div class="alert" v-show="alert_open">
      <span @click="alert_open=false">&times;</span> <h3>Item Updated</h3>  
    </div>  
  </div>
</template>

<script>
export default {
  name: 'equipmentEdit',
  data () {
    return { 
        equipment: "", 
        description: "", 
        max_quantity: "", 
        rent_price: "", 
        purchasing_price: "", 
        alert_open: false,
    }
   }, 
  methods: { 
    save:function(){ 
      var formData = new FormData; 
      if (this.description){
        formData.append('beschreibung', this.description); 
      };
      if (this.max_quantity){ 
        formData.append('max_quantity', this.max_quantity);
      }; 
      if (this.rent_price){ 
        formData.append('rent_price', this.rent_price); 
      }; 
      if (this.purchasing_price){  
        formData.append('purchasing_price', this.purchasing_price) 
      }; 
      this.$http.patch('equipment/'+this.equipmentId+'/', formData, {emulateJSON:true}).then(function(response){ 
        console.log("sucessfully submitted") 
        this.alert_open = true;
      }) 

    }
  },

  computed: {
    equipmentId(){
      return this.$route.params.equipment_id
    }
  }, 
  created: function(){
    this.$http.get("equipment/"+this.equipmentId+"/").then(function(response){ 
        this.equipment = response.data;
    })
  },
}
</script>
<style lang="less"> 
   @input-color:#dddddd; 
    h1{ 
        font-family: roboto;
    }
    
    .form{ 
        margin-left: 6em; 
        margin-top: 0.5em; 
        padding:2em 2em 2em 4em;
        width: 37em;
       
    } 
    
    .form textarea{ 
        background-color: @input-color;
        margin-bottom: 1em; 
        margin-right: 0em; 
        font-family: roboto;
    }
    
    .form input{ 
        background-color: @input-color;
        height: 3em; 
        width: 50em; 
        margin-bottom: 1em; 
        margin-right: 0em; 
/*        border-style: solid;*/
    } 
    
    form input:focus{ 
        border-color: #ff6c00;
    }
    
    .form label{ 
        font-family: roboto; 
       
    } 
    
    #lab{ 
     background-color: @input-color;
     height: 3em; 
     width: 50em; 
     margin-bottom: 1em; 
     margin-right: 0em; 
    } 
    
    #sub{ 
        margin-left:-5px; 
    } 
    
    .error{ 
    color: red; 
    font-family: roboto; 
    font-size: 11pt; 
    br{ 
      display: block; 
        margin-top: -10px
    }
    }
    .hasError{  
    border-style:solid;
    border-color: red;
    } 
    
    .file{
        position: absolute;
        font-size: 0.1px; 
        width: 0.1px; 
        height: 0.1px;
        cursor: pointer; 
        
}
    upb{ 
    max-width: 10px;
    } 

  #button{ 
    margin-left:47em;
  }    
</style>
