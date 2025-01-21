const params = new URLSearchParams(window.location.search);
const tutorId = params.get('id');

// Fetch tutor data based on the ID (replace with actual API or database query)
const tutorData = {
    1: { name: "John Doe", subject: "Math", level: "Grade 9", bio: "Experienced math tutor with 5 years of experience.", contact: "john.doe@example.com", tags: ["math", "grade 9", "20/hour", "5 km"] },
    2: { name: "Jane Smith", subject: "English", level: "Grade 10", bio: "Passionate about literature and writing skills.", contact: "jane.smith@example.com", tags: ["english", "grade 10", "30/hour", "10 km"] },
    3: { name: "Alan Turner", subject: "Science", level: "Grade 9", bio: "Making science fun and interactive.", contact: "alan.turner@example.com", tags: ["science", "grade 9", "25/hour", "3 km"] }
};

const tutor = tutorData[tutorId];

if (tutor) {
    const tutorDetailsContainer = document.getElementById('tutor-details');
    tutorDetailsContainer.innerHTML = `
        <h2>${tutor.name}</h2>
        <p>Subject: ${tutor.subject}</p>
        <p>Level: ${tutor.level}</p>
        <p>Bio: ${tutor.bio}</p>
        <p>Contact: <a href="mailto:${tutor.contact}">${tutor.contact}</a></p>
        <p>Tags: ${tutor.tags.join(", ")}</p>
    `;
} else {
    alert('Tutor not found.');
}
