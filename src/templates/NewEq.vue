<template> 
<div class="NewEq">
<h1>Equipment hinzufügen</h1> 
<div class="alert" v-show="alert_open">
  <span @click="alert_open=false">&times;</span> <h3>{{ alert }}</h3>  
</div> 
 <div class="form"> 
     <label for="name">Name</label> 
     <br> 
     <input type="text" name="name" v-model="name" v-bind:class="{hasError: errors.name}">
       <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span> 
     <br> 
     <label for="fabricator">Hersteller</label> 
     <br> 
     <input type="text" name="fabricator" v-model="fabricator" v-bind:class="{hasError: errors.fabricator}"> 
     <br> 
     <label for="storeplace">Regal</label> 
     <br> 
     <select name="shelf" id="lab" v-model=storeplace v-bind:class="{hasError: errors.storeplace}">
       <option v-bind:value=shelf.id v-for="shelf in shelf">{{shelf.name}}</option>  
     </select> 
       <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span>  
     <br> 
     <label for="labor">Gewerk</label> 
     <br> 
     <select name="labor" id="lab" v-model="labor" v-bind:class="{hasError: errors.labor}"> 
      <option value="L">Licht</option> 
      <option value="T">Ton</option> 
      <option value="R">Rigging</option>
     </select> 
       <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span>  
     <br> 
     <label for="pic">Bild</label> 
     <br> 
     <input type="file" name="pic" ref=image>   
     <br> 
     <label for="max_quantity">Bestand</label> 
     <br>
     <input type="number" name="max_quantity" v-model="max_quantity"> 
     <br>
     <label for="description">Beschreibung</label> 
     <br> 
     <textarea name="description" cols="72" rows="10" v-model="description">
     </textarea>
     <br> 
     <span v-on:click="save(e)" class="btn-transparent top-space" id="sub">Speichern</span> 
     <span v-on:click="saveandgo()" class="btn-transparent">Speichern und schließen</span> 
     <span @click="abort()" class='btn-transparent'>abbrechen</span> 
 </div> 
</div>
</template> 


<script> 
    export default { 
        name: 'equipment', 
        data() { 
        return { 
        alert:"", 
        alert_open: false,
        name:"", 
        fabricator:"", 
        storeplace:"", 
        labor:"", 
        image:"",
        max_quantity:"", 
        status:"im Lager", 
        shelf:{}, 
        description:"",
        errors:{}, 
        tester:"",
        errorMessage: "Dieses Feld darf nicht leer sein.",
        }
    }, 
    methods: { 
        save: function(){
            var files = this.$refs.image.files; 
            this.tester = files;
            var formData = new FormData(); 
            formData.append('Image', files[0]);
            formData.append('name', this.name); 
            formData.append('fabricator', this.fabricator); 
            formData.append('storeplace', this.storeplace); 
            formData.append('labor', this.labor); 
            formData.append('max_quantity', this.max_quantity); 
            formData.append('status', this.status); 
            formData.append('shelf', this.shelf); 
            formData.append('beschreibung', this.description); 
//            formData.append('Image', this.Image);
            this.$http.post('equipment', formData,{emulateJSON: true}).then(function(response){ 
            this.errors = [];
            console.log("submit successfull"); 
            this.name=""; 
            this.fabricator=""; 
            this.storeplace=""; 
            this.labor=""; 
            this.max_quantity=""; 
            this.description="";
            this.alert="Erfolgreich gespeichert"; 
            this.alert_open = true;
            console.log("form cleared");
            },function(response){ 
                this.errors = response.data;
                console.log(this.errors)
            }) 
           
        
        }, 
        saveandgo: function(){ 
            var formData = new FormData(); 
            formData.append('name', this.name); 
            formData.append('fabricator', this.fabricator); 
            formData.append('storeplace', this.storeplace); 
            formData.append('labor', this.labor); 
            formData.append('max_quantity', this.max_quantity); 
            formData.append('status', this.status); 
            formData.append('shelf', this.shelf); 
            formData.append('beschreibung', this.description);
            this.$http.post('equipment', formData,{emulateJSON: true}).then(function(){ 
//                console.log("submit successfull"); 
            this.$router.push('/equipment');
            }, function(response){
                this.errors = response.data;
            }) 
            
        }, 
        clearForm: function(){ 
            this.name=""; 
            this.fabricator=""; 
            this.storeplace=""; 
            this.labor=""; 
            this.max_quantity=""; 
            console.log("form cleared");
        }, 
        abort: function(){ 
            this.$router.push('/equipment');
        }
    },
    created: function(){ 
        this.$http.get("shelf").then(function(response){
         this.shelf = response.data;                                       })
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
    
</style>