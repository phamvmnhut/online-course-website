drop database if exists onlcourse;
create database if not exists onlcourse;
use onlcourse;

drop table if exists `User`;
create table `User`(
    `ID` int not null auto_increment,
    `Wallet` bigint not null,
    `Avatar` varchar(255),
    `Email` varchar(255) not null unique,
    `FirstName` varchar(50) character set utf8mb4 not null,
    `LastName` varchar(50) character set utf8mb4 not null,
    `DisplayName` varchar(50),
    `Password` varchar(100),
    `Role` tinyint not null,
    `DateCreated` datetime not null,

    primary key (`ID`)
);

drop table if exists `Category`;
create table `Category`(
    `ID` int not null,
    `Name` varchar(50) character set utf8mb4 not null,
    `Description` text character set utf8mb4,

    primary key (`ID`)
);

drop table if exists `Course`;
create table `Course` (
    `ID` int not null auto_increment,
    `TeacherID` int not null,
    `Name` varchar(255) character set utf8mb4 not null,
    `ShortDescription` varchar(255) character set utf8mb4 not null,
    `FullDescription` text character set utf8mb4 not null,
    `Price` bigint not null,
    `State` tinyint not null,
    `CategoryID` int not null,
    `Discount` int not null,
    `Avatar` varchar(255) not null,
    `DateModified` datetime not null,

    primary key (`ID`)
);
alter table `Course` add fulltext(`Name`, `ShortDescription`, `FullDescription`);

drop table if exists `Lesson`;
create table `Lesson`(
    `CourseID` int not null,
    `Title` varchar(255) character set utf8mb4 not null,
    `Description` text character set utf8mb4 not null,
    `Section` int not null,
    `Video` varchar(255) not null,

    primary key (`Section`, `CourseID`)
);

drop table if exists `Learning`;
create table `Learning`(
    `CourseID` int not null,
    `StudentID` int not null,
    `Section` int not null,
    `State` tinyint not null,

    primary key (`CourseID`, `StudentID`, `Section`)
);

drop table if exists `Purchased`;
create table `Purchased`(
    `StudentID` int not null,
    `CourseID` int not null,
    `DatePurchased` datetime not null,

    primary key (`StudentID`, `CourseID`)
);

drop table if exists `Favorite`;
create table `Favorite`(
    `StudentID` int not null,
    `CourseID` int not null,

    primary key (`StudentID`, `CourseID`)
);

drop table if exists `CourseRating`;
create table `CourseRating`(
    `ID` int not null auto_increment,
    `StudentID` int not null,
    `CourseID` int not null,
    `Point` int not null,
    `Feedback` text character set utf8mb4 not null,

    primary key (`ID`)
);

drop table if exists `Wallet`;
create table `Wallet`(
    `StudentID` int not null,
    `CourseID` int not null,

    primary key (`StudentID`, `CourseID`)
);

alter table Course add foreign key (TeacherID) references User(ID);
alter table Course add foreign key (CategoryID) references Category(ID);

alter table Lesson add foreign key (CourseID) references Course(ID);

alter table Learning add foreign key (CourseID) references Course(ID);
alter table Learning add foreign key (StudentID) references User(ID);
alter table Learning add foreign key (Section) references Lesson(Section);

alter table Favorite add foreign key (CourseID) references Course(ID);
alter table Favorite add foreign key (StudentID) references User(ID);

alter table CourseRating add foreign key (CourseID) references Course(ID);
alter table CourseRating add foreign key (StudentID) references User(ID);

    -- $2a$10$6sB88sZQ6G4mQ6DnjYDMJuQc0gZSRApKYM8LcXk52k1WwM2AT8sh2
