<template>
	<div class="eqlist">  
		<!--<div v-for="assignment in order.assignment">{{ assignment.equipment_data.name }} </div>--> 
		<div class="container-fluid main">
			<div class="table-row header"> 

				<div class="text ">Herstelle</div>
				<div class="text">Name</div>
				<div class="text">Optionen</div>
			</div> 
			<div class="table-row" v-for="(assignment, index) in order.assignment">
					<div class="text" id="fabricator">{{ assignment.equipment_data.fabricator }}</div> 
					<div class="text">{{ assignment.equipment_data.name }}</div> 
					<div class="text" id="checkbox"><input type="checkbox" v-model="checked"></div> 				
			</div>
		</div>    
		<button class="btn-blue pull-right" id="submit" @click="test" :disabled="button">Auftrag freigeben</button> 
	</div>
</template> 

<script> 
	import moment from 'moment'
	export default{ 
		name: "equipment-list",
		data(){ 
			return{ 
				order:"", 
			}
		}, 
		  computed: {
    		orderId(){
      		return this.$route.params.order_id
    		}, 


  	}, 
  	methods: { 
  		test: function(){ 
  			alert("Hello")
  		}
  	}, 
  	created:function(){ 
  		this.$http.get('order/'+this.orderId+"/").then(function(response){ 
  			this.order = response.data;
  		})
  	} 
}
</script>

<style>
	.main{ 
		margin-top: 2em;
	 } 

	 #checkbox{ 
	 	margin-left: 4em;
	  } 

	  #submit{ 
	  	margin-right:50px;  
	  	border:none;
	   }
</style>