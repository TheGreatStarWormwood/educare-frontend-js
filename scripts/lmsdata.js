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
