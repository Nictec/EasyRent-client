<template>
   <div class="dashboard-content">
    <div class="thumbnail-wrapper">
        <div class="thumbnail edge"><div>Aufträge heute:</div></div>
        <div class="thumbnail"><div>neue Reservierungen:</div></div>
    </div>
    <div id='calendar' class="cal"></div>
   </div>
</template>


<script>
    export default {
        name: 'dashboard',
        data() {
        return{
          orders_today:"",
        }},
        }
</script>


<style lang="less" scoped>
    .thumbnail{
        background-color: orange;
        margin-top: 3em;
        width: 12em;
/*        border: solid;*/
        padding-top: 0.9em;
        padding-bottom: 3em;
        border-radius: 7px;
        margin-right: 30px;
        float: right;
        position:relative;
        div{
            padding-left: 10px;
            border-bottom: solid white;
            padding-bottom: 0.4em;
            width:14.4rem;
          }
        }
    .edge{
        margin-right: 29em;
    }
    .cal{
      margin-right: 50px;
    }
</style>
