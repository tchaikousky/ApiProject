`use scrict`;

const apiKey = `f218c55bc041494885c415afbc00faaa`

function getRestaurants() {
    let restuarantName = `Hooters`;
    
    

    

}

function getMenuItem(menuItem) {
    const apiUrl = `https://api.spoonacular.com/food/menuItems/search?query=Hooters&number=60&apiKey=f218c55bc041494885c415afbc00faaa`;
    
    get(apiUrl).then(function(response) {
        const restaurantMenuList = response.menuItems.filter(function(menuItem) {
            console.log(response.menuItems[0].restaurantChain)
            if(menuItem.restaurantChain === "Hooters") {
                return menuItem
            }
        });
        console.log(restaurantMenuList);
        // console.log(restaurantList);
        // console.log(response.value);
    });
}


getMenuItem();


// /search?query=${restuarantName}&number=60&apiKey=${apiKey}