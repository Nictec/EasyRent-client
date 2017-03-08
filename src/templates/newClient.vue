<template>
  <div class="newClient">
    <div class="form">
      <label for="first">Vorname</label>
      <br>
      <input type="text" name="first" v-model="first">
      <br>
      <label for="last">Nachname</label>
      <br>
      <input type="text" name="last" v-model="last">
      <br>
      <label for="mail">E-Mail Adresse</label>
      <br>
      <input type="email" name="mail" v-model="mail">
      <br>
      <label for="zip">PLZ</label>
      <br>
      <input type="number" name="zip" v-model="zip">
      <br>
      <label for="city">Ort</label>
      <br>
      <input type="text" name="city" v-model="city">
      <br>
      <label for="street">Straße/Nr.</label>
      <br>
      <input type="text" name="street" v-model="street">
    </div>
    <span class="btn-transparent" id="btn-group" @click="save">speichern</span>
    <span class="btn-transparent" @click="saveandgo">speichern und schließen</span>
    <span class="btn-transparent" @click="$router.push('/kunden/')">abbrechen</span>
    <div class="alert" v-show="alert">
  <span @click="alert=false">&times;</span> <h3>{{ alert_message }}</h3>
</div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        first:"",
        last:"",
        mail:"",
        zip:"",
        city:"",
        street:"",
        alert:false,
        alert_message:"",
      }
    },
    methods:{
      save(){
        var formData = new FormData;
        formData.append('firstname', this.first);
        formData.append('secondname', this.last);
        formData.append('email', this.mail);
        formData.append('post_code', this.zip);
        formData.append('city', this.city);
        formData.append('street', this.street);
        this.$http.post('client/', formData, {emulateJSON:true}).then(function(response){
          console.log("submitted")
          this.alert_message = "Kunde erstellt";
          this.alert = true;
        })
      },
      saveandgo(){
        var formData = new FormData;
        formData.append('firstname', this.first);
        formData.append('secondname', this.last);
        formData.append('email', this.mail);
        formData.append('post_code', this.zip);
        formData.append('city', this.city);
        formData.append('street', this.street);
        this.$http.post('client/', formData, {emulateJSON:true}).then(function(response){
          console.log("submitted")
          this.$router.push('/kunden/')
        })
      }
    }
  }
</script>


<style lang="less" scoped>
#btn-group{
  margin-left:24em;
 }
</style>
