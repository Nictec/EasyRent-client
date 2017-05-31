<template>
    <div>
      <ul class="topnav" id="myTopnav">
         <li class="heading">EasyRent</li>
         <li id="date">{{now}}</li>
         <div class="usermenue">
              <li>
                <i class="fa fa-calendar" aria-hidden="true" title="Kalender anzeigen" @click="cal"></i>
              </li>
             <li>
              <i class="fa fa-sign-out" aria-hidden="true" id="logout" @click="logout" title="logout"><span>{{user.name}}</span></i>
            </li>
         </div>
      </ul>
      <div class="cal" v-show="calendar">
        <div id="calendar"></div>
      </div>
    </div>
</template>


<script>
    import moment from "moment"
    import auth from "../auth.js"
    export default {
        name: 'topnav',
        data () {
         return{
           info:"ausloggen",
           user: auth.user,
           calendar: false,
         }
        },
        computed:{
            now:function(){
               var formated = moment().format('dddd D'+". "+"MMM YYYY");
               return formated;
            }
        },
        methods: {
          logout(){
            auth.logout()
            console.log("sucessfully logged out")
          },
          cal(){
            if(this.calendar){
              this.calendar=false;
            }else{
              this.calendar=true;
              $('#calendar').fullCalendar('render');
            }
          }
        },
        ready(){
          $('#calendar').fullCalendar('render');
        }
    }
</script>


<style scoped lang=less>

.cal{
  margin-top:80px;
  margin-left:54em;
  padding-top:4em;
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: 15%;
  z-index: 10;
  background-color:#333333;
}

#calendar {
    width: 200px !important;
    margin: 0 auto !important;
    margin-top:-70px !important;
    font-size: 10px !important;
}
.fc-toolbar {
    font-size: .9em !important;
}
.fc-toolbar h2 {
    font-size: 12px !important;
    white-space: normal !important;
}
/* click +2 more for popup */
.fc-more-cell a {
    display: block !important;
    width: 85% !important;
    margin: 1px auto 0 auto !important;
    border-radius: 3px !important;
    background: grey !important;
    color: transparent !important;
    overflow: hidden !important;
    height: 4px !important;
}
.fc-more-popover {
    width: 100px !important;
}
.fc-view-month .fc-event, .fc-view-agendaWeek .fc-event, .fc-content {
    font-size: 0 !important;
    overflow: hidden !important;
    height: 2px !important;
}
.fc-view-agendaWeek .fc-event-vert {
    font-size: 0 !important;
    overflow: hidden !important;
    width: 2px !important;
}
.fc-agenda-axis {
    width: 20px !important;
    font-size: .7em !important;
}

.fc-button-content {
    padding: 0 !important;
}

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
    margin-top: -8px;
    margin-bottom: 1em;
    z-index: 1;
    position: fixed;
}

ul.topnav li {float: left;}

ul.topnav li{
    display: inline-block;
    color: #f2f2f2;
    text-align: center;
    padding: 20px 18px;
    text-decoration: none;
    margin-top: 8px;
    transition: 0.3s;
    font-size: 19px;
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
        font-family: roboto;
    }

    .usermenue{
        float:right;
        padding-right: 2em;
        cursor: pointer;
    }

    .usermenue:hover{
        color: #d6d6d6;
    }

    #date{
        padding-left:30em;
     }

     #logout span{
      font-family: roboto;
      font-size: 12pt;
      }

</style>
