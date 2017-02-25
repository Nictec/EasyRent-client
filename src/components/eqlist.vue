<template>
	<span>{{equipment}}</span>
</template>

<script>
	export default{ 
		name: eqlist, 
		props: ['order'], 
		computed:{ 
			equipment(){ 
				return this.order.assignment.equipment_data.name;
			}
		}
	}
</script> 

<style>
	
</style>