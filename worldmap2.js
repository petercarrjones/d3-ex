queue()
.defer(d3.json, "world.geojson")
.defer(d3.csv, "cities.csv")
.await(function(error, file1, file2) { createMap(file1, file2);});

function createMap(countries, cities) {
var width = 500;
var height = 500;

var projection = d3.geo.mollweide()
.scale(120) 
.translate([width / 2, height / 2])

var geoPath = d3.geo.path().projection(projection);
var featureSize = d3.extent(countries.features,

function(d) {return geoPath.area(d)});
var countryColor =
d3.scale.quantize().domain(featureSize).range(colorbrewer.Reds[7]); 


d3.select("svg").selectAll("path").data(countries.features)
.enter()
.append("path")
.attr("d", geoPath)
.attr("class", "countries")
.style("fill", function(d) {return countryColor(geoPath.area(d))}) 	


d3.select("svg").selectAll("circle").data(cities)
.enter()
.append("circle")

.attr("class", "cities")
.attr("r", 3)
.attr("cx", function(d) {return projection([d.x,d.y])[0]})
.attr("cy", function(d) {return projection([d.x,d.y])[1]})

d3.selectAll("path.countries")
.on("mouseover", centerBounds)
.on("mouseout", clearCenterBounds)
function centerBounds(d,i) {
var thisBounds = geoPath.bounds(d);
var thisCenter = geoPath.centroid(d); 
d3.select("svg")
.append("rect")
.attr("class", "bbox")
.attr("x", thisBounds[0][0]) 
.attr("y", thisBounds[0][1])
.attr("width", thisBounds[1][0] - thisBounds[0][0])
.attr("height", thisBounds[1][1] - thisBounds[0][1])
d3.select("svg")
.append("circle")
.attr("class", "centroid")
.attr("r", 5)
.attr("cx", thisCenter[0]).attr("cy", thisCenter[1]) 
.style("pointer-events", "none")
}
function clearCenterBounds() { 
d3.selectAll("circle.centroid").remove();
d3.selectAll("rect.bbox").remove();
}
