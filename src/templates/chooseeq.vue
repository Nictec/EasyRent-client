
<template>
  <div class="choose">
    <div class="container-fluid main" v-show="!loading">

      <div class="table-row header">
        <div class="wrapper text-4">
          <div class="wrapper text-2">
            <div class="text">Hersteller</div>
            <div class="text">Name</div>
          </div>
          <div class="wrapper text-2">
            <div class="text">Gesamtanzahl</div>
            <div class="text">vorhandene Anzahl</div>
          </div>
          <div class="wrapper text" id="options">
            <div class="text">Optionen</div>
          </div>
        </div>
      </div>

      <div class="table-row" v-for="equipment in equipment">
        <div class="wrapper text-4">
          <div class="wrapper text-2">
            <div class="text">{{equipment.fabricator}}</div>
            <div class="text">{{equipment.name}}</div>
          </div>
          <div class="wrapper text-2">
            <div class="text">{{equipment.max_quantity}}</div>
            <div class="text">{{equipment.avail_quantity}}</div>
          </div>
          <div class="wrapper text" id="options">
            <div class="text">
              <a class="btn-blue" id="delete" v-on:click="open(equipment.id, equipment.avail_quantity)" v-bind:title="dinfo">
                zuordnen
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <span class="btn-transparent pull-right" id="finish" @click="$router.push('/orders/')"> fertigstellen</span>

    <i  v-show="loading" class="fa fa-circle-o-notch fa-spin spinner"></i>
    <p class="spinner txt" v-show="loading">lade Daten...</p>

    <!-- modal -->
    <div id="WarningModal" class="modal" v-if="modal">

      <div class="modal-content">
        <div class="modal-header">
          <h3>Bitte Benötigte Anzahl eingeben:</h3>
          <span class="close" @click="modal = false">&times;</span>
        </div>
        <input v-model="number" type="number" id="number">
        <div class="options">
          <a class="btn-transparent" @click="choose">OK</a>
        </div>
      </div>
    </div>
    <!-- alert -->
    <div class="alert" v-show="alert">
      <span @click="alert=false">&times;</span> <h3>Item hinzugefügt</h3>
    </div>
  </div>
</template>

<script>
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

export default {
  name: 'chooseeq',
  data () {
    return {
      equipment:"",
      modal: false,
      alert: false,
      da:"",
      number: 1,
      equipment_id:"",
      filter:"L",
      loading: true,
    }
  },
  methods: {

    open: function(id, quant){
      this.modal=true;
      this.equipment_id=id;
      this.da = quant;
    },
    choose: function(){
      var equipment = this.equipment_id;
      var quantity = this.number;
      var order = this.orderId;
      if (quantity <= this.da){
        this.modal=false;
        var formData = new FormData();
        formData.append('quantity', this.number);
        formData.append('order', this.orderId);
        formData.append('equipment', this.equipment_id);
        this.$http.post('assignment/', formData, {emulateJSON:true}).then(function(response){
          console.log("successfully submitted");
        })
      }else{
        if (this.da > 1){
          var wort = "sind";
        }else{
          wort = "ist";
        };
        alert("Von diesem Equipment "+wort+" nur mehr "+this.da+" Stück vorhanden!");
      }
    },
  },
  computed: {
    orderId(){
      return this.$route.params.order_id
    },
    available(){
      return this.equipment.avail_quantity;
    }
  },

  created: function(){
    this.$http.get("equipment/")
      .then(
          function(response){
            this.equipment = response.data;
            this.loading = false;
          });

  }
}
</script>
<style lang="less" scoped>
@import "../font-awesome-4.7.0/less/font-awesome.less";
@import "../external_css/tables.less";
@import "../external_css/modals.less";
@import "../external_css/buttons.less";
@import "../external_css/alerts.less";

body{
  overflow: visible !important;
  overflow-x: hidden;
}
#add{
  float:right;
  margin-bottom: 8px;
}

    .heading{
      font-family: roboto;
    }

    #button{
      margin-top:-20px !important;
    }

    #delete{
      margin-right: 0px !important;
    }

    .spinner{
      margin-left: 40%;
      margin-top: 200px;
      font-size: 70px;
    }

    .txt{
      font-size: 20px !important;
      margin-top: 3px;
      margin-left: 39.3% !important;
      font-family: roboto;
    }

    #options{
      padding-left: 30px;
    }

    .main{
      padding-top: 2em;
      padding-bottom:1em;
    }

    #number{
      height: 30px;
      width: 100%;
      background-color:#dddddd;
      margin-top:10px;
    }

    #finish{
      margin-right: 3.5em;
    }

    #WarningModal{
      height: 45em;
    }

</style>
