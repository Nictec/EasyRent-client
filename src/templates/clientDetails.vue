<template>
  <div class="clientDetails">
    <h1>Details zum Kunden {{client.firstname}} {{client.secondname}} </h1>
  </div>
</template>

<script>
  export default{
    name:"client Details",
    data(){
      return{
        client:"",
      }
    },
    computed:{
      clientId(){
          return this.$route.params.client_id
        }
      },
      created(){
        this.$http.get('client/'+this.clientId+'/').then(function(response){
          console.log("getted");
          this.client = response.data;
        })
    },
  }
</script>

<style lang="less" scoped>

</style>
