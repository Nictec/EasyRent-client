<template> 
   <span class="status" v-html="symbol"></span>
</template> 


<script> 
    export default { 
    name: 'status', 
    props: ['orders'], 
    computed:{ 
        symbol: function(){ 
            if (this.orders.status === "ok"){ 
                return '<p>Bereit</p>'
            }else{return '<p>in Bearbeitung<p>'}
        }
    }
    }
</script>