<template>
	<div class="deleteOrder">
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
					<div class="text" id="checkbox"><span class="btn-blue" @click="giveback(assignment.quantity, assignment.equipment_data.id, index)">zurückgeben</span></div> 				
			</div>
		</div> 
		<span class="btn-red pull-right" id="button" v-on:click="del">Auftrag löschen</span> 
		<span class="btn-blue pull-right" id="button2" v-on:click="$router.push('/orders/')">abbrechen</span> 
	</div>
</template>

<script>
	export default{ 
		name:"deleteOrder", 
		data(){ 
			return{ 
				order:"", 
			}
		}, 
		methods:{ 
			giveback(quantity, id, index){ 
				this.$http.get('equipment/'+id+'/').then(function(response){ 
					var neu = response.data.avail_quantity + quantity 
					var formData = new FormData 
					formData.append('avail_quantity', neu);
					this.$http.patch('equipment/'+id+'/', formData, {emulateJSON:true}).then(function(response){ 
						this.order.assignment.splice(index, 1);
						console.log("finished")
					})
				}) 
			},
			del: function(){  
				this.$http.delete('order/'+this.orderId+'/').then(function(response){
				this.$router.push('/orders/');
			})
		}, 
		},
		computed:{ 
			orderId(){
      		return this.$route.params.order_id;
    		}, 
		}, 
		    created(){ 
    			this.$http.get('order/'+this.orderId+'/').then(function(response){ 
    			this.order = response.data;
    		})
    	}, 
	}
</script>

<style lang="less" scoped>
	#button{ 
		margin-top:30px;
	 } 

	 #button2{ 
	 	margin-top: 30px; 
	 	margin-right:-45em;
	  }
</style>