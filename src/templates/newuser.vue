<template>
  <div class="new_user">
    <h1>Neuen User erstellen:</h1>
    <div class="form">
    <label for="username">Benuzername:</label>
    <br>
    <input type="text" name="username" v-model="username">
    <br>
    <label for="email">E-Mail:</label>
    <br>
    <input type="email" name="email" v-model="email">
    <br>
    <label for="pw1">Passwort:</label>
    <br>
    <input type="password" name="pw1" v-model="password" :class="{border: !is_valid}">
    <br>
    <label>Rechte:</label>
    <p>Admin?:</p><div class="box"><input type="checkbox" name="rights" v-model="is_staff"></div>
     <span v-on:click="submit" class="btn-transparent top-space" id="sub">Speichern</span>
     <span v-on:click="saveandgo" class="btn-transparent">Speichern und schließen</span>
     <span @click="abort" class='btn-transparent'>abbrechen</span>
    </div>
      <div class="alert" v-show="alert_open">
        <span @click="alert_open=false">&times;</span> <h3>User erstellt</h3>
    </div>
  </div>
</template>

<script>
  export default{
    name:"newuser",
    data(){
      return{
        username:"",
        email:"",
        password:"",
        is_staff:false,
        alert_open:false,
      }
    },
    methods:{
      submit(){
        var formData = new FormData
        formData.append('username', this.username);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('is_staff', this.is_staff);
        this.$http.post('user/', formData, {emulateJSON:true}).then(function(response){
          this.alert_open = true;
        })
      },
      saveandgo(){
        var formData = new FormData
        formData.append('username', this.username);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('is_staff', this.is_staff);
        this.$http.post('user/', formData, {emulateJSON:true}).then(function(response){
          this.$router.push('/settings/')
        })
      },
      abort(){
        this.$router.push('/settings/')
      },
    },
    computet:{
      is_valid(){
        if(this.password===this.password_repeat){
          return true
        }else{return false}
      },
    }
  }
</script>

<style>
#submit{
  margin-right: 24em;
 }

.box{
  margin-top:-2.5em;
  margin-left: -9em;
 }
 #sub{
  margin-left:10em;
  }
</style>
