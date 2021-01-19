-- insert category
insert into Field value (null, 'IT', 'Information and Technology');
insert into Field value (null, 'Language', 'Method of comunication');

insert into Category value (null, 'Web', 'Information and Technology', 1);
insert into Category value (null, 'Android', 'Information and Technology', 1);
insert into Category value (null, 'Data', 'Information and Technology', 1);

insert into Category value (null, 'English', 'Method of comunication', 2);
insert into Category value (null, 'France', 'Method of comunication', 2);
insert into Category value (null, 'Chinese', 'Method of comunication', 2);

-- insert user 
insert into User value (null, 0, 'avatar-1.jpg', 'email1@gmail.com', 'Selena', 'Gomez', 'Selena Gomez', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 0, '2021-01-07 00:30:48', 1, 0);
insert into User value (null, 200, 'avatar-2.jpg', 'email2@gmail.com', 'John', 'Legend', 'John Legend', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 0, '2021-01-07 00:30:48', 1, 0);

insert into User value (null, 50, 'avatar-3.jpg', 'email3@gmail.com', 'Taylor', 'Swift', 'Taylor Swift', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48', 1, 0);
insert into User value (null, 400, 'avatar-4.jpg', 'email4@gmail.com', 'Justin', 'Bieber', 'Justin Bieber', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48', 1, 9);
insert into User value (null, 400, 'avatar-5.jpg', 'email5@gmail.com', 'Lady', 'Gaga', 'Lady Gaga', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48', 1, 0);

insert into User value (null, 500, null, 'email6@gmail.com', 'first name', 'last name', 'admin1', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 2, '2021-01-07 00:30:48', 1, 0);
insert into User value (null, 200, null, 'email7@gmail.com', 'first name', 'last name', 'admin2', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 2, '2021-01-07 00:30:48', 1, 0);

-- insert Course
insert into Course value (null, 3, 'Ordered Data Structures', 'In this course, you will learn new data structures for efficiently storing and retrieving data that is structured in an ordered sequence',
'This course presents an introduction to the basics of financial accounting and finance for IT professionals. 
The first part of the course will focus on understanding the most important financial statements, namely, 
the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand 
the financial health and performance of the company by examining a number of important financial ratios that are derived 
from the financial statements of the company. The second part of the course will focus on the basics of finance. 
This includes the concept of time value of money, discounting cash flows, and capital budgeting. 
The course will also introduce the idea of real options
, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
',40, 0, 3, 20, "product-1.jpg", 20, '2021-01-06 00:30:48', 0);
insert into Course value (null, 4, 'Python for Genomic Data Science', 'This class provides an introduction to the Python programming language and the iPython notebook. This is the third course in the Genomic Big Data Science Specialization from Johns Hopkins University.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals.
 The first part of the course will focus on understanding the most important financial statements, namely,
 the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can
 understand the financial health and performance of the company by examining a number of important financial
 ratios that are derived from the financial statements of the company. The second part of the course will focus 
 on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting.
 The course will also introduce the idea of real options, and their impact of the decision 
 to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','55', 0,3, 20, "product-2.jpg", 40, '2021-01-06 00:30:48', 0);
insert into Course value (null, 5, 'A Complete Reinforcement Learning System', 'In this final course, you will put together your knowledge from Courses 1, 2 and 3 to implement a complete RL solution to a problem. This capstone will let you see how each component---problem formulation, algorithm selection, parameter selection and representation design---fits together into a complete solution, and how to make appropriate choices when deploying RL in the real world. This project will require you to implement both the environment to stimulate your problem, and a control agent with Neural Network function approximation. In addition, you will conduct a scientific study of your learning system to develop your ability to assess the robustness of RL agents. To use RL in the real world, it is critical to (a) appropriately formalize the problem as an MDP, (b) select appropriate algorithms, (c ) identify what choices in your implementation will have large impacts on performance and (d) validate the expected behaviour of your algorithms. This capstone is valuable for anyone who is planning on using RL to solve real problems.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. 
The first part of the course will focus on understanding the most important financial statements, 
namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus 
on how we can understand the financial health and performance of the company by examining a number of 
important financial ratios that are derived from the financial statements of the company. The second part 
of the course will focus on the basics of finance. This includes the concept of time value of money,
 discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, 
 and their impact of the decision to accept/reject a project. 
 Lectures on concepts will be supplemented with numerical examples.
','55', 1, 1, 10, "product-3.jpg", 50, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Academic Skills for University Success', 'This Specialization is aimed at preparing students for undergraduate study in an English-speaking university. The course equips you for full participation and engagement with your studies by building awareness and understanding of the core values and expectations of academic culture, and providing you with practical strategies to apply to your studies. 
','This professional certificate series combines CS50’s legendary Introduction to Computer Science course with a new program that takes a deep dive into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Flask, Django, and Bootstrap.','30', 1, 1, 5, "product-4.jpg", 21, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'Software Architecture','The way that software components subroutines, classes, functions, etc.The interactions between them, is called architecture. In this course you will study the ways these architectures are represented, both in UML and other visual tools. We will introduce the most common architectures, their qualities, and tradeoffs. We will talk about how architectures are evaluated, what makes a good architecture, and an architecture can be improved. We''ll also talk about how the architecture touches on the process of software development.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 2, 10, "product-5.jpg", 90, '2021-01-08 00:30:48', 0);
insert into Course value (null, 5, 'Basic English', 'This course divided into various main sections that you can navigate easily.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 4, 50, "product-6.jpg", 32, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'Basic France', 'With help and tutorials on everything from tenses to prepositions','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','25', 1, 5, 0, "product-7.jpg", 22, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Voice of American', 'help and resources on English words, with explanations','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','25', 1, 4, 0, "product-8.jpg", 90, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'English grammar lessons', 'tutorials and sound files explaining aspects of English pronunciation such as word stress, sentence stress and linking','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','25', 1, 4, 0, "product-9.jpg", 72, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'France with audio and practice', 'play word games like Hangman, and learn France while having fun!','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','35', 1, 5, 0, "product-10.jpg", 66, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Learn Chinese Online', 'With help and tutorials on everything from tenses to prepositions','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','45', 1, 6, 0, "product-11.jpg", 22, '2021-01-07 00:30:48', 0);
insert into Course value (null, 4, 'Learn Mandarin for doing Business in China', 'help and resources on English words, with explanations','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','45', 1, 6, 0, "product-12.jpg", 90, '2021-01-07 00:30:48', 0);
insert into Course value (null, 5, 'Front-End Web Developer', 'tutorials and sound files explaining aspects of English pronunciation such as word stress, sentence stress and linking','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 1, 0, "product-13.jpg", 72, '2021-01-07 00:30:48', 0);
insert into Course value (null, 3, 'Data Structures', 'In this course, you will learn new data structures for efficiently storing and retrieving data that is structured in an ordered sequence',
'Through hands-on projects, you will learn to write and use APIs, 
create interactive UIs, and leverage cloud services like GitHub and Heroku. 
You will emerge with knowledge and experience in principles, languages, and tools that 
empower you to design and deploy applications. Join now to program your own web applications 
and gain critical skills in database design, scalability, security, and user experience.
',30, 0, 3, 0, "product-14.jpg", 20, '2021-01-04 00:30:48', 0);
insert into Course value (null, 3, 'Python Basics for Data Science', 'This Professional Certificate will start you at the absolute beginning teaching the fundamental binary language of modern computers.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','65', 1, 3, 0, "product-1.jpg", 66, '2021-01-03 00:30:48', 0);
insert into Course value (null, 3, 'Machine Learning with Python: A Practical Introduction', 'Learn to think computationally and write programs to tackle useful problems. Use these courses as stepping stones to more advanced computer science courses.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','60', 1, 3, 0, "product-2.jpg", 66, '2021-01-03 00:30:48', 0);
insert into Course value (null, 3, 'HTML5 and CSS Fundamentals', 'play word games like Hangman, and learn France while having fun!','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','35', 1, 1, 0, "product-3.jpg", 66, '2021-01-02 00:30:48', 0);
insert into Course value (null, 4, 'CSS Basics', 'Master the foundational programming languages for Web development, HTML5, CSS and JavaScript, to gain skills in one of the fastest growing careers.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','15', 1, 1, 0, "product-4.jpg", 66, '2021-01-02 00:30:48', 0);
insert into Course value (null, 5, 'Contemporary China', 'Did you know that Chinese is one of the most spoken languages in the world? Whether you’re planning on visiting China to sightsee or are going there to work on a 6-month project, learning the basics of the language will be extremely helpful in your day to day operation.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','10', 1, 6, 0, "product-5.jpg", 66, '2021-01-01 00:30:48', 0);
insert into Course value (null, 5, 'Chinese language', 'Get an introduction to the Chinese language with online courses from top universities and institutions. Online courses on edX include extensive videos and other tools to help you learn pronunciation skills in addition to basic vocabulary and grammar. Learn Mandarin Chinese tones, characters and basic language structure and practice core pronunciation and communication skills, all from the comfort of your computer anywhere in the world.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','20', 1, 6, 0, "product-6.jpg", 66, '2021-01-01 00:30:48', 0);

insert into Course value (null, 3, 'Computer Science for Web Programming', 'The web is a crucial part of our everyday lives.','We rely on websites not just for entertainment and social networking, but for our professions, our finances, our education, and even aspects of our health care. The technologies that run these services are intricate and varied, but there are frameworks and principles that use common languages like HTML and Python that can give you a jump start in building your own web apps.
',30, 1, 1, 0, "product-7.jpg", 20, '2021-01-08 00:30:48', 0);
insert into Course value (null, 3, 'Front-End Web Developer', 'In this course, you will learn new data structures for efficiently storing and retrieving data that is structured in an ordered sequence',
'Through hands-on projects, you will learn to write and use APIs, 
create interactive UIs, and leverage cloud services like GitHub and Heroku. 
You will emerge with knowledge and experience in principles, languages, and tools that 
empower you to design and deploy applications. Join now to program your own web applications 
and gain critical skills in database design, scalability, security, and user experience.
',45, 1, 1, 0, "product-8.jpg", 20, '2021-01-08 00:30:48', 0);
insert into Course value (null, 3, 'Introduction to Databases', 'Each course will also includes interactive examples to help you practice and code the correct way.
','The Web is everywhere! Web development is intricate, creative and interesting work that can lead to an exciting career in an in-demand, fast-growing field.
',40, 1, 1, 0, "product-9.jpg", 20, '2021-01-09 00:30:48', 0);
insert into Course value (null, 3, 'Web development', ' Web development is intricate, creative and interesting work that can lead to an exciting career in an in-demand, fast-growing field.',
'In this Professional Certificate program, designed by the W3C (World Wide Web Consortium), creator of the Web standards, you will learn all of the necessary skills needed to build interactive and responsive user experiences on the Web. This program will deepen your knowledge of the 3 foundational languages that power the Web: HTML5, CSS and JavaScript. You will be guided, step-by-step, on how to use all client-side Web development techniques to create and innovate on the web!
',50, 1, 1, 0, "product-10.jpg", 20, '2021-01-09 00:30:48', 0);
insert into Course value (null, 5, 'books in 17th and 18th century France', ' We will focus on the importance of books as physical objects and the raw material of literature',
'This module also examines how books fit into the legal and political system of France under the Old Regime during the seventeenth and eighteenth centuries, when the French set standards imitated throughout Europe. Before modern copyright, legal books had privileges, granted by the king, which provided a guarantee of quality as well as certification of orthodoxy. To qualify for a privilege, books had to be approved by censors. Uncensored books, including most of the works of the Enlightenment, were usually produced outside France and circulated in the kingdom through a vast underground distribution system.
',50, 1, 5, 0, "product-11.jpg", 20, '2021-01-09 00:30:48', 0);
-- insert lesson
insert into Lesson value (1, null,'Lesson One', 'Introduction to Computer Science', 'video-1.mp4');
insert into Lesson value (1, null,'Lesson Two', 'Web Programming with Python and JavaScript', 'video-2.mp4');
insert into Lesson value (1, null,'Lesson Three', 'HTML5 and CSS Fundamentals', 'video-3.mp4');

insert into Lesson value (2, null,'Lesson One', 'Introduction to Python: Absolute Beginner', 'video-3.mp4');
insert into Lesson value (2, null,'Lesson Two', 'Introduction to Python: Fundamentals', 'video-2.mp4');
insert into Lesson value (2, null,'Lesson Three', 'Artificial Intelligence (AI)', 'video-1.mp4');

insert into Lesson value (3, null,'Lesson One', 'Machine Learning', 'video-1.mp4');
insert into Lesson value (3, null,'Lesson Two', 'Computing in Python I: Fundamentals and Procedural Programming', 'video-3.mp4');
insert into Lesson value (3, null,'Lesson Three', 'Computing in Python II: Control Structures', 'video-2.mp4');

insert into Lesson value (4, null,'Lesson One', 'The Mandarin for Business Professional Certificate Program', 'video-3.mp4');
insert into Lesson value (4, null,'Lesson Two', 'No previous Chinese language experience ', 'video-1.mp4');
insert into Lesson value (4, null,'Lesson Three', 'Beyond the basics of conversation', 'video-2.mp4');

insert into Lesson value (5, null,'Lesson One', 'In the Mandarin Chinese lessons level series', 'video-1.mp4');
insert into Lesson value (5, null,'Lesson Two', 'common phrases', 'video-3.mp4');
insert into Lesson value (5, null,'Lesson Three', 'Asia and the Chinese culture', 'video-2.mp4');

insert into Lesson value (6, null,'Lesson One', 'proper entence structur', 'video-2.mp4');
insert into Lesson value (6, null,'Lesson Two', 'basic structures', 'video-1.mp4');
insert into Lesson value (6, null,'Lesson Three', 'Videos of common discussions', 'video-3.mp4');

insert into Lesson value (7, null,'Lesson One', 'extremely helpful in your day', 'video-2.mp4');
insert into Lesson value (7, null,'Lesson Two', 'The political and economic world of Post-Mao China.', 'video-3.mp4');
insert into Lesson value (7, null,'Lesson Three', 'The period from Deng Xiaoping’s rise in 1978 to the present.', 'video-1.mp4');

insert into Lesson value (8, null,'Lesson One', 'How to examine Chinese history with a multidisciplinary approach.', 'video-1.mp4');
insert into Lesson value (8, null,'Lesson Two', 'Study and demonstrate knowledge on your schedule', 'video-2.mp4');
insert into Lesson value (8, null,'Lesson Three', 'Learn with university partners and peers from around the world', 'video-3.mp4');

insert into Lesson value (9, null,'Lesson One', 'Try a course before you pay', 'video-1.mp4');
insert into Lesson value (9, null,'Lesson Two', 'Drive your career forward with university-backed', 'video-3.mp4');
insert into Lesson value (9, null,'Lesson Three', 'Five important themes in modern', 'video-2.mp4');

insert into Lesson value (10, null,'Lesson One', 'Chinese Dream', 'video-3.mp4');
insert into Lesson value (10, null,'Lesson Two', 'Receive an instructor', 'video-1.mp4');
insert into Lesson value (10, null,'Lesson Three', 'Train your employees', 'video-2.mp4');

insert into Lesson value (11, null,'Lesson One', 'Description', 'video-3.mp4');
insert into Lesson value (11, null,'Lesson Two', 'Description', 'video-2.mp4');
insert into Lesson value (11, null,'Lesson Three', 'Description', 'video-1.mp4');

insert into Lesson value (12, null,'Lesson One', 'Description', 'video-2.mp4');
insert into Lesson value (12, null,'Lesson Two', 'Description', 'video-1.mp4');
insert into Lesson value (12, null,'Lesson Three', 'Description', 'video-3.mp4');

insert into Lesson value (13, null,'Lesson One', 'Develop web sites using the latest web standards', 'video-2.mp4');
insert into Lesson value (13, null,'Lesson Two', 'How to code with modern HTML5 tags, draw and animate fun Web graphics and play audio and video elements', 'video-3.mp4');
insert into Lesson value (13, null,'Lesson Three', 'CSS best practices for web page design', 'video-1.mp4');

insert into Lesson value (14, null,'Lesson One', 'Apply the concepts of entity integrity constraint and referential integrity constraint (including definition of the concept of a foreign key).', 'video-2.mp4');
insert into Lesson value (14, null,'Lesson Two', 'Sketch conceptual data models (including ER) to describe a database structure.
', 'video-1.mp4');

insert into Lesson value (15, null,'Lesson One', 'Description', 'video-2.mp4');
insert into Lesson value (15, null,'Lesson Two', 'Description', 'video-1.mp4');

insert into Lesson value (16, null,'Lesson One', 'Description', 'video-2.mp4');
insert into Lesson value (16, null,'Lesson Two', 'Description', 'video-1.mp4');

insert into Lesson value (17, null,'Lesson One', 'Description', 'video-2.mp4');
insert into Lesson value (17, null,'Lesson Two', 'Description', 'video-1.mp4');

insert into Lesson value (18, null,'Lesson One', 'Develop web sites using the latest web standards', 'video-2.mp4');
insert into Lesson value (18, null,'Lesson Two', 'How to code with modern HTML5 tags, draw and animate fun Web graphics and play audio and video elements', 'video-1.mp4');

insert into Lesson value (19, null,'Lesson One', 'Fundamentals of JavaScript to help you develop interactive web apps', 'video-2.mp4');
insert into Lesson value (19, null,'Lesson Two', 'Understand why accessibility and internationalization are important', 'video-1.mp4');

insert into Lesson value (20, null,'Lesson One', 'Apply queries in SQL to create, read, update and delete data in a database.', 'video-2.mp4');
insert into Lesson value (20, null,'Lesson Two', 'Familiarity in a number of languages, including C, Python, SQL, and JavaScript plus CSS and HTML', 'video-1.mp4');

insert into Lesson value (21, null,'Lesson One', 'How to design and implement web pages and web apps', 'video-2.mp4');
insert into Lesson value (21, null,'Lesson Two', 'The various ways an API can be used', 'video-1.mp4');

insert into Lesson value (22, null,'Lesson One', 'How to scale your web applications', 'video-2.mp4');
insert into Lesson value (22, null,'Lesson Two', 'How to keep track of changes made to code, synchronize code between different people, and test changes to code', 'video-1.mp4');

insert into Lesson value (23, null,'Lesson One', 'Understand why accessibility and internationalization are important', 'video-2.mp4');
insert into Lesson value (23, null,'Lesson Two', 'A broad and robust understanding of computer science and programming', 'video-1.mp4');

insert into Lesson value (24, null,'Lesson One', 'CSS best practices for web page design', 'video-2.mp4');
insert into Lesson value (24, null,'Lesson Two', 'Fundamentals of JavaScript to help you develop interactive web apps', 'video-1.mp4');

insert into Lesson value (25, null,'Lesson One', 'The importance of books as physical objects ', 'video-2.mp4');
insert into Lesson value (25, null,'Lesson Two', 'The construction of books ', 'video-1.mp4');
insert into Lesson value (25, null,'Lesson Two', 'The role of legal books in 17th and 18th century France ', 'video-3.mp4');


-- insert purcahse
insert into Purchased value (1, 1, '2021-01-10 00:30:00', 0, 0, 0);
insert into Purchased value (2, 1, '2021-01-10 00:30:00', 0, 0, 0);

insert into Purchased value (1, 2, '2021-01-10 00:30:00', 0, 0, 0);
insert into Purchased value (2, 2, '2021-01-10 00:30:00', 0, 0, 0);

insert into Purchased value (1, 3, '2021-01-10 00:30:00', 0, 0, 0);
insert into Purchased value (2, 3, '2021-01-10 00:30:00', 0, 0, 0);

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

