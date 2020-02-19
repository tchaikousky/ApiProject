`use scrict`;

const btn = document.getElementById("myBtn");
const closeModalButton = document.getElementsByClassName("close")[0];
const logos = document.getElementById("logoButtons");


document.cookie = "";

btn.addEventListener("click", function(e) {
    const weightCheck = document.getElementById("weightInput").value;
    const weight = document.getElementById("weightInput");
    if(weightCheck.trim() === "" ) {
        const alertArea = document.getElementById(`alertArea`);
        alertArea.innerHTML = "You must enter your weight"
        
    } else {
        const exerciseInput = document.querySelector(`#workoutSelector`);
        const modal = document.getElementById("myModal");
        sessionStorage.weight = parseInt(weight.value);
        sessionStorage.exerciseInput = exerciseInput.value;

        modal.style.display = "block";
    }
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
