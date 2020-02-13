`use scrict`;

const apiKey = `f218c55bc041494885c415afbc00faaa`
const restuarants = [];

function getRestaurant(restaurantName) {
    
    
}

function getMenuItems() {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/search?query=Hooters&number=60&apiKey=f218c55bc041494885c415afbc00faaa`;
    
    const l = get(apiUrl).then(function(response) {
        const restaurantMenuList = response.menuItems.filter(function(menuItem) {
            console.log(response.menuItems[0].restaurantChain)
            if(menuItem.restaurantChain === "Hooters") {
                return menuItem
            }
        });
        console.log(restaurantMenuList);
        // console.log(restaurantList);
        // console.log(response.value);
        return restaurantMenuList;
    });

    return l;

}

function getNutritionInfo(restaurantChain) {
    // get(apiUrl).then(function(response) {
    //     const menuItemId = 
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


// console.log(getSingleMenuItem("Caesar Salad"));
console.log(getMenuItems());

// /search?query=${restuarantName}&number=60&apiKey=${apiKey}