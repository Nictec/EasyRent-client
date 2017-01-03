<template> 
<div class="sidenav" id=mySidenay>
    <router-link to="/"><i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard</router-link> 
    <router-link to="/test">Test</router-link> 
    <router-link to="/equipment">Equipment</router-link>
</div> 
</template> 


<script> 
    export default { 
        name: 'MainNav', 
    }
</script> 


<style scoped> 
  /* The side navigation menu */
.sidenav {
    height: 100%; /* 100% Full-height */
    width: 250px;
    position: fixed;  
    z-index: 1; 
    top: 0;
    left: 0;
    background-color: #ffffff; /* Black*/ 
    border: solid; 
    border-width: 1.5px; 
    border-top: none;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 25px; /* Place content 25px from the top */
}

/* The navigation menu links */
.sidenav a {
    padding: 8px 8px 8px 32px; 
    text-decoration: none;
    font-size: 18px; 
    font-family: roboto; 
    border-bottom: solid; 
    border-width: 1.5px; 
    color: #818181;
    display: block;
    transition: 0.3s
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover, .offcanvas a:focus{
    color: #f1f1f1;
} 
/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
}
</style>