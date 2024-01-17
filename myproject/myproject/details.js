// details.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');

    if (mealId) {
        fetchMealDetails(mealId);
    } else {
        // Redirect to the homepage if no meal ID is provided
        window.location.href = 'index.html';
    }
});

function fetchMealDetails(mealId) {
    const detailsContainer = document.getElementById('detailsContainer');

    // Replace 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' with the actual API endpoint
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const mealDetails = data.meals[0];
            displayMealDetails(detailsContainer, mealDetails);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayMealDetails(container, mealDetails) {
    const detailsCard = document.createElement('div');
    detailsCard.classList.add('details-card');

    const html = `
        <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}">
        <span>
        <h2><u><i>${mealDetails.strMeal}</u></i></h2>
        <p><strong>Category:</strong> ${mealDetails.strCategory}</p>
        <p><strong>Area:</strong> ${mealDetails.strArea}</p>
        <p><strong>Instructions:</strong> ${mealDetails.strInstructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
            <li>${mealDetails.strIngredient1} - ${mealDetails.strMeasure1}</li>
            <li>${mealDetails.strIngredient2} - ${mealDetails.strMeasure2}</li>
            <!-- Add similar lines for other ingredients and measures -->
        </ul>
        <p><strong>Tags:</strong> ${mealDetails.strTags}</p>
        <p><strong>YouTube Link:</strong> <a href="${mealDetails.strYoutube}" target="_blank">Watch Video</a></p>
        <button class="details-back-btn" onclick="goBack()">Back</button>
    `;

    detailsCard.innerHTML = html;
    container.appendChild(detailsCard);
}

function goBack() {
    window.location.href = 'index.html';
}
