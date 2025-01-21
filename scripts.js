document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchQuery = document.getElementById('search').value.trim().toLowerCase();
    
    if (searchQuery) {
        // Perform a search (replace with actual API call or logic)
        filterTutors(searchQuery);
    } else {
        alert("Please enter a keyword to search.");
    }
});

function filterTutors(query) {
    // Split the query into individual search keywords (tags)
    const queryTags = query.split(",").map(tag => tag.trim());

    const filteredTutors = tutorData.filter(tutor => {
        return tutor.listings.some(listing => {
            return queryTags.every(tag => listing.tags.some(listingTag => listingTag.toLowerCase().includes(tag)));
        });
    });

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
            <h3><a href="tutor-profile.html?id=${tutor.id}">${tutor.name}</a></h3>
            <p>Listings:</p>
            <ul>
                ${tutor.listings.map(listing => `<li><a href="listing.html?id=${tutor.id}&listing=${listing.subject}">${listing.subject} ${listing.grade} - ${listing.price}</a></li>`).join('')}
            </ul>
        `;
        tutorItemsContainer.appendChild(tutorItem);
    });
}

