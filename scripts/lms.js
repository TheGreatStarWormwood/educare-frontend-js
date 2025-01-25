
// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        userType: params.get('userType'),
        id: parseInt(params.get('id'), 10)
    };
}

// Render the appropriate view
function renderView() {
    const { userType, id } = getQueryParams();
    const dynamicView = document.getElementById('dynamic-view');
    const errorMessage = document.getElementById('error-message');

    if (userType === 'student') {
        const student = studentData.find(student => student.id === id);
        if (student) {
            renderStudentView(student, dynamicView);
        } else {
            errorMessage.style.display = 'block';
        }
    } else if (userType === 'tutor') {
        const tutorLms = lmsData.find(lms => lms.tutorId === id);
        if (tutorLms) {
            renderTutorView(tutorLms, dynamicView);
        } else {
            errorMessage.style.display = 'block';
        }
    } else {
        errorMessage.style.display = 'block';
    }
}

// Render Student View
function renderStudentView(student, container) {
    container.innerHTML = `<h2>Welcome, ${student.name}</h2><h3>Your Courses:</h3>`;
    const enrolledCourses = enrollmentData
        .filter(enrollment => enrollment.studentId === student.id)
        .map(enrollment => lmsData.find(lms => lms.id === enrollment.lmsId));

    enrolledCourses.forEach(lms => {
        lms.courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course-card');
            courseElement.innerHTML = 
                `<a href="course.html?courseId=${course.courseId}">
                    <h4>${course.name}</h4>
                    <p>${course.description}</p>
                </a>`;
            container.appendChild(courseElement);
        });
    });
}

// Render Tutor View
function renderTutorView(tutorLms, container) {
    container.innerHTML = `<h2>Welcome, Tutor</h2><h3>Your LMS Sections:</h3>`;
    tutorLms.courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course-card');
        courseElement.innerHTML = 
            `<a href="course.html?courseId=${course.courseId}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
            </a>`;
        container.appendChild(courseElement);
    });
}


// Initialize
renderView();
