// Sample data
const userType = 'student'; // Change to 'tutor' to simulate tutor view
const userData = {
    student: {
        id: 1,
        name: "Student Name",
        tutors: [
            {
                tutorId: 101,
                name: "Tutor 1",
                materials: [
                    { title: "Material 1", link: "#", description: "Description 1" },
                    { title: "Material 2", link: "#", description: "Description 2" }
                ]
            },
            {
                tutorId: 102,
                name: "Tutor 2",
                materials: [
                    { title: "Material A", link: "#", description: "Description A" }
                ]
            }
        ]
    },
    tutor: {
        id: 101,
        name: "Tutor Name",
        lmsSections: [
            {
                courseId: "Math101",
                courseName: "Math Basics",
                students: ["Student A", "Student B"],
                materials: [
                    { title: "Math Material 1", link: "#", description: "Basic Algebra" }
                ]
            },
            {
                courseId: "Sci101",
                courseName: "Science Basics",
                students: ["Student C"],
                materials: []
            }
        ]
    }
};

// Initialize the LMS page
document.addEventListener("DOMContentLoaded", () => {
    if (userType === "student") {
        loadStudentView();
    } else if (userType === "tutor") {
        loadTutorView();
    }
});

function loadStudentView() {
    const studentLMSContainer = document.getElementById("student-lms");
    const { tutors } = userData.student;

    tutors.forEach(tutor => {
        const tutorSection = document.createElement("div");
        tutorSection.classList.add("tutor-section");
        tutorSection.innerHTML = `
            <h3>${tutor.name}</h3>
            <ul>
                ${tutor.materials
                    .map(
                        material =>
                            `<li>
                                <a href="${material.link}" target="_blank">${material.title}</a>
                                <p>${material.description}</p>
                            </li>`
                    )
                    .join("")}
            </ul>
        `;
        studentLMSContainer.appendChild(tutorSection);
    });
}

function loadTutorView() {
    const tutorLMSContainer = document.getElementById("tutor-lms");
    const { lmsSections } = userData.tutor;

    lmsSections.forEach(section => {
        const courseSection = document.createElement("div");
        courseSection.classList.add("course-section");
        courseSection.innerHTML = `
            <h3>${section.courseName}</h3>
            <p><strong>Students:</strong> ${section.students.join(", ")}</p>
            <ul>
                ${section.materials
                    .map(
                        material =>
                            `<li>
                                <a href="${material.link}" target="_blank">${material.title}</a>
                                <p>${material.description}</p>
                            </li>`
                    )
                    .join("")}
            </ul>
            <button>Add Material</button>
        `;
        tutorLMSContainer.appendChild(courseSection);
    });

    document.getElementById("create-lms").addEventListener("click", () => {
        alert("Create LMS Section functionality goes here!");
    });
}
