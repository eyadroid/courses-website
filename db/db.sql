CREATE TABLE `categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `parent_id` integer
);

CREATE TABLE `courses` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `thumbnail` varchar(255),
  `description` varchar(255),
  `duration_hours` integer,
  `views` integer,
  `category_id` integer
);

CREATE TABLE `course_videos` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `thumbnail` varchar(255),
  `description` varchar(255),
  `duration_seconds` integer,
  `video_path` varchar(255),
  `course_id` integer
);

ALTER TABLE `categories` ADD FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);

ALTER TABLE `courses` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `course_videos` ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);
