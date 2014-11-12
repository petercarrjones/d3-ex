d3.json("world.geojson", createMap);
function createMap(countries) {
var aProjection = d3.geo.mercator(); #a
var geoPath = d3.geo.path().projection(aProjection); #b
d3.select("svg").selectAll("path").data(countries.features)
.enter()
.append("path")
.attr("d", geoPath) #c
.attr("d", "countries")
}
