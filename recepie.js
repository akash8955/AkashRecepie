const searchBar = document.querySelector(".search-icon");
const mealList = document.querySelector("#meal");
const mealDetail = document.querySelector(".meal-detail");
const closeBtn = document.querySelector(".close-btn");
const getRecepie = document.querySelector(".meal-btn");
const showResult = document.querySelector(".meal-result");

const Dessert = document.querySelector("#Dessert");
const Chicken = document.querySelector("#Chicken");
const Vegetarian = document.querySelector("#Vegetarian");
const Seafood = document.querySelector("#Seafood");
const Miscellaneous = document.querySelector("#Miscellaneous");

const categoryList = document.querySelector(".catwrap");

const indian = document.querySelector("#indian");
const italian = document.querySelector("#italian");

const areaList1= document.querySelector(".main-section1");
const areaList2= document.querySelector(".main-section2");


// for receoie detail function

const showRecepie = (meal) => {
    meal = meal[0];
    console.log(meal);
    mealDetail.parentElement.classList.add("detail");
    mealDetail.parentElement.classList.add("showRecepie");
    let html = `
                <h2 class="recepie-title">${meal.strMeal}</h2>
                <p class="recepie-category">${meal.strCategory}</p>
                <div class="recepie-instruction">
                    <h3>Instruction :</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="recepie-img">
                    <img src="${meal.strMealThumb}" alt="recepie image" >
                </div>
                <div class="recepie-link">
                    <a href="${meal.strYoutube}" target="_blank" >Watch Vedio</a>
                </div>`;
    mealDetail.innerHTML = html;
    
}
// function to show deail of list item
const recepieDetail = (Name) => {
    Name.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log("button clicked")
        if (event.target.classList.contains("meal-btn")) {
            const mealItem = event.target.parentElement.parentElement;
            console.log(mealItem)
            const id = mealItem.getAttribute('resonse-id');
            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const response = await data.json();
            showRecepie(response.meals);

        }

    });

};


// // for close button
closeBtn.addEventListener("click", () => {
    mealDetail.parentElement.classList.add("detail");
    mealDetail.parentElement.classList.remove("showRecepie");

})

// function to show category list
const showCategory = async (cate) => {
    console.log(cate);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`);
    let response = await data.json();
    let html = "";
    const meal = response.meals;
    for (let i = 1; i < 9; i++) {
        html += `<div class="meal-item" resonse-id="${meal[i].idMeal}" >
                        <div class="meal-image">
                            <img src="${meal[i].strMealThumb}" alt="food image">
                        </div>
                        <div class="meal-name">
                            <h3>${meal[i].strMeal}</h3>
                            <a href="#" class="meal-btn">Get Recepie</a>
                        </div>
                     </div>
            `;
    }
    categoryList.innerHTML = html;


}
// function to search category
const callCategory = (catName) => {
    catName.addEventListener("click", async (evt) => {
        evt.preventDefault();
        const categoryName = catName.getAttribute('id');
        showCategory(categoryName);
        // recepieDetail(categoryList);

    });
}
// call all category 
callCategory(Dessert);
callCategory(Chicken);
callCategory(Vegetarian);
callCategory(Seafood);
callCategory(Miscellaneous);

if (categoryList.innerHTML == "") {

    const categoryName = Dessert.getAttribute('id');
    showCategory(categoryName);
    // recepieDetail(categoryList);
};

// for scroll section


const scrollist = async (area) => {
    console.log(area);
    let scrolName = area.getAttribute("id");
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${scrolName}`);
    let response = await data.json();
    console.log(response.meals);
    let html = "";
    if (response.meals) {
        response.meals.forEach(meal => {
            html += `<div class="meal-item" resonse-id="${meal.idMeal}" >
                        <div class="meal-image">
                            <img src="${meal.strMealThumb}" alt="food image">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="meal-btn">Get Recepie</a>
                        </div>
                     </div>
            `;
        });

    }
    area.innerHTML += html;


}

if(indian.innerHTML===""){
    scrollist(indian);
}
if(italian.innerHTML===""){
    scrollist(italian);
}

recepieDetail(mealList);
recepieDetail(categoryList);
recepieDetail(areaList1);
recepieDetail(areaList2);
// for search bar

searchBar.addEventListener("click", async (event) => {
    event.preventDefault();
    showResult.classList.add("meal-result");
    showResult.classList.add("showRecepie");

    let searchInput = document.querySelector(".search-bar").value.trim();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const response = await data.json();
    let html = "";
    if (response.meals) {
        response.meals.forEach(meal => {
            html += `<div class="meal-item" resonse-id="${meal.idMeal}" >
                        <div class="meal-image">
                            <img src="${meal.strMealThumb}" alt="food image">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="meal-btn">Get Recepie</a>
                        </div>
                     </div>
            `;
        });
        mealList.classList.remove("notFound");
    }
    else {
        html = `Sorry, We Can Not Find Your Recepie`;
        mealList.classList.add("notFound");
    }
    mealList.innerHTML = html;
})

