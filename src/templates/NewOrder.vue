<template>
    <div class="neworder"> 
     <h1>Grunddaten</h1>
      <div class="Form"> 
          <label for="name">Name des Auftrages</label>
          <br> 
          <input type="text" name="name" v-model="name" placeholder="name"> 
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span>
          <br>  
           <label for="date">Beginn des Auftrages</label> 
          <br> 
          <input type="date" name="date" v-model="dateStart">
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span> 
          <br> 
          <label for="dateEnd">Ende des Auftrages</label>  
          <br> 
          <input type="text" name="dateEnd" v-model=dateEnd placeholder="end datum" id="additionalBtn"> 
           <span class="btn-blue small square" id="chose"> 
              <i class="fa fa-calendar" aria-hidden="true"></i>
          </span> 
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span> 
          <br> 
          <label for="Type">Art des Auftrages</label> 
          <br> 
          <select name="Type" v-model="Type">
              <option value="R">Rental</option> 
              <option value="FS">Full Service</option>
          </select> 
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span> 
          <br> 
          <!--Optional form fields--> 
          <transition name="moveIn">
          <div v-if="form_extended"> 
          <label for="city">Ort der Veranstaltung</label> 
          <br> 
          <input type="text" name="city" v-model="city" placeholder="ort"> 
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span>
          <br> 
          <label for="street">Straße</label> 
          <br> 
          <input type="text" name="street" v-model="street"> 
          <br> 
          <label for="GuestNumber">Anzahl der Gäste</label> 
          <br> 
          <input type="number" name="GuestNumber" v-model=GuestNumber placeholder="Gästeanzahl"> 
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span> 
          <br>  
          </div> 
          </transition>
          
          <label for="client">Kunde (KundenNr)</label> 
          <br> 
          <input type="number" name="client" v-model="client" placeholder="Kundennummer" id="additionalBtn">
          <span class="btn-blue small square" id="chose" @click="client_add()"><i class="fa fa-user-plus" aria-hidden="true"></i>
          </span> 
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span>
          <br> 
          <label for="description">Beschreibung/Anmerkungen</label> 
          <br> 
          <textarea name="description" id="" cols="30" rows="10" placeholder="Beschreibung" v-model="description"></textarea> 
          <span v-if="errors.name" class="error">
           <br>
           {{errorMessage}}
       </span> 
      </div> 
      <span class="btn-blue next" @click="save">
            weiter <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </span> 
      <div class="modal" v-if="client_modal"> 
          <div class="modal-content"> 
             <p @click="client_modal = false">&times;</p>
              <table class="darker"> 
                  <tr> 
                      <th>Vorname</th> 
                      <th>Nachname</th> 
                      <th>Optionen</th>
                  </tr> 
                  <tr v-for="clientlist in clientlist"> 
                      <th>{{clientlist.firstname}}</th> 
                      <th>{{clientlist.secondname}}</th> 
                      <th><span class="btn-blue" @click="choose(clientlist.id)">Auswählen</span></th>
                  </tr>
              </table>
          </div>
      </div> 
    </div>
</template> 


<script> 
    
    export default{  
        name: "neworder",
        components:{ 
         
        }, 
        data(){ 
            return{ 
                name:"",
                Type:"R", 
                city:"", 
                street:"", 
                dateStart:"", 
                dateEnd:"",
                GuestNumber:"", 
                description:"", 
                status:"notOK", 
                street:"",
                client:"",
                client_id:"",
                clientlist:"", 
                client_modal:false, 
                errorMessage: "Dieses Feld darf nicht leer sein",
                errors:{}, 
            }
        }, 
        methods:{ 
            
         client_add: function(){ 
         this.$http.get("clients/all").then(function(response){
         this.clientlist = response.data;}); 
         this.client_modal=true;
         },
         choose: function(id){ 
            this.client = id; 
            this.client_modal = false;
         }, 
         save: function(){ 
            var formData = new FormData(); 
            formData.append('name', this.name);
            formData.append('Type', this.Type);
            formData.append('city',this.city);
            formData.append('street',this.street);
            formData.append('dateStart',this.dateStart); 
            formData.append('dateEnd',this.dateEnd); 
            formData.append('GuestNumber', this.GuestNumber);
            formData.append('status', this.status);
            formData.append('client', this.client); 
            formData.append('description', this.description); 
            this.$http.post('order/', formData, {emulateJSON: true}).then(function(response){
                this.errors = []; 
                console.log("submit successfull"); 
                this.$router.push("/choose-eq/"+response.data.id);
            },function(response){
                this.errors=response.data; 
                console.log(this.errors);
            })
         }   
    
        },
        computed:{ 
            form_extended: function(){ 
                if (this.Type == "FS"){ 
                    return true;
                }else {return false;} 
            }
        }, 
        created:function(){ 
            this.$http.get("client/").then(function(response){
                this.clientlist = response.data;
            })
        }
    }
</script> 


<style lang="less" scoped> 
    @font: roboto; 
    @form_height: 3em;
    
    .Form{ 
        margin-top: 3em; 
        margin-left: 15em; 
        font-family: @font; 
        margin-bottom: 1em;
    } 
    
    #input{ 
        width: 50em; 
        margin-bottom: 1em;
    }
    
    .Form input{ 
      #input; 
      height: @form_height;
    } 
    
    .Form textarea{ 
        #input;
    } 
    
    .Form select{ 
        #input;
    }
    
    #additionalBtn{ 
        width: 46.3em !important;
    }
    
    #chose{ 
        font-size:15px !important; 
        margin-left: -5px; 
        padding-top:10px !important; 
        padding-bottom: 13px !important; 
        padding-right: 12px !important; 
        padding-left: 12px !important;
    } 
    .modal-content{ 
        background-color: white !important; 
        color:black; 
        height: auto;
        min-height: 9px; 
        max-height: 220px; 
        overflow-y: scroll; 
    } 
    
    .modal-content p{ 
        margin-top: -10px; 
        margin-bottom: 2px;
        float: right; 
        font-weight: bolder;
    } 
    
    .moveIn-leave-active,
    .moveIn-enter{ 
        -webkit-transition: max-height 5s; 
        -moz-transition: max-height 5s; 
        -ms-transition: max-height 5s; 
        -o-transition: max-height 5s; 
        transition: max-height 5s;  
        overflow: hidden; 
        max-height:125px;
    } 
    .moveIn-enter, 
    .moveIn-leave-to{ 
        height: 0;
    } 
   
    label{ 
        font-family: @font;
    } 

    hr{ 
    margin-left: -25em;
    } 
    
    .next{ 
        margin-left: 58em; 
    }
</style>