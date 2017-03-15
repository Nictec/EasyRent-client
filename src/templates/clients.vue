<template>
	<div class="clients">
    <span class="btn-transparent pull-right" id="btn" @click="($router.push('/new-client/'))">neuer Kunde</span>
		<div class="container-fluid main">
			<div class="table-row header">
				<div class="text">Vorname</div>
				<div class="text">Nachname</div>
				<div class="text">Optionen</div>
			</div>
			<div class="table-row" v-for="(client, index) in client">
        <div class="wrapper text-2">
				  <div class="text" id="FN">{{client.firstname}}</div>
				  <div class="text" id="SN">{{client.secondname}}</div>
        </div>
        <div class="wrapper text-2">
				  <div class="text"><span class="btn-red" @click="opn(client.id, index)" id="delete"><i class="fa fa-trash-o" aria-hidden="true"></i></span></div>
           <div class="text"><span class="btn-blue" @click="$router.push('/client/'+client.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></span></div>
        </div>
			</div>
		</div>

      <i  v-show="loading" class="fa fa-circle-o-notch fa-spin spinner"></i>
      <p class="spinner txt" v-show="loading">lade Daten...</p>

      <div id="WarningModal" class="modal" v-if="modal_open">

        <div class="modal-content">
        <div class="modal-header">
          <h3>Warnung</h3>
          <span class="close" @click="modal_open= false">&times;</span>
        </div>
      <bold>Wollen Sie den Kunden wirklich entfernen?</bold>
      <div class="options">
          <a class="btn-blue" @click="modal_open=false">Abbrechen</a>
          <a class="btn-red" @click="del()">Löschen</a>
      </div>
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
      modal_open:false,
      loading: true,
      cid:"",
      cindex:"",

			}
		},
    methods:{
      opn(id, index){
        this.modal_open=true;
        this.cid = id;
        this.cindex = index;
      },

      del(){
        this.$http.delete('client/'+this.cid+'/').then(function(response){
          console.log('deleted');
          this.client.splice(this.cindex);
          this.modal_open = false;
        })
      }
    },
		created(){
			this.$http.get('client/').then(function(response){
			 	this.client = response.data;
        this.loading = false;
			})
		}
	}
</script>

<style lang="less" scoped>
#btn{
  margin-top: 2em;
  margin-right: 3.5em;
 }

#delete{
  margin-left:130px;
}
</style>
