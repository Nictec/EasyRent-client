<template>
<div class="settings">
  <h1>Users:</h1>
  <router-link to="/settings/newuser/" class="btn-blue pull-right" id="new">neuen User anlegen</router-link>
  <div class="container-fluid main">
    <div class="table-row header">
    <div class="wrapper text-4">
      <div class="text">Username</div>
      <div class="text">Email</div>
      <div class="text">is Admin</div>
      <div class="text">Optionen</div>
    </div>
    </div>
    <div class="table-row" v-for="(client, index) in client">
      <div class="wrapper text-4">
        <div class="text">{{client.username}}</div>
        <div class="text">{{client.email}}</div>
        <div class="text">{{client.is_staff}}</div>
        <div class="text"><span class="btn-red" @click="opm(client.id, client.username, index)"><i class="fa fa-trash" aria-hidden="true"></i></span></div>
      </div>
    </div>
  </div>
      <!-- modal -->
    <div id="WarningModal" class="modal" v-if="modal_open">

    <div class="modal-content">
    <div class="modal-header">
        <h3>Warnung:</h3>
        <span class="close" @click="modal_open= false">&times;</span>
    </div>
    <bold>{{modal_text}}</bold>
    <div class="options">
        <a class="btn-blue" @click="modal_open=false">Abbrechen</a>
       <a class="btn-red" @click="del()">Löschen</a>
    </div>
</div>

</div>
</div>
</template>

<script>
  export default{
    name:"settings",
    data(){
      return{
        client:"",
        modal_open: false,
        modal_text:"",
        id:"",
        cindex:""
      }
    },
    methods:{
      opm(id, name, index){
        this.modal_text="wollen Sie den User "+name+" wirklich löschen?"
        this.id=id
        this.cindex=index
        this.modal_open=true
      },
      del(){
        this.$http.delete('user/'+this.id+'/').then(function(response){
          this.$http.get('user/').then(function(response){
            this.client=response.data;
          })
          this.modal_open=false;
        })
      }
    },
    created(){
      this.$http.get('user/').then(function(response){
        this.client=response.data;
      })
    }
  }
</script>

<style>
  #new{
    margin-right:3em;
   }
</style>
