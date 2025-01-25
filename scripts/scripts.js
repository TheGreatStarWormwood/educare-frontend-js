// Fetch tutors from the server
async function fetchTutors(query = '') {
    const url = `http://127.0.0.1:5505/tutors'`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const tutors = await response.json();
            return tutors;
        } else {
            throw new Error('Error fetching tutors');
        }
    } catch (error) {
        console.error(error);
        alert("Failed to fetch tutors.");
        return [];
    }
}

// Display tutors on the page
function displayTutors(tutors) {
    const tutorItemsContainer = document.getElementById('tutor-items');
    tutorItemsContainer.innerHTML = '';  // Clear previous results

    if (tutors.length === 0) {
        tutorItemsContainer.innerHTML = "<p>No tutors found based on your search.</p>";
        return;
    }

    tutors.forEach(tutor => {
        const tutorItem = document.createElement('div');
        tutorItem.classList.add('tutor-item');
        tutorItem.innerHTML = `
            <img src="${tutor.image}" alt="${tutor.name}" class="tutor-image">
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
                    <li>${review.stars} stars</li>
                `).join('')}
            </ul>
        `;
        tutorItemsContainer.appendChild(tutorItem);
    });
}

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchQuery = document.getElementById('search').value.trim();

    fetchTutors(searchQuery).then(tutors => {
        const filteredTutors = filterTutors(tutors, searchQuery);
        displayTutors(filteredTutors);
    });
});

// Filter tutors based on search query
function filterTutors(tutors, query) {
    const queryTags = query.split(",").map(tag => tag.trim().toLowerCase());
    return tutors.filter(tutor =>
        tutor.listings.some(listing =>
            queryTags.every(tag =>
                listing.keywords.toLowerCase().includes(tag)
            )
        )
    );
}

// Display tutors when the page loads
window.addEventListener('load', function () {
    fetchTutors().then(tutors => {
        displayTutors(tutors);
    });
});
