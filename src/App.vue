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
  }
}
</script>


<style scoped> 
    .content{ 
        padding-left: 17em; 
        position: relative; 
        margin-top: 0em;
    } 
    
    .nav{ 
     margin-top: 3.8em;
    }
</style>