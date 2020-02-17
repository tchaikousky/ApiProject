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
    }
    return e.target.value;   
});
