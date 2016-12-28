<template> 
<div class="equipment"> 
    <i  v-show="loading" class="fa fa-spinner fa-spin"></i> 
    <h1>{{ msg }}</h1> 
<table> 
    <tr> 
        <th id="top">Name</th> 
        <th id="top">Hersteller</th> 
        <th id="top">Gesamtanzahl</th>
    </tr> 
    <tr v-for="equipment in equipment"> 
        <th>{{ equipment.name }}</th>
        <th>{{ equipment.fabricator }}</th>
        <th>{{ equipment.max_quantity }}</th>
    </tr>
</table>
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
    }
   }, 
   ready: function(){ 
    this.loading = true;
   },
   methods: { 
       
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
<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>