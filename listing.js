const urlParams = new URLSearchParams(window.location.search);
const tutorId = parseInt(urlParams.get('id'));
const listingSubject = urlParams.get('listing');

const tutor = tutorData.find(tutor => tutor.id === tutorId);
const listing = tutor?.listings.find(listing => listing.subject === listingSubject);

if (listing) {
    document.getElementById('listing-title').innerText = `${listing.subject} - ${listing.grade}`;
    document.getElementById('listing-price').innerText = `Price: ${listing.price}`;
    document.getElementById('listing-location').innerText = `Location: ${listing.location}`;
} else {
    document.getElementById('listing').innerHTML = "<p>Listing not found.</p>";
}
