d3.json("data/samples.json").then((name_data) => {
    var names = name_data.names;
    console.log(names)
    select_sub = d3.select("#selDataset");
    for (const [key,value] of  Object.entries(names)){
        select_sub.append("option").text(value).attr("value", value);
        };
});
function plotme(){
// Get select option value
    var sel = document.getElementById('selDataset');
var selvar = sel.options[sel.selectedIndex].value

d3.json("data/samples.json").then((data) => {
    
    var samples_data = data.samples;
    var samp_arr = samples_data.filter(sampleobj => sampleobj.id == selvar);
    var result = samp_arr[0]

    var sample_id = result.otu_ids;
    var sample_label = result.otu_labels;
    var sample_val = result.sample_values;


 //Demographics
    var metadata = data.metadata;
    var subject = metadata.filter(sampleobject => sampleobject.id == selvar);
    var first_entry= subject[0]
    var demo_body = d3.select("#sample-metadata");
    // clear the old data content to make room for the new searched content
    var clearbody = document.getElementById("sample-metadata");   
    while(clearbody.hasChildNodes())
    {
        clearbody.removeChild(clearbody.firstChild);
    };
    for (const [key,value] of  Object.entries(first_entry)){
    demo_body.append("p").text(`${key}: ${value}`);
    };

    //  Trace for bar chart
    var bartrace = {
        x:sample_val.slice(0,10),
        y:sample_id.slice(0, 10).map(otuID => `otu ${otuID}`),
        text:sample_label.slice(0,10),
        type:"bar",
        orientation:"h",
        sort: 'descending'
    };
  
    // Turn data to array
    var data = [bartrace];
  
    // Define the plot layout
    var barlay = {
        margin: { t: 0, l: 150 },
        yaxis:{
            autorange:'reversed'
        }
    };
  
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, barlay );


    // Trace for bubble
    var bubbletrace = {
        x:sample_id,
        y:sample_val,
        text:sample_label,
        marker:{
            color:sample_id,
            size: sample_val,
        },
        mode: "markers"
    };

    var bubblelay = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" }
        };

    Plotly.newPlot("bubble", [bubbletrace], bubblelay);

  });
}
// Produce a default value on load
window.onload = function() {
    plotme();
  };