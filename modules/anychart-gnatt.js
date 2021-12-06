// Not working
const fs = require('fs');


// Require JSDOM Class.
var JSDOM = require('jsdom').JSDOM;
// Create instance of JSDOM.
var jsdom = new JSDOM('<body><div id="container"></div></body>', {runScripts: 'dangerously'});
// Get window
var window = jsdom.window;
var anychart = require('anychart')(window);
var anychartExport = require('anychart-nodejs')(anychart);

const get_chart = async (uid) => {
    const educations = await eduLib.getEducationByUserId(uid);
    // add educations to timeline chart and return it
    var edu_obj = new Array();
    var data = [{
        id: "1",
        name: "Education",
        actualStart: Date.UTC(2000, 1, 1),
        actualEnd: Date.UTC(2025, 1, 1),
        children: []
    }];
    educations.forEach(function (edu) {
        data[0]['children'].push({
            'id': edu['eid'], name: edu['degree'] + edu['major'],
            actualStart: Date.UTC(edu['start_date'], 1, 1),
            actualEnd: Date.UTC(edu['end_date'], 1, 1)
        })
        // edu_obj.push({
        //     'id': edu['eid'], name: edu['degree'] + edu['major'],
        //     actualStart: Date.UTC(edu['start_date'], 1, 1),
        //     actualEnd: Date.UTC(edu['end_date'], 1, 1)
        // })
    });
    data = JSON.stringify(data);
    // console.log(edu_obj);
    // var data = [{
    //     id: "1",
    //     name: "Education",
    //     actualStart: Date.UTC(2000, 1, 1),
    //     actualEnd: Date.UTC(2025, 1, 1),
    //     children: JSON.parse(JSON.stringify(edu_obj))
    // }];
    // console.log(data);
    console.log(data);

    var chart = anychart.pie([10, 20, 7, 18, 30]);
    chart.bounds(0, 0, 800, 600);
    chart.container('container');
    chart.draw();

    // generate JPG image and save it to a file
    anychartExport.exportTo(chart, 'jpg').then(function(image) {
      fs.writeFile('./public/data/anychart-2.jpg', image, function(fsWriteError) {
        if (fsWriteError) {
          console.log(fsWriteError);
        } else {
          console.log('Complete');
        }
      });
    }, function(generationError) {
      console.log(generationError);
    });

    var chart = anychart.ganttProject();
    var treeData = anychart.data.tree(data, "as-tree");
    chart.data(treeData);
    chart.getTimeline().scale().maximum(Date.UTC(2050, 1, 30));
    chart.container("container");
    chart.draw();
    chart.fitAll();

    anychartExport.exportTo(chart, 'jpg').then(function(image) {
      fs.writeFile('./public/data/anychart.jpg', image, function(fsWriteError) {
        if (fsWriteError) {
          console.log(fsWriteError);
        } else {
          console.log('Complete');
        }
      });
    }, function(generationError) {
      console.log(generationError);
    });
}