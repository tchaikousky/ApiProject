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

function getMenuItems() {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/search?query=Hooters&number=60&apiKey=${apiKey}`;
    const restaurantMenuList = [];

    get(apiUrl).then(function(response) {
        response.menuItems.filter(function(menuItem) {
            if(menuItem.restaurantChain === "Hooters") {
                restaurantMenuList.push({id: menuItem.id, title: menuItem.title, imgage: menuItem.image});    
            }
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

function getSingleMenuItem(itemName) {
    const menuItemId = 0;
    restaurantMenu.forEach(menuItem => {
        if(menuItem.title === itemName) {
            menuItemId = menuItem.id;
        }
    });
    return menuItemId;
}

console.log(getMenuItems());
console.log(getNutritionInfo(419330));
