// script.js
document.addEventListener('DOMContentLoaded', function () {
    fetchRandomRecipes();
});

function fetchRandomRecipes() {
    const foodListElement = document.getElementById('foodList');
    foodListElement.innerHTML = ''; // Clear previous dishes

    // Replace 'https://www.themealdb.com/api/json/v1/1/random.php' with the actual API endpoint
    const numberOfCards = 10; // Change this to the desired number of cards
    for (let i = 0; i < numberOfCards; i++) {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const randomRecipe = data.meals[0];
                displayFoodItem(foodListElement, randomRecipe);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function displayFoodItem(container, recipe) {
    const foodItemElement = document.createElement('div');
    foodItemElement.classList.add('food-item');

    const html = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h3>${recipe.strMeal}</h3>
        <p>${recipe.strCategory}</p>
        <p>${recipe.strArea}</p>
    `;

    foodItemElement.innerHTML = html;
    foodItemElement.addEventListener('click', () => {
        window.location.href = `details.html?id=${recipe.idMeal}`;
    });
    container.appendChild(foodItemElement);
}
