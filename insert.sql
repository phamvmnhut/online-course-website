-- insert category
insert into Field value (null, 'IT', 'Information and Technology');
insert into Field value (null, 'Language', 'Method of comunication');

insert into Category value (null, 'Web', 'Information and Technology', 1);
insert into Category value (null, 'Android', 'Information and Technology', 1);
insert into Category value (null, 'English', 'Method of comunication', 2);
insert into Category value (null, 'France', 'Method of comunication', 2);

-- insert user 
insert into User value (null, 0, null, 'email1@gmail.com', 'Selena', 'Gomez', 'Selena Gomez', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 0, '2021-01-07 00:30:48');
insert into User value (null, 2000, null, 'email2@gmail.com', 'John', 'Legend', 'John Legend', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 0, '2021-01-07 00:30:48');

insert into User value (null, 50000, null, 'email3@gmail.com', 'Laurie', 'Santos', 'Laurie Santos', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48');
insert into User value (null, 40000, null, 'email4@gmail.com', 'Andrew', 'Joseph', 'Andrew Joseph', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 1, '2021-01-07 00:30:48');

insert into User value (null, 50000, null, 'email5@gmail.com', 'first name', 'last name', 'admin1', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 2, '2021-01-07 00:30:48');
insert into User value (null, 200000, null, 'email6@gmail.com', 'first name', 'last name', 'admin2', '$2a$10$QzY8lub0NT5LgClXQzYWqOc/bR6Ttn8VW6BzibtyKvjnhjMaz0Cse', 2, '2021-01-07 00:30:48');

-- insert Course
insert into Course value (null, 1, 'Ordered Data Structures', 'In this course, you will learn new data structures for efficiently storing and retrieving data that is structured in an ordered sequence',
'This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
',30, 0, 1, null, null, '2021-01-07 00:30:48');
insert into Course value (null, 1, 'Python for Genomic Data Science', 'This class provides an introduction to the Python programming language and the iPython notebook. This is the third course in the Genomic Big Data Science Specialization from Johns Hopkins University.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0,1, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 1, 'A Complete Reinforcement Learning System', 'In this final course, you will put together your knowledge from Courses 1, 2 and 3 to implement a complete RL solution to a problem. This capstone will let you see how each component---problem formulation, algorithm selection, parameter selection and representation design---fits together into a complete solution, and how to make appropriate choices when deploying RL in the real world. This project will require you to implement both the environment to stimulate your problem, and a control agent with Neural Network function approximation. In addition, you will conduct a scientific study of your learning system to develop your ability to assess the robustness of RL agents. To use RL in the real world, it is critical to (a) appropriately formalize the problem as an MDP, (b) select appropriate algorithms, (c ) identify what choices in your implementation will have large impacts on performance and (d) validate the expected behaviour of your algorithms. This capstone is valuable for anyone who is planning on using RL to solve real problems.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0, 1, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 1, 'Academic Skills for University Success', 'This Specialization is aimed at preparing students for undergraduate study in an English-speaking university. The course equips you for full participation and engagement with your studies by building awareness and understanding of the core values and expectations of academic culture, and providing you with practical strategies to apply to your studies. 
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 1, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 1, 'Software Architecture','The way that software components subroutines, classes, functions, etc. Ã¢Â€Â”  are arranged,  and the interactions between them, is called architecture. In this course you will study the ways these architectures are represented, both in UML and other visual tools. We will introduce the most common architectures, their qualities, and tradeoffs. We will talk about how architectures are evaluated, what makes a good architecture, and an architecture can be improved. We''ll also talk about how the architecture touches on the process of software development.
','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 2, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 2, 'Basic English', 'This course divided into various main sections that you can navigate easily.','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1, 2, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 2, 'Basic France', 'With help and tutorials on everything from tenses to prepositions','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0, 2, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 2, 'Voice of American', 'help and resources on English words, with explanations','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1,2, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 2, 'English grammar lessons', 'tutorials and sound files explaining aspects of English pronunciation such as word stress, sentence stress and linking','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 0,2, 0, 'avt1', '2021-01-07 00:30:48');
insert into Course value (null, 2, 'France with audio and practice', 'play word games like Hangman, and learn France while having fun!','This course presents an introduction to the basics of financial accounting and finance for IT professionals. The first part of the course will focus on understanding the most important financial statements, namely, the balance sheet, the income statement, and the statement of cash flows. We will then focus on how we can understand the financial health and performance of the company by examining a number of important financial ratios that are derived from the financial statements of the company. The second part of the course will focus on the basics of finance. This includes the concept of time value of money, discounting cash flows, and capital budgeting. The course will also introduce the idea of real options, how they affect a projectÃ¢Â€Â™s NPV, and their impact of the decision to accept/reject a project. Lectures on concepts will be supplemented with numerical examples.
','30', 1,2, 0, 'avt1', '2021-01-07 00:30:48');

-- insert feedback ~ rating
insert into CourseRating value (null, 1, 1, 5, 'I really like it, best course I''ve ever had.');
insert into CourseRating value (null, 2, 1, 4, 'Lots of difficult chapters but the teacher was very friendly.');

insert into CourseRating value (null, 1, 2, 4, 'i like this course too much, it help me have many kind of skills in uni');
insert into CourseRating value (null, 2, 2, 4, 'Very well explained with good experimental evidences. Though basic derivation of equations are not shown. At least should have been mentioned "references".\n\nOverall I am benefitted.');

insert into CourseRating value (null, 1, 3, 5, 'It covers a lot of material in a short span of time, so retention is key. Make sure to take a lot of notes and give yourself some time to really process all the material from each week.');
insert into CourseRating value (null, 2, 3, 3, "The instructors were highly-qualified, and they didnt let the presentations get boring at all. The materials were well-planned. Overall, it's an excellent course for introduction to VVER technology.");

-- insert 