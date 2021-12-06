
function initialize() {

    //// Signup form validation ////

    $('#signup-form').submit(function (e) {
        if ($("#confirmPassword").val() != $("#password").val()) {
            $("#password").next('.help-block').text('Password do not match');
            e.preventDefault();
            return false;
        }
    });

    // $('div[onload]').trigger('onload');
    // $('#chart-container').on('load', render_chart);


}

const get_user_activity = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    const json = await response.json();
    return json;
}

// const githubLib = require("./modules/github.js");

const get_user_github_activity = async (gusername) => {

    // let activity = await githubLib.get_user_activity(gusername);
    let activity = await get_user_activity(gusername);
    let ldata = [];
    let data = [];
    // let days = await getDaysInMonth(11, 2021);
    // days.forEach(function (d) {
    //     data[d.toString().slice(0, 10)] = 0;
    // });
    for (let i=1; i < 30; i ++) {
        ldata.push('2021-11-' + i.toString());
        data.push(0);
    }
    // console.log(ldata);
    activity.forEach(function (act) {
        // if (data[act['created_at'].slice(0, 10)] == undefined) {
            // data[act['created_at'].slice(0, 10)] = 0;
        // }
        // data[act['created_at'].slice(0, 10)] = data[act['created_at'].slice(0, 10)] + 1;
        data[ldata.indexOf(act['created_at'].slice(0, 10))] +=  1;
    });
    // data = JSON.stringify(data);
    // console.log(data);
    return [ldata, data];
}

function render_chart_old() {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function render_chart() {

// const myChart = new Chart(ctx, {...});
  console.log("chart script here");
  const ctx = document.getElementById('myChart');
  console.log($("#myChart").attr('gid'));
  let temp = await get_user_github_activity($("#myChart").attr('gid'));
  // let dlabel = temp[0];
    // let days = await getDaysInMonth(11, 2021);
    // days.forEach(function (d) {
    //     data[d.toString().slice(0, 10)] = 0;
    // });
    let llabel = temp[0];
    let ldata = temp[1];
  // console.log("115", llabel, ldata)
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: llabel,
        datasets: [{
            label: 'GitHub Activity',
            data: ldata
        }]
      },
      options: {
          scales: {
            y: {
                beginAtZero: true
              },
            x: {
              beginAtZero: true
            }
          },
      }
  });
      myChart.render();

}

    // $('#portfolio-btn').on('click', render_chart_old);

$(document).ready(function() {
    initialize();
    // render_chart();
});

