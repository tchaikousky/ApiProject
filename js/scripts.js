`use scrict`;

const btn = document.getElementById("myBtn");
const closeModalButton = document.getElementsByClassName("close")[0];
const logos = document.getElementById("logoButtons");


document.cookie = "";

btn.addEventListener("click", function(e) {
    const weight = document.getElementById("weightInput");
    const exerciseInput = document.querySelector(`#workoutSelector`);
    const modal = document.getElementById("myModal");
    sessionStorage.weight = weight.value;
    sessionStorage.exerciseInput = exerciseInput.value;

    modal.style.display = "block";
    console.log(document.cookie);
});

closeModalButton.addEventListener("click", function(e) {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});

logos.addEventListener("click", function(e){
    document.cookie = e.target.value;
    if (e.target.value != undefined) {
        location.assign(`page2.html`);
        // if(e.target.value === "Burger King") {
        //     location.assign(`page2.html`);
        // }
        // else if(e.target.value === "Carl's Jr") {
        //     location.assign("page2.html");
        // }
        // else if(e.target.value === "Hooter's") {
        //     location.assign("page2.html");
        // }
        // else if(e.target.value === "Jack In The Box") {
        //     location.assign("page2.html");
        // }
        // else if(e.target.value === "Sonic") {
        //     location.assign("page2.html");
        // }
        // else if(e.target.value === "Wendy's") {
        //     location.assign("page2.html");
        // }
        // else if(e.target.value === "McDonald's") {
        //     location.assign("page2.html");
        // }
        // else if(e.target.value === "Bojangles") {
        //     location.assign("page2.html");
        // }   
    }
    return e.target.value;   
});

// console.log(getNutritionInfo(419330));
// console.log(getCaloriesBurned(60, 215, getActivity("casual walking")));
// console.log(getActivity("house cleaning"));
// console.log(convertLbToKg(215));
// console.log(getTimeToBurnCalories(205, 215, getActivity("casual walking")));
