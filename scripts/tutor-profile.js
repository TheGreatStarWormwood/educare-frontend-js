// tutor-profile.js

const params = new URLSearchParams(window.location.search);
const tutorId = params.get('id');

// Fetch tutor data based on the ID (replace with actual API or database query)

const tutor = tutorData[tutorId];


if (tutor) {
    const tutorDetailsContainer = document.getElementById('tutor-profile');
    tutorDetailsContainer.innerHTML = `
        <div class="tutor-header">
            <div class="tutor-info">
                <img src="${tutor.image}" alt="${tutor.name}" class="tutor-image-profile">
                <h2>${tutor.name}</h2>
            </div>
            <p class="tutor-description">${tutor.description}</p>
        </div>

        <div class="horizontal-sep"></div>

        <div class="tutor-listings">
            <h3>Listings:</h3>
            <ul>
                ${tutor.listings.map(listing => `
                    <li>
                        <strong>Listing ID:</strong> ${listing.listingId}<br>
                        <strong>Details:</strong> ${listing.keywords}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="horizontal-sep"></div>

        <div class="tutor-reviews">
            <h3>Reviews:</h3>
            <ul>
                ${tutor.reviews.map(review => `
                    <li>
                        <strong>Review:</strong> ${review.text || "No review provided"}<br>
                        <strong>Rating:</strong> ${"⭐".repeat(review.stars)} (${review.stars} stars)
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
} else {
    alert('Tutor not found.');
}

