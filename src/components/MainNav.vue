<template> 
<div class="icon-bar">
    <router-link to="/"><i class="fa fa-tachometer" aria-hidden="true"></i></router-link> 
    <router-link to="/test"><i class="fa fa-font" aria-hidden="true"></i></router-link> 
    <router-link to="/equipment"><i class="fa fa-signal" aria-hidden="true"></router-link>
</div>
</template> 


<script> 
    export default { 
        name: 'MainNav', 
        components: { 
        
        }
    }
</script> 


<style scoped> 
    .icon-bar {
    height: 100%;
    width: 90px;
    text-align: center;
    background-color: #555;
}

.icon-bar a {
    padding: 16px;
    display: block;
    transition: all 0.3s ease;
    color: white;
    font-size: 36px;
}

.icon-bar a:hover {
    background-color: #000;
}

.active {
    background-color: #4CAF50;
}  

 .icon-bar {
        margin-left: -1em; 
        margin-top: -1em; 
        height: 48em;
    }
</style>