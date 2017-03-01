<template>
	<div class="shelf"> 
		<router-link to="/new-shelf" class="btn-transparent pull-right" id="button">Regal Hinzufügen</router-link>
		<div class="container-fluid main">
			<div class="table-row header">
				<div class="wrapper text-4">
					<div class="text">Name</div> 
					<div class="text">Reihe</div> 
					<div class="text">Regal Nr.</div> 
					<div class="text">Optionen</div>
				</div>
			</div> 
			<div class="table-row" id="row" v-for="shelf in shelf">
				<div class="wrapper text-4">
					<div class="text">{{shelf.name}}</div> 
					<div class="text">{{shelf.row}}</div> 
					<div class="text">{{shelf.sNr}}</div> 
					<div class="text"><span class="btn-red" @click="open(shelf.id, shelf.name)"><i class="fa fa-trash" aria-hidden="true"></i></span></div>
				</div>
			</div>
		</div> 
		<div id="WarningModal" class="modal" v-if="modal">
    		<div class="modal-content"> 
    			<div class="modal-header"> 
        			<h3>Warnung</h3> 
       				 <span class="close" @click="modal = false">&times;</span>
    			</div> 
    			<bold>{{ modal_text }}</bold> 
    			<div class="options"> 
        			<a class="btn-blue" @click="modal = false">Abbrechen</a> 
       				<a class="btn-red" @click="del()">Löschen</a> 
    			</div>
			</div>
  		</div> 
	</div>
</template>

<script>
	export default{ 
		name: "shelfs",
	
	data(){  
		return{
		shelf:[], 
		modal:false, 
		modal_text:"", 
		id: "" 
		}
	}, 
	methods:{ 
		del: function(){ 
			this.$http.delete("shelf/"+this.id+"/").then(function(response){ 
				this.modal=false; 
				this.$http.get("shelf/").then(function(response){ 
				this.shelf = response.data;
				})
			})
		}, 

		open: function(id, name){ 
			this.modal_text='Wollen sie das Regal "'+name+'" wirklich löschen?'
			this.modal=true; 
			this.id = id; 
		}
	},

	created:function(){ 
		this.$http.get("shelf/").then(function(response){ 
			this.shelf = response.data;
		})
	}, 
}
</script>

<style lang="less" scoped>
	#row{ 
		height:37px;
	 } 

	 #button{ 
	 	margin-top:2em;
	  }
</style>