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
			<div class="col">
			<h4 class="Heading">Beschreibung:</h4>
			<p class="description">{{order.description}}</p>
			<h4 class="Heading">Adresse der Veranstaltung:</h4>
				<span id="adrData"><span class="sub">Ort:</span> {{order.city}}  <span id="street"><span class="sub">Straße und Nummer:</span> {{order.street}}
				</span></span>
				<h4 class=Heading>Equipment: </h4>
				<span class="btn-transparent" @click="$router.push('/equipment-list/'+orderId+'/')">benötigtes Equipment anzeigen</span>
			</div>

		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	// moment.locale("en");

	export default{
		name: "details",
		components:{
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

      methods:{
      },

        created: function(){
            this.$http.get("order/"+this.orderId+"/").then(function(response){
                this.order = response.data;
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

  .col{
  	margin-left:20em;
  	margin-top: -17em;
   }

   #street{
   		padding-left:15px;

    }

    .sub{
    	font-weight: bolder !important;
    	font-size: 20px;
     }

    #adrData{
    	font-size: 18px;
     }
</style>
