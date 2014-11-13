queue()
.defer(d3.json, "world.geojson")
.defer(d3.csv, "cities.csv")
.await(function(error, file1, file2) { createMap(file1, file2); });


/d3.json("world.geojson", createMap);/
function createMap(countries, cities) {
 var width = 500; 
 var height = 500;

 var aProjection = d3.geo.mercator() 
  .scale(120) 
  .translate([width / 2, height / 2])

var geoPath = d3.geo.path().projection(aProjection); 
d3.select("svg").selectAll("path").data(countries.features)
.enter()
.append("path")
.attr("d", geoPath) 
.attr("d", "countries")
.style("fill", "gray") 

d3.select("svg").selectAll("circle").data(cities) 
.enter()
.append("circle")
.style("fill", "red")
.attr("class", "cities")
.attr("r", 3)
.attr("cx", function(d) {return projection([d.x,d.y])[0]}) 
.attr("cy", function(d) {return projection([d.x,d.y])[1]})

}
