<template>
	<div id="map" style="width: 320px; height: 480px;"></div>

</template>

<script> 
  var geocoder;
  var map;

	export default{ 
		name:"g_maps", 
		props:['city','street'], 
		data(){ 
			return{ 
				
			}
		}, 
		created:function(){ 
			geocoder = new google.maps.Geocoder(); 
			var latlng = new google.maps.LatLng(-34.397, 150.644); 
			 var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);




		}
	}
</script>

<style lang="less" scoped>
	
</style>