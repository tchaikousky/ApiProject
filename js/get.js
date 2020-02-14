`use strict`;

function get(url) {
    return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data;
    })
    .catch(function(error) {
        return error; 
    });
}











// // const get = function(url){
//     return fetch history(url)
//     .then(response => response.json())
//     .then(data => data);
// // }
//(someArgunments) => {someFunctionReturn() }