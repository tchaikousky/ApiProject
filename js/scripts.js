`use scrict`;

const apiKey = `f218c55bc041494885c415afbc00faaa`;
//TBD -- list of restaurants we support
const restaurants = [];

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

    get(apiUrl).then(function(response) {
        response.menuItems.filter(function(menuItem) {
            if(menuItem.restaurantChain === restaurantName) {
                restaurantMenuList.push({id: menuItem.id, name: menuItem.restaurantChain, title: menuItem.title, image: menuItem.image});    
            };
        });
    });
    return restaurantMenuList;
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
    let secondNum = (exercise.name[1]*3.5*weight)/200;   
    console.log(duration * secondNum);

}

function getTimeToBurnCalories(calories, weight, exercise) {
    weight = convertLbToKg(weight);
    let secondNum = (exercise.name[1]*3.5*weight)/200;
    let time = calories / secondNum;

    return time;
    
}

function convertLbToKg(weightInPounds) {
    const kilograms = weightInPounds * .453592;

    return kilograms;
}

function getActivity(exercise) {
    let activity = "unavailable";
    const activities = [
        {name: ["casual walking", 2]},
        {name: ["house cleaning", 3]},
        {name: ["moderate walking", 3.3]},
        {name: ["stair climbing", 4]},
        {name: ["casual bicycling", 4]},
        {name: ["dancing", 4.8]},
        {name: ["strenuous hiking", 6.5]},
        {name: ["kayaking", 6.5]},
        {name: ["moderate bicycling", 13]},
        {name: ["strenuous jogging", 11.2]},
        {name: ["casual swimming", 8]},
        {name: ["sexual activity", 5.8]},
        {name: ["playing basketball", 8]},
        {name: ["moderate jogging", 8.8]},
    ];

    activities.forEach(movement => {
        if(movement.name[0] === exercise) {
            activity = movement;
        }
    });
    return activity;
}

// console.log(getMenuItems("Bojangles"));
// console.log(getNutritionInfo(419330));
getCaloriesBurned(60, 215, getActivity("casual walking"));
console.log(getActivity("house cleaning"));
console.log(convertLbToKg(215));
console.log(getTimeToBurnCalories(205, 215, getActivity("casual walking")));
