<template>
	<div class="details">
		<h1 class="Heading">Details zum Auftrag {{order.name}}</h1> 
		<div class="data">
			<h4 class="Heading">Art der Veranstaltung:</h4> 
			{{type}} 
			<h4 class="Heading">Abholdatum:</h4> 
			{{sdate}} 
			<h4 class="Heading">Rückgabedatum:</h4> 
			{{edate}} 
			<h4 class="Heading">Gästeanzahl:</h4> 
			{{order.GuestNumber}} 
			<h4 class="Heading">Beschreibung:</h4> 
			<p class="description">{{order.description}}</p> 
			<h4 class=Heading>Ort der Veranstaltung:</h4> 
			  <map :center=order.city :zoom="7"></map>
			
		</div>
	</div>
</template>

<script> 
	import {load, Map, Marker} from 'vue-google-maps' 
	import moment from 'moment' 
	// moment.locale("en");

	export default{ 
		name: "details", 
		components:{ 
			Map
		}, 
		data(){ 
			return{ 
				order:[],
			}
		}, 
		methods:{ 

		}, 

		  computed: {
    		orderId(){
      		return this.$route.params.order_id 
    		}, 
    		type(){ 
    			if (this.order.Type === "R"){ 
    				return "Rental only"
    			} else{ 
    				return "Full Service"
    			}
    		}, 
    		sdate(){ 
    			var dbdate = this.order.dateStart; 
    			var formated = moment(dbdate).format('dddd D'+". "+"MMM YYYY"); 
    			return formated;
    		}, 

    		edate(){ 
    			var dbdate = this.order.dateEnd; 
    			var formated = moment(dbdate).format('dddd D'+". "+"MMM YYYY"); 
    			return formated;
    		} 
    	},

        created: function(){ 
            this.$http.get("order/"+this.orderId+"/").then(function(response){ 
                this.order = response.data;  
            }) 
            load({
    			'key': 'AIzaSyCWZVcYSMx3QQ3PBXMMh3BxQmSipWL0SZo', 
    			'libraries': 'places', 

		})
	} 
}

</script>

<style lang="less" scoped> 
body{ 
	overflow-y: scroll !important;
 }
.Heading{ 
	color:#db6900;
 }
 .description{ 
 	padding-right: 10px; 
 	text-align: left;
  }
</style>