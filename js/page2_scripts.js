"use scrict";

const apiKey = `f218c55bc041494885c415afbc00faaa`;
const apiKey2 = `29a682eb66a84deba3ba0a5a29686c19`;
const apiKey3 = `HMCo478fzi4fDwuGYUzgueKiWkkP1apcec2DE3qR`;
const apiKey4 = `3d088638092c4eed99786c1484469e95`
const target = document.cookie;
const menu = document.getElementById("menuItems");
const closeModalButton = document.getElementsByClassName("closeButton")[0];
const modal = document.getElementById("simpleModal");
const weight = parseInt(sessionStorage.weight);
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
    const apiUrl = `https://api.spoonacular.com/food/menuItems/search?query=${restaurantName}&number=150&apiKey=${apiKey4}`;
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
                // menuItemElement.innerHTML = test;
                const img = document.createElement(`img`);
                img.src = menuItem.image;
                // img.id = menuItem.id;
                img.value = menuItem.id;          
                menuItemElement.append(img); 
                list.appendChild(menuItemElement);
                console.log(uniqueMenuList);
            }
        });        
    });
//    console.log(uniqueMenuList);
    return uniqueMenuList;
};

function getNutritionInfo(menuItemId) {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/${menuItemId}?query=nutrition&apiKey=${apiKey4}`;
    const nutritionInfo = [];
    const modalInput = document.getElementById("bodyOfModal");    

    get(apiUrl).then(function(response) {
        const calories = document.createElement(`h1`);
        const fat = document.createElement(`h3`);
        const protein = document.createElement(`h3`);
        const carbs = document.createElement(`h3`);
        const exerciseTime = document.createElement(`h4`);
        const time = getTimeToBurnCalories(response.nutrition.calories, weight, getActivity("casual walking"));

        calories.innerHTML = response.nutrition.calories + " kcals";
        fat.innerHTML = response.nutrition.fat + " of Fat";       
        protein.innerHTML = response.nutrition.protein + " of Protein";      
        carbs.innerHTML = response.nutrition.carbs + " of Carbs";
        // need to change
        exerciseTime.innerHTML = parseInt((time)/60) + " hrs " + (parseInt(time)%60) + " mins";

        modalInput.appendChild(calories);
        modalInput.appendChild(fat);
        modalInput.appendChild(protein);
        modalInput.appendChild(carbs);
        modalInput.appendChild(exerciseTime);

    });
    return nutritionInfo;
}

function getTimeToBurnCalories(calories, weight, exercise) {
    weight = convertLbToKg(weight);
    let secondNum = (exercise.activity[1]*3.5*weight)/200;
    let time = calories / secondNum;

    return time;   
}

function convertLbToKg(weightInPounds) {
    const kilograms = .453592;
    const convertedWeight = weightInPounds * kilograms;

    return convertedWeight;
}

function getActivity(exercise) {
    let activity = "unavailable";
    const activities = [
        {activity: ["casual walking", 2]},
        {activity: ["house cleaning", 3]},
        {activity: ["moderate walking", 3.3]},
        {activity: ["stair climbing", 4]},
        {activity: ["casual bicycling", 4]},
        {activity: ["dancing", 4.8]},
        {activity: ["strenuous hiking", 6.5]},
        {activity: ["kayaking", 6.5]},
        {activity: ["moderate bicycling", 13]},
        {activity: ["strenuous jogging", 11.2]},
        {activity: ["casual swimming", 8]},
        {activity: ["sexual activity", 5.8]},
        {activity: ["playing basketball", 8]},
        {activity: ["moderate jogging", 8.8]},
    ];

    activities.forEach(movement => {
        if(movement.activity[0] === exercise) {
            activity = movement;
        }
    });
    return activity;
}

function getCaloriesBurned(duration, weight, exercise) {
    weight = convertLbToKg(weight);
    let secondNum = (exercise.activity[1]*3.5*weight)/200;   

    return duration * secondNum;
}

getMenuItems(target);