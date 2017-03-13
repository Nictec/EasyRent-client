<template>
  <div class="clientDetails">
    <h1>Details zum Kunden {{client.firstname}} {{client.secondname}} </h1>
    <br>
    <h4>E-mail:</h4>
      {{client.email}}
    <h4>Ort:</h4>
      {{client.post_code}} {{client.city}}
    <h4>Straße:</h4>
      {{client.street}}
  </div>
</template>

<script>
  export default{
    name:"clientDetails",
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
