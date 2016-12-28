<template> 
<div class="test">
    <input type="text" placeholder="Vorname" v-model="name"><br>  
    <input type="text" placeholder="Nachname" v-model="nname" v-if="name">
    <h1>{{ name }} <span v-if='name'>{{ nname }}</span></h1> 
    <button v-on:click="greet()">greet me!!</button> 
    <button v-on:click="number()">give me a random number!!</button>
</div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'Hello world', 
      name: '', 
      nname: '',
    }  
   }, 
   methods: { 
    greet: function(){ 
        if (this.name != ''){
            alert('Hello'+' '+this.name+' '+this.nname); 
        } 
        else{ alert('please enter your name') };
    }, 
    number: function(){ 
     var num = Math.random(); 
     alert(num); 
     
    }
   }
  }
</script>

<style scoped>

</style>
