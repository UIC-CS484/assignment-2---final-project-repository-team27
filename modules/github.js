
const fetch = require('node-fetch');
const fs = require('fs');
// let repos = require('../public/data/repos.json');

// const get_user_repos_old = async (username) => {
//     const repos = await fetch(`https://api.github.com/users/${username}/repos`)
//     .then(function(result) {
//         var rj = result.json();
//            // console.log("then 7", typeof rj) // "Some User token"
//            // console.log(rj.length)
//            return rj;
//         })
//     .then(function(result) {
//         console.log("then then ", typeof result)
//         console.log(result.length)
//         return result;
//         });
//     // console.log(repos)
//     // return repos;
// }

const get_user_repos = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const json = await response.json();
    // repos = json;
    // fs.writeFileSync("./public/data/repos.json", JSON.stringify(repos, null, 4), (err) => {
    //     if (err) {  console.error(err);  return; };
    // });
    return json;
}

const get_user_activity = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    const json = await response.json();
    // repos = json;
    // fs.writeFileSync("./public/data/repos.json", JSON.stringify(repos, null, 4), (err) => {
    //     if (err) {  console.error(err);  return; };
    // });
    return json;
}



module.exports = {get_user_repos, get_user_activity}

