

var SmallMultiples = function() {
  var area, bisect, caption, chart, circle, curYear, data, format, line, margin, mousemove, mouseout, mouseover, setupScales, xScale, xValue, yAxis, yScale, yValue;

  var width = 150, height = 150;

  var margin = {
    top: 15,
    right: 10,
    bottom: 40,
    left: 35
  };

  bisect = d3.bisector(function(d) {
      return d.date;
    }).left;


  var chart = function (selection) {
    return selection.each(function(rawData) {
      var data = rawData;
      var lines;

      var div = d3.select(this)
        .selectAll(".chart")
        .data(data);

      div.enter()
        .append("div")
        .attr("class", "chart")
        .append("svg").append("g");

      var svg = div.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var g = svg
        .select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      g.append("rect")
        .attr("class", "background")
        .style("pointer-events", "all")
        .attr("width", width + margin.right)
        .attr("height", height)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

    });
  }

  return chart;
};

plotData = function(selector, data, plot) {
  return d3.select(selector).datum(data).call(plot);
};

transformData = function(rawData) {
  var format, nest;
  format = d3.time.format("%Y");
  rawData.forEach(function(d) {
    d.date = format.parse(d.year);
    return d.n = +d.n;
  });
  nest = d3.nest().key(function(d) {
    return d.category;
  }).sortValues(function(a, b) {
    return d3.ascending(a.date, b.date);
  }).entries(rawData);
  return nest;
};

$(document).ready(function() {
  var plot = SmallMultiples();

  display = function(error, rawData) {
    var data;
    if (error) {
      console.log(error);
    }

    data = transformData(rawData);
    plotData("#vis", data, plot);
    // return setupIsoytpe();
  };


  queue()
    .defer(d3.tsv, "data/askmefi_category_year.tsv")
    .await(display);

});
