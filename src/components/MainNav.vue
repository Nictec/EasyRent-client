<template>
    <div class="sidenav" id=mySidenay>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/orders/"><i class="fa fa-cubes" aria-hidden="true"></i> Aufträge</router-link>
        <span @click="open"><i class="fa fa-server" aria-hidden="true"></i> Logistik <i class="fa fa-caret-down" aria-hidden="true"></i>
</span>
        <div class="dropdown" v-if="dropdown">
            <router-link to="/equipment/"><i class="fa fa-microphone" aria-hidden="true"></i> Equipment</router-link>
            <router-link to="/regale/"><i class="fa fa-server" aria-hidden="true"> Regale</i></router-link>
        </div>
        <router-link to="/clients"><i class="fa fa-users" aria-hidden="true"></i> Kunden</router-link>
        <router-link to="/settings/" v-if="user.is_staff"><i class="fa fa-cogs" aria-hidden="true"></i> Einstellungen</router-link>
        </div>

</template>


<script>
  import auth from '../auth.js'
    export default {
        name: 'MainNav',
        data(){
            return{
                dropdown: false,
                user: auth.user,
            }
        },
        methods:{
            open: function(){
                   this.dropdown = !this.dropdown;
            }
        }
    }
</script>


<style lang="less" scoped>
    @color: #333333;
  /* The side navigation menu */
.sidenav {
    height: 110%; /* 100% Full-height */
    width: 13em;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin-left: -10px;
    background-color: @color; /* Black*/
    border: solid;
    border-right: none;
    border-width: 1.5px;
    border-color: white;
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

.sidenav span{
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

 .sidenav span:hover{
    color: #f1f1f1;
    cursor: pointer;
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

    @media screen and (max-width: 1356px) {
        .sidenav {width: 9em;}
    }

 .dropdown a{
    border:none !important;
    font-size: 16px;
    padding-left:50px;
  }

  .dropdown{
    border-bottom:solid;
    border-width: 1.5px;
    color: #818181;
   }

   .fa-caret-down{
        padding-left:110px;
    }
</style>
