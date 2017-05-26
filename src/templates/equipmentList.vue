<template>
	<div class="eqlist">
		<!--<div v-for="assignment in order.assignment">{{ assignment.equipment_data.name }} </div>-->
		<form v-on:submit.prevent="remove">
			<input type="number" v-model="scanner" style="opacity:0;" autofocus="true">
		</form>
		<div class="container-fluid main">
			<div class="table-row header">
					<div class="text ">Herstelle</div>
					<div class="text">Name</div>
					<div class="text">benötigte Anzahl</div>
					<div class="text">Reihe</div>
			</div>
			<div class="table-row" v-for="(assignment, index) in order.assignment">
					<div class="text" id="fabricator">{{ assignment.equipment_data.fabricator}}</div>
					<div class="text" id="name">{{ assignment.equipment_data.name }}</div>
					<div class="text" id="quantity">{{ assignment.quantity }}</div>
					<div class="text">3</div>

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
				scanner:"",
			}
		},
		  computed: {
    		orderId(){
      		return this.$route.params.order_id
    		},


  	},
  	methods: {
  		ready: function(){
  			var status = "R"
  			var formData = new FormData;
  			formData.append('status', status)
  			this.$http.patch('order/'+this.orderId+"/", formData, {emulateJSON:true}).then(function(response){
  				console.log("status updated");
  				this.$router.push("/orders/");
  			});
  		},
			remove: function(){
				let i = this.order.assignment.map(item => item.id).indexOf(this.scanner) // find index of your object
				this.order.assignment.splice(i, 1) // remove it from array
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
