// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        userType: params.get('userType'),
        id: parseInt(params.get('id'), 10)
    };
}

// Fetch data from the server
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}

// Render the appropriate view
async function renderView() {
    const { userType, id } = getQueryParams();
    const dynamicView = document.getElementById('dynamic-view');
    const errorMessage = document.getElementById('error-message');

    try {
        if (userType === 'student') {
            const student = await fetchData(`/students/${id}`);
            renderStudentView(student, dynamicView);
        } else if (userType === 'tutor') {
            const tutorLms = await fetchData(`/tutors/${id}/lms`);
            renderTutorView(tutorLms, dynamicView);
        } else {
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.style.display = 'block';
    }
}

// Render Student View
function renderStudentView(student, container) {
    container.innerHTML = `<h2>Welcome, ${student.name}</h2><h3>Your Courses:</h3>`;
    fetchData(`/students/${student.id}/enrollments`)
        .then(enrollments => {
            enrollments.forEach(enrollment => {
                fetchData(`/lms/${enrollment.lmsId}`)
                    .then(lms => {
                        lms.courses.forEach(course => {
                            const courseElement = document.createElement('div');
                            courseElement.innerHTML = `
                                <h4>${course.name}</h4>
                                <p>${course.description}</p>
                            `;
                            container.appendChild(courseElement);
                        });
                    });
            });
        })
        .catch(err => console.error('Error fetching enrollments', err));
}

// Render Tutor View
function renderTutorView(lmsData, container) {
    container.innerHTML = `<h2>Welcome, Tutor</h2><h3>Your LMS Sections:</h3>`;
    lmsData.forEach(lms => {
        lms.courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.innerHTML = `
                <h4>${course.name}</h4>
                <p>${course.description}</p>
            `;
            container.appendChild(courseElement);
        });
    });
}

// Initialize
renderView();
