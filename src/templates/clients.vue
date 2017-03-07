<template>
	<div class="clients">
    <span class="btn-blue pull-right" id="button" @click="$router.push('/newclient/')">Kunde Hinzufügen</span>
		<div class="container-fluid main">
			<div class="table-row header">
				<div class="text">Vorname</div>
				<div class="text">Nachname</div>
				<div class="text">Optionen</div>
			</div>
			<div class="table-row" v-for="client in client">
				<div class="text" id="FN">{{client.firstname}}</div>
				<div class="text" id="SN">{{client.secondname}}</div>
				<div class="text"><span class="btn-red"><i class="fa fa-trash-o" aria-hidden="true"></i></div></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"clients",
		data(){
			return{
			client:"",

			}
		},
		created(){
			this.$http.get('client/').then(function(response){
			 	this.client = response.data;
			 	console.log("getted");
			})
		}
	}
</script>

<style lang="less" scoped>
  #button{
    margin-top: 2em;
   }
</style>
