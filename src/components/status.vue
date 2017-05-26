<template>
   <span class="status" v-html="symbol"></span>
</template>


<script>
    export default {
    name: 'status',
    props: ['orders'],
    computed:{
        symbol: function(){
            if (this.orders.status === "R"){
                return '<p>Bereit</p>'
            }else if(this.orders.status === "IP"){
              return '<p>in Bearbeitung<p>'
            }else{
              return '<p>Abgeschlossen<p>'
            }
        }
    }
    }
</script>
