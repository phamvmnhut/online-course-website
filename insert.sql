-- insert category
insert into Field value (null, 'IT', 'Information and Technology');
insert into Field value (null, 'Language', 'Method of comunication');

insert into Category value (null, 'Web', 'Information and Technology', 1);
insert into Category value (null, 'Android', 'Information and Technology', 1);
insert into Category value (null, 'Data Science', 'Information and Technology', 1);

insert into Category value (null, 'English', 'Method of comunication', 2);
insert into Category value (null, 'France', 'Method of comunication', 2);
insert into Category value (null, 'Chinese', 'Method of comunication', 2);


-- insert user 
insert into User value (null, 0, 'avatar-1', 'email1@gmail.com', 'Selena', 'Gomez', 'Selena Gomez', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 0, '2021-01-07 00:30:48');
insert into User value (null, 200, 'avatar-2', 'email2@gmail.com', 'John', 'Legend', 'John Legend', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 0, '2021-01-07 00:30:48');

insert into User value (null, 50, 'avatar-3', 'email3@gmail.com', 'Taylor', 'Swift', 'Taylor Swift', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48');
insert into User value (null, 400, 'avatar-4', 'email4@gmail.com', 'Justin', 'Bieber', 'Justin Bieber', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48');
insert into User value (null, 400, 'avatar-5', 'email5@gmail.com', 'Lady', 'Gaga', 'Lady Gaga', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48');

insert into User value (null, 500, null, 'email6@gmail.com', 'first name', 'last name', 'admin1', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 2, '2021-01-07 00:30:48');
insert into User value (null, 200, null, 'email7@gmail.com', 'first name', 'last name', 'admin2', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 2, '2021-01-07 00:30:48');

-- insert Course
insert into Course value (null, 3, 'Ordered Data Structures', 'In this course, you will learn new data structures for efficiently storing and retrieving data that is structured in an ordered sequence',
'This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
',30, 0, 3, 20, "product-1.jpg", 20, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'Python for Genomic Data Science', 'This class provides an introduction to the Python programming language and the iPython notebook. This is the third course in the Genomic Big Data Science Specialization from Johns Hopkins University.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0,3, 20, "product-2.jpg", 40, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'A Complete Reinforcement Learning System', 'In this final course, you will put together your knowledge from Courses 1, 2 and 3 to implement a complete RL solution to a problem. This capstone will let you see how each component---problem formulation, algorithm selection, parameter selection and representation design---fits together into a complete solution, and how to make appropriate choices when deploying RL in the real world. This project will require you to implement both the environment to stimulate your problem, and a control agent with Neural Network function approximation. In addition, you will conduct a scientific study of your learning system to develop your ability to assess the robustness of RL agents. To use RL in the real world, it is critical to (a) appropriately formalize the problem as an MDP, (b) select appropriate algorithms, (c ) identify what choices in your implementation will have large impacts on performance and (d) validate the expected behaviour of your algorithms. This capstone is valuable for anyone who is planning on using RL to solve real problems.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0, 1, 10, "product-3.jpg", 50, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Academic Skills for University Success', 'This Specialization is aimed at preparing students for undergraduate study in an English-speaking university. The course equips you for full participation and engagement with your studies by building awareness and understanding of the core values and expectations of academic culture, and providing you with practical strategies to apply to your studies. 
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 1, 5, "product-4.jpg", 21, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'Software Architecture','The way that software components subroutines, classes, functions, etc. Ã¢Â€Â”  are arranged,  and the interactions between them, is called architecture. In this course you will study the ways these architectures are represented, both in UML and other visual tools. We will introduce the most common architectures, their qualities, and tradeoffs. We will talk about how architectures are evaluated, what makes a good architecture, and an architecture can be improved. We''ll also talk about how the architecture touches on the process of software development.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 2, 10, "product-5.jpg", 90, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'Basic English', 'This course divided into various main sections that you can navigate easily.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 2, 50, "product-6.jpg", 32, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'Basic France', 'With help and tutorials on everything from tenses to prepositions','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0, 5, 0, "product-7.jpg", 22, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Voice of American', 'help and resources on English words, with explanations','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 4, 0, "product-8.jpg", 90, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'English grammar lessons', 'tutorials and sound files explaining aspects of English pronunciation such as word stress, sentence stress and linking','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0, 4, 0, "product-9.jpg", 72, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'France with audio and practice', 'play word games like Hangman, and learn France while having fun!','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 5, 0, "product-10.jpg", 66, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Learn Chinese Online', 'With help and tutorials on everything from tenses to prepositions','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0, 6, 0, "product-11.jpg", 22, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'Learn Mandarin for doing Business in China', 'help and resources on English words, with explanations','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 6, 0, "product-12.jpg", 90, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'Front-End Web Developer', 'tutorials and sound files explaining aspects of English pronunciation such as word stress, sentence stress and linking','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0, 1, 0, "product-13.jpg", 72, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Python Basics for Data Science', 'This Professional Certificate will start you at the absolute beginning teaching the fundamental binary language of modern computers.','30', 1, 3, 0, "product-1.jpg", 66, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Machine Learning with Python: A Practical Introduction', 'Learn to think computationally and write programs to tackle useful problems. Use these courses as stepping stones to more advanced computer science courses.','30', 1, 3, 0, "product-2.jpg", 66, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'HTML5 and CSS Fundamentals', 'play word games like Hangman, and learn France while having fun!','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 1, 0, "product-3.jpg", 66, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'CSS Basics', 'Master the foundational programming languages for Web development, HTML5, CSS and JavaScript, to gain skills in one of the fastest growing careers.','30', 1, 1, 0, "product-4.jpg", 66, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'Contemporary China', 'Did you know that Chinese is one of the most spoken languages in the world? Whether you’re planning on visiting China to sightsee or are going there to work on a 6-month project, learning the basics of the language will be extremely helpful in your day to day operation.','30', 1, 6, 0, "product-5.jpg", 66, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'Get an introduction to the Chinese language with online courses from top universities and institutions. Online courses on edX include extensive videos and other tools to help you learn pronunciation skills in addition to basic vocabulary and grammar. Learn Mandarin Chinese tones, characters and basic language structure and practice core pronunciation and communication skills, all from the comfort of your computer anywhere in the world.','30', 1, 6, 0, "product-6.jpg", 66, '2021-01-07 00:30:48', 0);


-- insert lesson
insert into Lesson value (1, null,'Lesson One', 'Introduction to Computer Science', 'video-1.mp4');
insert into Lesson value (1, null,'Lesson Two', 'Web Programming with Python and JavaScript', 'video-1.mp4');
insert into Lesson value (1, null,'Lesson Three', 'HTML5 and CSS Fundamentals', 'video-1.mp4');

insert into Lesson value (2, null,'Lesson One', 'Introduction to Python: Absolute Beginner', 'video-1.mp4');
insert into Lesson value (2, null,'Lesson Two', 'Introduction to Python: Fundamentals', 'video-1.mp4');
insert into Lesson value (2, null,'Lesson Three', 'Artificial Intelligence (AI)', 'video-1.mp4');

insert into Lesson value (3, null,'Lesson One', 'Machine Learning', 'video-1.mp4');
insert into Lesson value (3, null,'Lesson Two', 'Computing in Python I: Fundamentals and Procedural Programming', 'video-1.mp4');
insert into Lesson value (3, null,'Lesson Three', 'Computing in Python II: Control Structures', 'video-1.mp4');

insert into Lesson value (4, null,'Lesson One', 'The Mandarin for Business Professional Certificate Program', 'video-1.mp4');
insert into Lesson value (4, null,'Lesson Two', 'No previous Chinese language experience ', 'video-1.mp4');
insert into Lesson value (4, null,'Lesson Three', 'Beyond the basics of conversation', 'video-1.mp4');

insert into Lesson value (5, null,'Lesson One', 'In the Mandarin Chinese lessons level series', 'video-1.mp4');
insert into Lesson value (5, null,'Lesson Two', 'common phrases', 'video-1.mp4');
insert into Lesson value (5, null,'Lesson Three', 'Asia and the Chinese culture', 'video-1.mp4');

insert into Lesson value (6, null,'Lesson One', 'proper entence structur', 'video-1.mp4');
insert into Lesson value (6, null,'Lesson Two', 'basic structures', 'video-1.mp4');
insert into Lesson value (6, null,'Lesson Three', 'Videos of common discussions', 'video-1.mp4');

insert into Lesson value (7, null,'Lesson One', 'extremely helpful in your day', 'video-1.mp4');
insert into Lesson value (7, null,'Lesson Two', 'The political and economic world of Post-Mao China.', 'video-1.mp4');
insert into Lesson value (7, null,'Lesson Three', 'The period from Deng Xiaoping’s rise in 1978 to the present.', 'video-1.mp4');

insert into Lesson value (8, null,'Lesson One', 'How to examine Chinese history with a multidisciplinary approach.', 'video-1.mp4');
insert into Lesson value (8, null,'Lesson Two', 'Study and demonstrate knowledge on your schedule', 'video-1.mp4');
insert into Lesson value (8, null,'Lesson Three', 'Learn with university partners and peers from around the world', 'video-1.mp4');

insert into Lesson value (9, null,'Lesson One', 'Try a course before you pay', 'video-1.mp4');
insert into Lesson value (9, null,'Lesson Two', 'Drive your career forward with university-backed', 'video-1.mp4');
insert into Lesson value (9, null,'Lesson Three', 'Five important themes in modern', 'video-1.mp4');

insert into Lesson value (10, null,'Lesson One', 'Chinese Dream', 'video-1.mp4');
insert into Lesson value (10, null,'Lesson Two', 'Receive an instructor', 'video-1.mp4');
insert into Lesson value (10, null,'Lesson Three', 'Train your employees', 'video-1.mp4');

insert into Lesson value (11, null,'Lesson One', 'Description', 'video-1.mp4');
insert into Lesson value (11, null,'Lesson Two', 'Description', 'video-1.mp4');
insert into Lesson value (11, null,'Lesson Three', 'Description', 'video-1.mp4');

insert into Lesson value (12, null,'Lesson One', 'Description', 'video-1.mp4');
insert into Lesson value (12, null,'Lesson Two', 'Description', 'video-1.mp4');
insert into Lesson value (12, null,'Lesson Three', 'Description', 'video-1.mp4');

insert into Lesson value (13, null,'Lesson One', 'Description', 'video-1.mp4');
insert into Lesson value (13, null,'Lesson Two', 'Description', 'video-1.mp4');
insert into Lesson value (14, null,'Lesson Three', 'Description', 'video-1.mp4');

-- insert purcahse
insert into Purchased value (1, 1, '2021-01-10 00:30:00');
insert into Purchased value (2, 1, '2021-01-10 00:30:00');

insert into Purchased value (1, 2, '2021-01-10 00:30:00');
insert into Purchased value (2, 2, '2021-01-10 00:30:00');

insert into Purchased value (1, 3, '2021-01-10 00:30:00');
insert into Purchased value (2, 3, '2021-01-10 00:30:00');

-- insert feedback ~ rating
insert into CourseRating value (null, 1, 1, 5, 'I really like it, best course I''ve ever had.');
insert into CourseRating value (null, 2, 1, 4, 'Lots of difficult chapters but the teacher was very friendly.');

insert into CourseRating value (null, 1, 2, 4, 'i like this course too much, it help me have many kind of skills in uni');
insert into CourseRating value (null, 2, 2, 4, 'Very well explained with good experimental evidences. Though basic derivation of equations are not shown. At least should have been mentioned "references".\n\nOverall I am benefitted.');

insert into CourseRating value (null, 1, 3, 5, 'It covers a lot of material in a short span of time, so retention is key. Make sure to take a lot of notes and give yourself some time to really process all the material from each week.');
insert into CourseRating value (null, 2, 3, 3, "The instructors were highly-qualified, and they didnt let the presentations get boring at all. The materials were well-planned. Overall, it's an excellent course for introduction to VVER technology.");

insert into CourseRating value (null, 2, 4, 5, 'I really like it, best course I''ve ever had.');
insert into CourseRating value (null, 1, 4, 5, 'Lots of difficult chapters but the teacher was very friendly.');

insert into CourseRating value (null, 1, 5, 3, 'It covers a lot of material in a short span of time, so retention is key. Make sure to take a lot of notes and give yourself some time to really process all the material from each week.');
insert into CourseRating value (null, 2, 5, 3, "The instructors were highly-qualified, and they didnt let the presentations get boring at all. The materials were well-planned. Overall, it's an excellent course for introduction to VVER technology.");

