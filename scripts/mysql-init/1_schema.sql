USE memid;

-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/67YIkt
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE `user` (
    `user_id` int AUTO_INCREMENT NOT NULL ,
    `username` varchar(200),
    `nonce` integer NOT NULL,
    `public_address` varchar(200) UNIQUE NOT NULL,
    PRIMARY KEY (
        `user_id`
    )
);
