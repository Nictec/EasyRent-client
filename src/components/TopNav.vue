<template> 
     <ul class="topnav" id="myTopnav"> 
         <li class="heading">EasyRent</li> 
         <div class="usermenue"> 
             <li v-on:click="cInfo()"><a>User</a></li>
         </div> 
     </ul>
</template> 


<script> 
    export default { 
        name: 'topnav', 
        data () { 
         return{ 
           
         }
        }, 
        methods: { 
            cInfo: function(){ 
                console.info('this will be the usermenue')
            }
        }
    }
</script> 


<style scoped> 
     ul.topnav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333; 
    width: 101.9%; 
    height: 4em;
    margin-left: -0.5rem; 
    margin-right: -15rem;  
    margin-top: -10px; 
    margin-bottom: 1em;
} 

ul.topnav li {float: left;} 
    
ul.topnav li{
    display: inline-block;
    color: #f2f2f2;
    text-align: center;
    padding: 20px 18px; 
    text-decoration: none;
    transition: 0.3s;
    font-size: 17px;
    font-family: Roboto;
}

/* Change background color of links on hover */
ul.topnav li a:hover {background-color: #555;}

/* Hide the list item that contains the link that should open and close the topnav on small screens */
ul.topnav li.icon {display: none;} 

/* When the screen is less than 680 pixels wide, hide all list items, except for the first one ("Home"). Show the list item that contains the link to open and close the topnav (li.icon) */
@media screen and (max-width:680px) {
  ul.topnav li:not(:first-child) {display: none;}
  ul.topnav li.icon {
    float: right;
    display: inline-block;
  }
} 
 
    .router-link{ 
        background-color: #555;
    } 
    .heading{ 
        font-size: 30px;
    } 
    
    .usermenue{ 
        float:right; 
        padding-right: 1em;
    }
</style>