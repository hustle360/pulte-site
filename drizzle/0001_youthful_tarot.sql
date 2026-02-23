CREATE TABLE `poll_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320),
	`q0` varchar(255),
	`q1` varchar(255),
	`q2` varchar(255),
	`q3` varchar(255),
	`q4` varchar(255),
	`q5` varchar(255),
	`q6` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `poll_submissions_id` PRIMARY KEY(`id`)
);
