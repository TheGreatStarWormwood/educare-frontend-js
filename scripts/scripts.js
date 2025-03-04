// scripts.js

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchQuery = document.getElementById('search').value.trim();
    if (searchQuery) {
        filterTutors(searchQuery);
    } else {
        displayTutors(tutorData);
    }
});

// Display tutors by default
window.addEventListener('load', function () {
    displayTutors(tutorData);
});


function filterTutors(query) {
    const queryTags = query.split(",").map(tag => tag.trim().toLowerCase());
    const filteredTutors = tutorData.filter(tutor =>
        tutor.listings.some(listing =>
            queryTags.every(tag =>
                listing.keywords.toLowerCase().includes(tag)
            )
        )
    );

    displayTutors(filteredTutors);
}

function displayTutors(tutors) {
    const tutorItemsContainer = document.getElementById('tutor-items');
    tutorItemsContainer.innerHTML = ''; // Clear previous results

    if (tutors.length === 0) {
        tutorItemsContainer.innerHTML = "<p>No tutors found based on your search.</p>";
        return;
    }

    tutors.forEach(tutor => {
        const tutorItem = document.createElement('div');
        tutorItem.classList.add('tutor-item');
        tutorItem.innerHTML = `
            <img src="${tutor.image}" alt="${tutor.name}" class="tutor-image"> <!-- Adding image here -->
            <h3><a href="tutor-profile.html?id=${tutor.id}">${tutor.name}</a></h3>
            <p>${tutor.description}</p>
            <p><strong>Listings:</strong></p>
            <ul>
                ${tutor.listings.map(listing => `
                    <li><a href="listing.html?tutorId=${tutor.id}&listingId=${listing.listingId}">${listing.keywords}</a></li>
                `).join('')}
            </ul>
            <p><strong>Rating:</strong></p>
            <ul>
                ${tutor.reviews.map(review => `
                    <li>
                         ${review.stars} stars
                    </li>
                `).join('')}
            </ul>
        `;
        tutorItemsContainer.appendChild(tutorItem);
    });
}

