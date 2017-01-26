<template> 
  <div id="app"> 
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">  
        <TopNav></TopNav>
        <MainNav class="nav"></MainNav> 
        <router-view class="content"></router-view> 
    </div>
</template>

<script>
import MainNav from './components/MainNav.vue' 
import TopNav from './components/TopNav.vue'

export default {
  name: 'app',
  components: { 
      MainNav, 
      TopNav
  }, 
 beforeCreate: function(){ 
    console.log("before")
 }
}
</script>


<style> 
    body{ 
      background-color: #524f4f; 
      color: white; 
      font-family: roboto; 
/*      overflow: hidden; */
    }
    .content{ 
        padding-left: 17em; 
        position: relative; 
        margin-top: 0em;  
        padding-top: 3em;
    } 
    
    .nav{ 
     margin-top: 4em;
    }
</style>