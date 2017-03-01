<template>
	<div class="eqlist">  
		<!--<div v-for="assignment in order.assignment">{{ assignment.equipment_data.name }} </div>--> 
		<div class="container-fluid main">
			<div class="table-row header"> 
					<div class="text ">Herstelle</div>
					<div class="text">Name</div> 
					<div class="text">benötigte Anzahl</div>
					<div class="text">Optionen</div> 
			</div> 
			<div class="table-row" v-for="(assignment, index) in order.assignment"> 
					<div class="text" id="fabricator">{{ assignment.equipment_data.fabricator }}</div> 
					<div class="text" id="name">{{ assignment.equipment_data.name }}</div> 
					<div class="number" id="quantity">{{ assignment.quantity }}</div> 
					<div class="text" id="checkbox"><input type="checkbox" v-model="checked"></div> 				
			</div>
		</div>    
		<button class="btn-blue pull-right" id="submit" v-on:click="ready">Auftrag freigeben</button> 
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
  		ready: function(){  
  			var status = "ok" 
  			var formData = new FormData; 
  			formData.append('status', status) 
  			this.$http.patch('order/'+this.orderId+"/", formData, {emulateJSON:true}).then(function(response){ 
  				console.log("status updated"); 
  				this.$router.push("/orders/");
  			});
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
	 	margin-right: -2.5em;
	  } 

	  #quantity{ 
	  	margin-right: 6em;
	   } 

	  #submit{ 
	  	margin-right:50px;  
	  	border:none;
	   } 

	   #name{ 
	   	margin-left: -2em;
	    }

</style>