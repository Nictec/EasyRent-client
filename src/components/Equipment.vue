<template> 
<div class="equipment"> 
{{ msg }} 
<table> 
    <tr> 
        <th>Name</th> 
        <th>Hersteller</th> 
        <th>Gesamtanzahl</th>
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
    }  
   }, 
   methods: { 
       
   }, 
   created: function(){ 
    this.$http.get("http://localhost:8000/api/equipments?format=json") 
       .then( 
        function(response){
             this.equipment = response.data; 
        });
   }
  }
</script>

<style scoped>
    table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    text-align: left;
    padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}
</style>