<template>

  <!-- login modal -->
  <div id="app">
      <div class="modal" v-if="!user.authenticated">
      <div class="modal-content" :class="{wider: error}">
        <h3 id="header-text"><i class="fa fa-sign-in" aria-hidden="true"></i> EasyRent Login:</h3>
          <div class="logmod" v-show="error"><p>Benuzername oder Passwort falsch <span @click="cls">&times</span></p></div>
          <input type="text" name="username" class="top" placeholder="Benutzername" v-model="username">
          <br>
          <input type="password" name="password" placeholder="Passwort" v-model="password">
          <br>
          <span class="btn-transparent pull-right" id="sub" @click="submit" @keyup.enter="submit"><i class="fa fa-unlock-alt" aria-hidden="true"></i> login</span>
    </div>
    <p id="label">EasyRent Auftragsverwaltung</p>
  </div>
  <!-- info: section is used to blurr the background when not authenticated -->
    <section v-bind:class="{ blurred: !user.authenticated }">
        <!-- site -->
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <TopNav></TopNav>
        <MainNav class="nav"></MainNav>
        <router-view class="content"></router-view>
    </section>
    </div>
</template>

<script>
import MainNav from './components/MainNav.vue'
import TopNav from './components/TopNav.vue'
import auth from './auth.js'
import Vue from 'vue'

export default {
  name: 'app',
  components: {
      MainNav,
      TopNav,
      auth,
  },
  data(){
    return{
      user: auth.user,
      username:"",
      password:"",
      error: auth.error,
    }
  },
  methods:{
    submit(){
      auth.login(this, this.username, this.password);
    },
    cls(){
      this.error = false;
    }
  },
  computed:{
    now:function(){
    var formated = moment().format('dddd D'+". "+"MMM YYYY");
    return formated;
        }
    },
    created(){
      auth.check();
      auth.check_permissions(this)
    }
}
</script>

<style scoped>
    .content{
        padding-left: 17em;
        position: relative;
        margin-top: 0em;
        padding-top: 3em;
    }

    .nav{
     margin-top: 4em;
    }



    /*auth modal:*/

    .blurred{
      filter:blur(15px);
     }

    .modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
}

    /* Modal Content/Box */
    .modal-content {
        background-color: #484747;
        color: white;
        margin: 15% auto; /* 15% from the top and centered */
        margin-left: 30% !important;
        margin-top: 16% !important;
        padding: 20px;
        border: 1px solid #888;
        width: 40.7%; /* Could be more or less, depending on screen size */
        height: 23%;
        font-family: roboto;
        border-radius: 7px;

}
    #header-text{
      text-align: left;
      margin-top: -5px;
      border-bottom: 1px solid #888;
    }

    input{
      height: 30px;
      width: 90%;
      margin-left: 25px;
     }

     .top{
        margin-top:2em;
      }

      #sub{
        margin-right:30px;
        margin-bottom: 10px;
       }

       #label{
        font-size: 13pt;
        padding-top:5em;
        padding-left: 30px;
        }

      .logmod{
        background-color: #ff6c00;
        text-align: center;
        width:95%;
        height: 37px;
        margin-left:12px !important;
        border-radius: 7px;
         }

      .logmod p{
        padding-top: 5px;
        padding-left: 5px;
       }

      .logmod p span{
        float:right;
        padding-right: 20px;
        cursor: pointer;
       }

      .wider{
        height: 28% !important;
       }





</style>

