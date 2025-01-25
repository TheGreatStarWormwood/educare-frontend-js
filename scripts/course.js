// Function to get courseId from the URL
function getCourseId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('courseId'), 10);
}

// Fetch the course data and render it
function renderCourse() {
    const courseId = getCourseId();
    const courseDetailsContainer = document.getElementById('course-details');
    const errorMessage = document.getElementById('error-message');

    // Search for the course in the lmsData array based on courseId
    const course = lmsData
        .flatMap(lms => lms.courses)
        .find(course => course.courseId === courseId);

    if (course) {
        // Render the course details dynamically
        courseDetailsContainer.innerHTML = `
            <h2>${course.name}</h2>
            <p><strong>Description:</strong> ${course.description}</p>
            <h3>Materials:</h3>
            <ul>
                ${course.materials.map(material => `
                    <li><a href="${material.file}" target="_blank">${material.title}</a></li>
                `).join('')}
            </ul>
            ${course.assignments.length > 0 ? `
                <h3>Assignments:</h3>
                <ul>
                    ${course.assignments.map(assignment => `
                        <li>
                            <strong>${assignment.title}</strong>: ${assignment.description}
                            <a href="${assignment.file}" target="_blank">Download</a>
                        </li>
                    `).join('')}
                </ul>
            ` : ''}
        `;
    } else {
        errorMessage.style.display = 'block';
    }
}

// Initialize the course page
renderCourse();
