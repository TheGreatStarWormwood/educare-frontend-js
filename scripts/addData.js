const mysql = require('mysql2');

console.log(__dirname); // This will print the current directory

const tutorData = [
    {
        id: 1,
        name: "Tutor1",
        description: "Description1: Specializes in Math and Science for middle school students.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 101, keywords: "math, science, grade 8, $20/hour, 5 km" },
            { listingId: 102, keywords: "geometry, physics, grade 9, $25/hour, 7 km" }
        ],
        reviews: [
            { text: "Very patient and knowledgeable!", stars: 5 },
            { text: null, stars: 4 }
        ]
    },
    {
        id: 2,
        name: "Tutor2",
        description: "Description2: Offers English literature and writing skills for high school.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 201, keywords: "english, literature, grade 10, $30/hour, 10 km" },
            { listingId: 202, keywords: "creative writing, essays, grade 11, $35/hour, 12 km" }
        ],
        reviews: [
            { text: "Helped improve my writing significantly.", stars: 5 },
            { text: "Engaging lessons!", stars: 4 }
        ]
    },
    {
        id: 3,
        name: "Tutor3",
        description: "Description3: Expert in SAT and ACT test preparation.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 301, keywords: "SAT, ACT, test prep, $40/hour, 15 km" },
            { listingId: 302, keywords: "college entrance exams, $45/hour, online" }
        ],
        reviews: [
            { text: "My SAT score improved by 200 points!", stars: 5 },
            { text: "Great tips for test-taking strategies.", stars: 5 }
        ]
    },
    {
        id: 4,
        name: "Tutor4",
        description: "Description4: Focuses on elementary-level tutoring for all subjects.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 401, keywords: "elementary, all subjects, grade 4, $15/hour, 3 km" },
            { listingId: 402, keywords: "math, reading, grade 5, $18/hour, 5 km" }
        ],
        reviews: [
            { text: "My child loves learning with Tutor4!", stars: 5 },
            { text: "Very friendly and approachable.", stars: 4 }
        ]
    },
    {
        id: 5,
        name: "Tutor5",
        description: "Description5: Offers advanced tutoring in computer science and programming.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 501, keywords: "programming, python, Java, $50/hour, online" },
            { listingId: 502, keywords: "data structures, algorithms, $60/hour, online" }
        ],
        reviews: [
            { text: "Made complex topics easy to understand.", stars: 5 },
            { text: "Very knowledgeable in coding.", stars: 5 }
        ]
    },
    {
        id: 6,
        name: "Tutor6",
        description: "Description6: Music teacher offering piano and guitar lessons.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 601, keywords: "piano, music theory, beginner, $40/hour, 8 km" },
            { listingId: 602, keywords: "guitar, music performance, $45/hour, 10 km" }
        ],
        reviews: [
            { text: "Fun and interactive lessons!", stars: 5 },
            { text: "Helped me prepare for a recital.", stars: 5 }
        ]
    },
    {
        id: 7,
        name: "Tutor7",
        description: "Description7: Biology and chemistry tutor for pre-med students.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 701, keywords: "biology, organic chemistry, $50/hour, 10 km" },
            { listingId: 702, keywords: "anatomy, physiology, $55/hour, online" }
        ],
        reviews: [
            { text: "Perfect for pre-med preparation.", stars: 5 },
            { text: "Detailed and thorough explanations.", stars: 5 }
        ]
    },
    {
        id: 8,
        name: "Tutor8",
        description: "Description8: Specializes in economics and business studies.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 801, keywords: "economics, macroeconomics, grade 12, $35/hour, online" },
            { listingId: 802, keywords: "business studies, accounting, $40/hour, 8 km" }
        ],
        reviews: [
            { text: "Helped me ace my econ exam!", stars: 5 },
            { text: null, stars: 4 }
        ]
    },
    {
        id: 9,
        name: "Tutor9",
        description: "Description9: Spanish and French language tutoring.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 901, keywords: "Spanish, beginner, conversation, $25/hour, 5 km" },
            { listingId: 902, keywords: "French, grammar, grade 11, $30/hour, 7 km" }
        ],
        reviews: [
            { text: "Improved my conversational skills greatly.", stars: 5 },
            { text: "Clear and patient teaching.", stars: 4 }
        ]
    },
    {
        id: 10,
        name: "Tutor10",
        description: "Description10: Offers tutoring in art and design.",
        image: "imgs/tutor-icon.png",  
        listings: [
            { listingId: 1001, keywords: "drawing, painting, beginner, $30/hour, 6 km" },
            { listingId: 1002, keywords: "graphic design, Photoshop, $50/hour, online" }
        ],
        reviews: [
            { text: "Boosted my creativity and technique.", stars: 5 },
            { text: "Very inspiring tutor!", stars: 5 }
        ]
    }
];

const lmsData = [
    {
        id: 1,
        tutorId: 1, // Managed by Tutor1
        courses: [
            {
                courseId: 101,
                name: "Algebra Basics",
                description: "Introduction to algebra for middle school students.",
                materials: [
                    { materialId: 1, title: "Algebra Basics PDF", file: "files/algebra-basics.pdf" },
                    { materialId: 2, title: "Practice Questions", file: "files/practice-questions.pdf" }
                ],
                assignments: [
                    {
                        assignmentId: 1,
                        title: "Algebra Homework 1",
                        description: "Solve the equations in the attached file.",
                        file: "files/algebra-homework1.pdf",
                        submissions: [
                            { studentId: 1, file: "submissions/algebra-homework1-student1.pdf" },
                            { studentId: 2, file: "submissions/algebra-homework1-student2.pdf" }
                        ]
                    }
                ]
            },
            {
                courseId: 102,
                name: "Geometry Essentials",
                description: "Understanding shapes and measurements.",
                materials: [
                    { materialId: 3, title: "Geometry Basics", file: "files/geometry-basics.pdf" }
                ],
                assignments: []
            }
        ]
    },
    {
        id: 2,
        tutorId: 2, // Managed by Tutor2
        courses: [
            {
                courseId: 201,
                name: "Creative Writing 101",
                description: "Learn the basics of creative writing and storytelling.",
                materials: [
                    { materialId: 4, title: "Creative Writing Guide", file: "files/creative-writing-guide.pdf" }
                ],
                assignments: []
            }
        ]
    }
];


const enrollmentData = [
    { lmsId: 1, studentId: 1 },
    { lmsId: 1, studentId: 2 },
    { lmsId: 2, studentId: 3 },
    { lmsId: 2, studentId: 4 }
];
const studentData = [
    { id: 1, name: "Alice Smith" },
    { id: 2, name: "Bob Johnson" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Lee" }
];


// Create a MySQL connection pool
const pool = mysql.createConnection({
    host: 'localhost', // Use 'localhost' to refer to your host machine.
    port: 3307,         // Use port 3307 since it's mapped to the container's port 3306.
    user: 'root',       // Use 'root' as the username (or another MySQL user if different).
    password: 'root',   // Use the root password you specified in the Docker command.
    database: 'lms' // Replace with your actual database name.
  });

// Function to add student data
function addStudent(studentData) {
    const query = 'INSERT INTO students (name, email, date_of_birth) VALUES (?, ?, ?)';
    pool.query(query, [studentData.name, studentData.email, studentData.dateOfBirth], (err, result) => {
        if (err) {
            console.error('Error adding student:', err);
            return;
        }
        console.log('Student added with ID:', result.insertId);
    });
}

// Function to add tutor data
function addTutor(tutorData) {
    const query = 'INSERT INTO tutors (name, email, subject) VALUES (?, ?, ?)';
    pool.query(query, [tutorData.name, tutorData.email, tutorData.subject], (err, result) => {
        if (err) {
            console.error('Error adding tutor:', err);
            return;
        }
        console.log('Tutor added with ID:', result.insertId);
    });
}

// Function to add LMS course data
function addLMS(lmsData) {
    const query = 'INSERT INTO lms (tutorId, courseName, description) VALUES (?, ?, ?)';
    pool.query(query, [lmsData.tutorId, lmsData.courseName, lmsData.description], (err, result) => {
        if (err) {
            console.error('Error adding LMS course:', err);
            return;
        }
        console.log('LMS course added with ID:', result.insertId);
    });
}

// Function to add enrollment data
function addEnrollment(enrollmentData) {
    const query = 'INSERT INTO enrollments (studentId, lmsId) VALUES (?, ?)';
    pool.query(query, [enrollmentData.studentId, enrollmentData.lmsId], (err, result) => {
        if (err) {
            console.error('Error adding enrollment:', err);
            return;
        }
        console.log('Enrollment added with ID:', result.insertId);
    });
}

// Add all student data
studentData.forEach(student => addStudent(student));

// Add all tutor data
tutorData.forEach(tutor => addTutor(tutor));

// Add all LMS data
lmsData.forEach(lms => addLMS(lms));

// Add all enrollment data
enrollmentData.forEach(enrollment => addEnrollment(enrollment));

// Close the pool when done
pool.end();
