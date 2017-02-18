<template>
 <div class="details"> 
     -->{{test}}
 </div>
</template> 


<script> 
    export default{
     name: "orderdetails", 
     props: ['event'], 
//     data() { 
//        return { 
//            order:"",  
//        }
      
        methods:{ 
            get_id: function(){ 
                alert(this.props.event);
            }
        }, 
        computed:{ 
            test: function(){ 
                return this.event;
            }
        }
    }
</script> 


<style lang="less"> 
    
</style>