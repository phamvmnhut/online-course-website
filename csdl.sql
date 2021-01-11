-- Server: sql10.freemysqlhosting.net
-- Name: sql10385446
-- Username: sql10385446
-- Password: BtexVtiUKh
-- Port number: 3306

drop database if exists onlcourse;
create database if not exists onlcourse;
use onlcourse;

drop table if exists `User`;
create table `User`(
    `UserID` int not null auto_increment,
    `Wallet` bigint not null,
    `Avatar` varchar(255),
    `Email` varchar(255) not null unique,
    `FirstName` varchar(50) character set utf8mb4,
    `LastName` varchar(50) character set utf8mb4,
    `DisplayName` varchar(50),
    `Password` varchar(100),
    `Role` tinyint not null,
    `DateCreated` datetime not null,

    primary key (`UserID`)
);

drop table if exists `Field`;
create table `Field`(
    `FieldID` int not null auto_increment,
    `FieldName` varchar(50) character set utf8mb4 not null,
    `FieldDescription` text character set utf8mb4,

    primary key (`FieldID`)
);

drop table if exists `Category`;
create table `Category`(
    `CategoryID` int not null auto_increment,
    `CategoryName` varchar(50) character set utf8mb4 not null,
    `CategoryDescription` text character set utf8mb4,
    `FieldID` int,
    
    primary key (`CategoryID`)
);

drop table if exists `Course`;
create table `Course` (
    `CourseID` int not null auto_increment,
    `TeacherID` int not null,
    `CourseName` varchar(255) character set utf8mb4 not null,
    `ShortDescription` text character set utf8mb4 not null,
    `FullDescription` text character set utf8mb4 not null,
    `Price` bigint not null,
    `State` tinyint not null,
    `CategoryID` int not null,
    `Discount` int,
    `Avatar` varchar(255),
    `DateModified` datetime not null,

    primary key (`CourseID`)
);

drop table if exists `Lesson`;
create table `Lesson`(
    `CourseID` int not null,
    `Section` int not null auto_increment,
    `LessonTitle` varchar(255) character set utf8mb4 not null,
    `LessonDescription` text character set utf8mb4 not null,
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
    `CourseRatingID` int not null auto_increment,
    `StudentID` int not null,
    `CourseID` int not null,
    `Point` int not null,
    `Feedback` text character set utf8mb4 not null,

    primary key (`CourseRatingID`)
);

drop table if exists `Wallet`;
create table `Wallet`(
    `StudentID` int not null,
    `CourseID` int not null,

    primary key (`StudentID`, `CourseID`)
);

alter table Category add foreign key (FieldID) references Field(FieldID);

alter table Course add foreign key (TeacherID) references User(UserID);
alter table Course add foreign key (CategoryID) references Category(CategoryID);

alter table Lesson add foreign key (CourseID) references Course(CourseID);

alter table Learning add foreign key (CourseID) references Course(CourseID);
alter table Learning add foreign key (StudentID) references User(UserID);
alter table Learning add foreign key (Section) references Lesson(Section);

alter table Favorite add foreign key (CourseID) references Course(CourseID);
alter table Favorite add foreign key (StudentID) references User(UserID);

alter table CourseRating add foreign key (CourseID) references Course(CourseID);
alter table CourseRating add foreign key (StudentID) references User(UserID);