<template>
	<div class="newShelf">
		<h1>Neues Regal</h1> 
		<div class="form">	 
			<label for="name">Name des Regals</label> 
			<br>
			<input type="text" name="name" v-model="name"> 
			<br> 
			<label for="row">Reihe</label> 
			<br> 
			<input type="number" name="row" v-model="row"> 
			<br>  
			<label for="shelf">Regal Nr.</label> 
			<br>
			<input type="number" name="shelf" v-model="sId"> 
			<br> 
			<span class="btn-blue" id="button" v-on:click="save">speichern</span> 
		</div> 
		 <div class="alert" v-show="alert">
  			<span @click="alert=false">&times;</span> <h3>Regal hinzugefügt</h3>  
		</div> 
	</div>
</template>

<script>
	export default{ 
		name:"newShelf", 
		data(){ 
			return{ 
				name:"", 
				row:"",
				sId:"", 
				alert:false,
			}
		}, 
		methods:{ 
			save:function(){ 
				console.log("started")
				var formData = new FormData(); 
				formData.append('name', this.name); 
				formData.append('row', this.row); 
				formData.append('sNr', this.sId); 
				console.log("appended") 
				this.$http.post('shelf/', formData, {emulateJSON:true}).then(function(response){ 
					console.log("submitted"); 
					this.alert = true;
				})
			}
		}
	}
</script>

<style scoped lang="less"> 
   @input-color:#dddddd; 
    h1{ 
        font-family: roboto;
    }
    
    .form{ 
        margin-left: 6em; 
        margin-top: 0.5em; 
        padding:2em 2em 2em 4em;
        width: 37em;
       
    } 
    
    .form textarea{ 
        background-color: @input-color;
        margin-bottom: 1em; 
        margin-right: 0em; 
        font-family: roboto;
    }
    
    .form input{ 
        background-color: @input-color;
        height: 3em; 
        width: 50em; 
        margin-bottom: 1em; 
        margin-right: 0em; 
/*        border-style: solid;*/
    } 
    
    form input:focus{ 
        border-color: #ff6c00;
    }
    
    .form label{ 
        font-family: roboto; 
       
    } 
    
    #lab{ 
     background-color: @input-color;
     height: 3em; 
     width: 50em; 
     margin-bottom: 1em; 
     margin-right: 0em; 
    } 
    
    #sub{ 
        margin-left:-5px; 
    } 
    
    .error{ 
    color: red; 
    font-family: roboto; 
    font-size: 11pt; 
    br{ 
      display: block; 
        margin-top: -10px
    }
    }
    .hasError{  
    border-style:solid;
    border-color: red;
    } 
    
    .file{
        position: absolute;
        font-size: 0.1px; 
        width: 0.1px; 
        height: 0.1px;
        cursor: pointer; 
        
}
    upb{ 
    max-width: 10px;
    } 

   #button{ 
   	margin-left: 33em;
    }
    
</style>

