
<template> 
  <div class="equipment">  
    <router-link to="/neweq" class="btn-transparent pull-right top-space" id="button" v-bind:title="newInfo">Equipment registrieren</router-link>
    {{ equipmentId }}
  </div>
</template>

<script>
export default {
  name: 'equipmentEdit',
  data () {
    return { 
    }
   }, 
  computed: {
    equipmentId(){
      return this.$route.params.equipment_id
    }
  },
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
