// svg container
var svgHeight = 600;
var svgWidth = 800;

// margins
var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
}

// chart size
var chartHeight = svgHeight - margin.left - margin.right;
var chartWidth = svgWidth - margin.top - margin.bottom;

// prepare svg
var svg = d3.select("#scatter").append("svg").attr("height", svgHeight).attr("width", svgWidth)
var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

// draw axis label
    // y axis

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("font-size", "22px")
        .attr("y", 0 - margin.left - 5)
        .attr("x", 0 - chartHeight/2 -margin.top - 10)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)")

    // x axis
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth/2-margin.left}, ${chartHeight + margin.top -10})`)
        .attr("font-size", "22px")
        .attr("class", "axisText")
        .text("In Poverty (%)")

d3.csv("./assets/data/data.csv").then(function(healthData){

    healthData.forEach(function(data){
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    // draw x axis
    var xScale = d3.scaleLinear()
        .domain([8, d3.max(healthData, d => d.poverty)])
        .range([0, chartWidth])
    
    var xAxis = d3.axisBottom(xScale);

    // draw y axis
    var yScale = d3. scaleLinear()
    .domain([4, d3.max(healthData, d => d.healthcare)])
    .range([chartHeight, 0]);
    
    var yAxis = d3.axisLeft(yScale);



    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);   


    chartGroup.append("g")
        .call(yAxis);

    
    // draw circles
    var circlesGroup = chartGroup.selectAll("circle").data(healthData).enter()

    circlesGroup.append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "skyblue")
        
    
    circlesGroup.append("text")
        .attr("font-size","10px")
        .attr("x", d => xScale(d.poverty)-6)
        .attr("y", d => yScale(d.healthcare)+4)
        .attr("fill", "white")
        .text(d => d.abbr)

})

