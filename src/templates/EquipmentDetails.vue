
<template>
  <div class="equipment">
    <h1>{{equipment.fabricator}} {{equipment.name}}</h1>
    <br>
    <h4>Beschreibung:</h4>
    <span v-html="equipment.beschreibung"></span>
    <h4>Features:</h4>
    <span v-html="equipment.features"></span>
    <h4>Gewerk:</h4>
    {{labor}}
    <h4>Vermietpreis:</h4>
    {{equipment.rent_price}}€
    <h4>Einkaufspreis:</h4>
    {{equipment.purchasing_price}}€
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'equipmentEdit',
  components:{
    'vue-markdown': VueMarkdown
  },
  data () {
    return {
      equipment: "",
    }
  },
  computed: {
    equipmentId(){
      return this.$route.params.equipment_id
    },
    labor(){
      if (this.equipment.labor === 'L'){
        return "Licht";
      }else{
        return "Ton";
      };
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

     h1{
       color:#db6900;
     }
     h4{
       color:#db6900;
     }

</style>
