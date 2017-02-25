
<template> 
  <div class="equipment">  
    <h1>{{equipment.fabricator}} {{equipment.name}}</h1> 
    <div id="description"> 
        <ul> 
            <li>maximal verfügbare Anzahl: {{equipment.max_quantity}}</li> 
            <br>  
            <li>Lagerort: Regal {{equipment.storeplace}}</li> 
            <br> 
            <li>Features:</li> 
            <li id="desfield"><pre style="font-family: roboto;">{{equipment.features}}</pre></li>
            <br> 
            <li>Beschreibung:</li>
            <br> 
            <li id="desfield">{{equipment.beschreibung}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'equipmentEdit',
  data () {
    return { 
        equipment: "", 
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
    @import "../font-awesome-4.7.0/less/font-awesome.less";
    @import "../external_css/tables.less"; 
    @import "../external_css/modals.less"; 
    @import "../external_css/buttons.less"; 
    @import "../external_css/alerts.less";

    #desfield{ 
            list-style: none; 
            padding-left: 3em;
     }    
</style>
