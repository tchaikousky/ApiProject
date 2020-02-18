"use scrict";

const apiKey = `f218c55bc041494885c415afbc00faaa`;
const apiKey2 = `29a682eb66a84deba3ba0a5a29686c19`;
const apiKey3 = `HMCo478fzi4fDwuGYUzgueKiWkkP1apcec2DE3qR`;
const apiKey4 = `3d088638092c4eed99786c1484469e95`
const target = document.cookie;
const menu = document.getElementById("menuItems");
const closeModalButton = document.getElementsByClassName("closeButton")[0];
const modal = document.getElementById("simpleModal");
const weight = sessionStorage.weight;
console.log(weight);
const exerciseInput = sessionStorage.exerciseInput;

menu.addEventListener("click", function(e) {
    const modal = document.getElementById("simpleModal");

    if(e.target.value != undefined) {
        getNutritionInfo(e.target.value);
        modal.style.display = "block";      
    }
});

closeModalButton.addEventListener("click", function(e) {
    const modal = document.getElementById("simpleModal");
    modal.style.display = "none";
    location.replace("index.html");
});

modal.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

function getMenuItems(restaurantName) {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/search?query=${restaurantName}&number=150&apiKey=${apiKey}`;
    const restaurantMenuList = [];
    const uniqueMenuList = [];
    const list = document.querySelector(`.menuItems-photogallery`);

    get(apiUrl).then(function(response) {
        response.menuItems.filter(function(menuItem) {
            if(menuItem.restaurantChain === restaurantName) {
                restaurantMenuList.push({id: menuItem.id, name: menuItem.restaurantChain, title: menuItem.title, image: menuItem.image});    
            };
        });

        restaurantMenuList.forEach(element => {
            uniqueMenuList.push(element);
            if(uniqueMenuList.length > 1) {
                if(uniqueMenuList[uniqueMenuList.length -1].title === uniqueMenuList[uniqueMenuList.length -2].title) {
                    uniqueMenuList.pop();
                }
            }
        });

        uniqueMenuList.forEach(menuItem => {
            if(menuItem.image != undefined) {
                const menuItemElement = document.createElement(`li`);
                menuItemElement.class = "photo";
                const img = document.createElement(`img`);
                img.src = menuItem.image;
                img.value = menuItem.id;          
                menuItemElement.append(img); 
                list.appendChild(menuItemElement);
            }
        });        
    });

    return uniqueMenuList;
};

function getNutritionInfo(menuItemId) {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/${menuItemId}?query=nutrition&apiKey=${apiKey}`;
    const nutritionInfo = [];
    let exercises = getActivity(exerciseInput);    

    get(apiUrl).then(function(response) {
        const calories = document.querySelector(`#modalH1`);
        const modalBodyNutrientsFat = document.getElementById(`modalBodyNutrientsFat`);
        const modalBodyNutrientsProtein = document.getElementById(`modalBodyNutrientsProtein`);
        const modalBodyNutrientsCarbs = document.getElementById(`modalBodyNutrientsCarbs`);
        const modalBodyImages = document.querySelector(`#modalBodyImages`);
        
        exercises.forEach(exercise => {
            const imageDiv = document.createElement(`div`);
            const imageLabel = document.createElement(`label`);
            const exerciseTime = document.createElement(`h4`);
            const exerciseImg = document.createElement(`img`);
            imageDiv.class = "imageClass";
            imageLabel.id = "imageLabel";
            exerciseImg.src = exercise.activity[2];
            const time = parseInt(getTimeToBurnCalories(response.nutrition.calories, weight, exercise));
            console.log(time);
            exerciseTime.innerHTML = parseInt((time)/60) + " hrs " + (parseInt(time)%60) + " mins";
            imageDiv.appendChild(exerciseImg);
            imageDiv.appendChild(imageLabel);
            imageDiv.appendChild(exerciseTime);
            imageLabel.innerHTML = exercise.activity[0] + " : " + time;
            
            modalBodyImages.appendChild(imageDiv); 
        });
        
        calories.innerHTML = response.nutrition.calories + " kcals";
        modalBodyNutrientsFat.innerHTML = response.nutrition.fat + " of Fat";       
        modalBodyNutrientsProtein.innerHTML = response.nutrition.protein + " of Protein";      
        modalBodyNutrientsCarbs.innerHTML = response.nutrition.carbs + " of Carbs";

    });
    return nutritionInfo;
}

function getTimeToBurnCalories(calories, weightInKgs, exercise) {
    weightInKgs = convertLbToKg(weight);
    let secondNum = (exercise.activity[1]*3.5*weightInKgs)/200;
    console.log(exercise.activity[1]);
    console.log(weightInKgs);
    let time = calories / secondNum;

    return time;   
}

function convertLbToKg(weightInPounds) {
    const kilograms = .453592;
    const convertedWeight = weightInPounds * kilograms;

    return convertedWeight;
}

function getActivity(exercise) {
    let exerciseResult = [];
    const activities = [
        {activity: ["casual walking", 2, "images/walking.jpg", "Light Workout"]},
        {activity: ["house cleaning", 3, "images/cleaning.jpg", "Light Workout"]},
        {activity: ["moderate walking", 3.3, "images/walking.jpg", "Light Workout"]},
        {activity: ["stair climbing", 4, "images/stairs.jpg", "Moderate Workout"]},
        {activity: ["dancing", 4.8, "images/dancing.jpg", "Moderate Workout"]},
        {activity: ["strenuous hiking", 6.5, "images/hiking.png", "Moderate Workout"]},
        {activity: ["kayaking", 6.5, "images/kayaking.jpg", "Moderate Workout"]},
        {activity: ["casual bicycling", 4, "images/bicycling.png", "Moderate Workout"]},
        {activity: ["moderate bicycling", 13, "images/fast-bicycling.png", "Intense Workout"]},
        {activity: ["strenuous jogging", 11.2, "images/intense-jogging.png", "Intense Workout"]},
        {activity: ["casual swimming", 8, "images/swimming.png", "Intense Workout"]},
        {activity: ["sexual activity", 5.8, "images/kissing.jpg", "Moderate Workout"]},
        {activity: ["playing basketball", 8, "images/basketball.png", "Intense Workout"]},
        {activity: ["moderate jogging", 8.8, "images/moderate-jogging.jpg", "Intense Workout"]},
    ];

    // const lightActivities = [
    //     {activity: ["casual walking", 2, "images/walking.jpg"]},
    //     {activity: ["house cleaning", 3, "images/cleaning.jpg"]},
    //     {activity: ["moderate walking", 3.3, "images/walking.jpg"]}
    // ];

    // const moderateActivities = [
    //     {activity: ["stair climbing", 4, "images/stairs.jpg"]},
    //     {activity: ["casual bicycling", 4, "images/bicycling.png"]},
    //     {activity: ["dancing", 4.8, "images/dancing.jpg"]},
    //     {activity: ["sexual activity", 5.8, "images/kissing.jpg"]},
    //     {activity: ["strenuous hiking", 6.5, "images/hiking.png"]},
    //     {activity: ["kayaking", 6.5, "images/kayaking.jpg"]}
    // ];

    // const intenseActivities = [
    //     {activity: ["moderate bicycling", 13, "images/fast-bicycling.png"]},
    //     {activity: ["strenuous jogging", 11.2, "images/intense-jogging.png"]},
    //     {activity: ["casual swimming", 8, "images/swimming.png"]},
    //     {activity: ["playing basketball", 8, "images/basketball.png"]},
    //     {activity: ["moderate jogging", 8.8, "images/moderate-jogging.jpg"]},
    // ]
    
    activities.forEach(movement => {
        if(movement.activity[3] === exercise) {
            exerciseResult.push(movement);
        }
    });
    
    return exerciseResult;
}

function getCaloriesBurned(duration, weight, exercise) {
    weight = convertLbToKg(weight);
    let secondNum = (exercise.activity[1]*3.5*weight)/200;   

    return duration * secondNum;
}

getMenuItems(target);