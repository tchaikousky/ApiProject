`use scrict`;

const apiKey = `f218c55bc041494885c415afbc00faaa`;
const btn = document.getElementById("myBtn");
const closeModalButton = document.getElementsByClassName("close")[0];
const logos = document.getElementById("logoButtons");

btn.addEventListener("click", function(e) {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
});

closeModalButton.addEventListener("click", function(e) {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});

logos.addEventListener("click", function(e){
    
    if (e.target.value != undefined) {
        // if(e.target.value === "Burger King") {
        //     location.replace("page2.html");
        // }
        // else if(e.target.value === "Carl's Jr") {
        //     location.replace("page2.html");
        // }
        // else if(e.target.value === "Hooter's") {
        //     location.replace("page2.html");
        // }
        // else if(e.target.value === "Jack In The Box") {
        //     location.replace("page2.html");
        // }
        // else if(e.target.value === "Sonic") {
        //     location.replace("page2.html");
        // }
        // else if(e.target.value === "Wendy's") {
        //     location.replace("page2.html");
        // }
        // else if(e.target.value === "McDonald's") {
        //     location.replace("page2.html");
        // }
        // else if(e.target.value === "Bojangles") {
        //     location.replace("page2.html");
        // }
        console.log(getMenuItems(e.target.value));
        // location.replace("page2.html");
        
    }
    
});
        
function getRestaurant(restaurantName) {
   restaurants.forEach(restaurant => {
       if(restaurant.name === restaurantName) {
           return restaurant;
       }
   });   
}

function getMenuItems(restaurantName) {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/search?query=${restaurantName}&number=150&apiKey=${apiKey}`;
    const restaurantMenuList = [];
    const uniqueMenuList = [];
    
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
        })      
    });    
    return uniqueMenuList;
}


function getNutritionInfo(menuItemId) {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/${menuItemId}?query=nutrition&apiKey=${apiKey}`;
    const nutritionInfo = [];
    
    get(apiUrl).then(function(response) {
        nutritionInfo.push({calories: response.nutrition.calories, fat: response.nutrition.fat, protein: response.nutrition.protein, carbs: response.nutrition.carbs});
    });
    return nutritionInfo;
}

function getCaloriesBurned(duration, weight, exercise) {
    weight = convertLbToKg(weight);
    let secondNum = (exercise.activity[1]*3.5*weight)/200;   

    return duration * secondNum;
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




// console.log(getNutritionInfo(419330));
console.log(getCaloriesBurned(60, 215, getActivity("casual walking")));
console.log(getActivity("house cleaning"));
console.log(convertLbToKg(215));
console.log(getTimeToBurnCalories(205, 215, getActivity("casual walking")));
