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
      <label for="email">E-Mail Adresse</label>
      <br>
      <input type="email" name="email" v-model="mail">
      <br>
      <label for="zip">Postleitzahl</label>
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
      <br>
      <span class="btn-transparent" id="but" @click="$router.push('/kunden/')">abbrechen</span>
      <span class="btn-transparent" @click="save">speichern</span>
    </div>
      <div class="alert" v-show="alert">
        <span @click="alert=false">&times;</span> <h3>Kunde hinzugefügt</h3>
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
          console.log("submitted");
          this.alert = true;
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #but{
    margin-left: 24em;
   }
</style>
