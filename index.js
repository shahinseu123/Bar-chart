

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');


//append rectangle to the svg element
//one rect for each row of the dataset or for
// each entry of the data array

//render data
const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = { top:20, right:40, left:100, bottom:20 }
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
                     .domain([0, d3.max(data, xValue)])
                     .range([0, innerWidth]);

    const yScale = d3.scaleBand()
                     .domain(data.map(yValue))
                     .range([0, innerHeight])
                     .padding(0.1);
    
    const yAxis = d3.axisLeft(yScale)
    const xAxis = d3.axisBottom(xScale)

    const g = svg.append('g') //introducing a group element                 
                 .attr('transform', `translate(${margin.left}, ${margin.top})`) 
    
    yAxis(g.append('g'));    //we append another group element to the previous group to see the axis          
    xAxis(g.append('g').attr('transform', `translate(0, ${innerHeight})`))   //we append another group element to the previous group to see the axis          
             
    // g.append().call(d3.axisLeft(yScale))// shorthand of yAxis(g.append('g')); 
    // g.append().call(d3.axisBottom(xScale))

    g.selectAll('rect').data(data)//we have created our d3 data join                             //this will make a d3 selection that contains all existing rect of the page, there are none for now.this is an importent information for d3 when make a data join
       .enter().append('rect')  // at the enter selection we append rectangle
          .attr('y', d => yScale(yValue(d)))
          .attr('width', d => xScale(xValue(d)))
          .attr('height', yScale.bandwidth())
}

//select csv and foreach all data and make number
d3.csv('data.csv').then( data => {
    data.forEach(d => {
        d.population = +d.population*1000
    })
    render(data);
})
