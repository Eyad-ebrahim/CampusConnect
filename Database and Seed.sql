-- ==========================================================
-- CampusConnect
-- Database Schema and Seed Data
-- ==========================================================

DROP SCHEMA IF EXISTS "CampusConnect" CASCADE;

CREATE SCHEMA "CampusConnect";

-- ==========================================================
-- Users
-- ==========================================================

CREATE TABLE "CampusConnect"."Users" (
    "userId" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- Communities
-- ==========================================================

CREATE TABLE "CampusConnect"."Communities" (
    "communityId" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL
);

-- ==========================================================
-- Memberships
-- ==========================================================

CREATE TABLE "CampusConnect"."Memberships" (
    "membershipId" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_membership_user
        FOREIGN KEY ("userId")
        REFERENCES "CampusConnect"."Users"("userId")
        ON DELETE CASCADE,

    CONSTRAINT fk_membership_community
        FOREIGN KEY ("communityId")
        REFERENCES "CampusConnect"."Communities"("communityId")
        ON DELETE CASCADE,

    CONSTRAINT unique_membership
        UNIQUE ("userId", "communityId")
);

-- ==========================================================
-- Posts
-- ==========================================================

CREATE TABLE "CampusConnect"."Posts" (
    "postId" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_post_user
        FOREIGN KEY ("userId")
        REFERENCES "CampusConnect"."Users"("userId")
        ON DELETE CASCADE,

    CONSTRAINT fk_post_community
        FOREIGN KEY ("communityId")
        REFERENCES "CampusConnect"."Communities"("communityId")
        ON DELETE CASCADE
);

-- ==========================================================
-- Comments
-- ==========================================================

CREATE TABLE "CampusConnect"."Comments" (
    "commentId" SERIAL PRIMARY KEY,
    "body" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comment_user
        FOREIGN KEY ("userId")
        REFERENCES "CampusConnect"."Users"("userId")
        ON DELETE CASCADE,

    CONSTRAINT fk_comment_post
        FOREIGN KEY ("postId")
        REFERENCES "CampusConnect"."Posts"("postId")
        ON DELETE CASCADE
);

-- ==========================================================
-- Interactions
-- ==========================================================

CREATE TABLE "CampusConnect"."Interactions" (
    "interactionId" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" INTEGER NOT NULL,
    "interactionType" TEXT NOT NULL,
    "interactedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_interaction_user
        FOREIGN KEY ("userId")
        REFERENCES "CampusConnect"."Users"("userId")
        ON DELETE CASCADE,

    CONSTRAINT chk_target_type
        CHECK ("targetType" IN ('Community', 'Post')),

    CONSTRAINT chk_interaction_type
        CHECK ("interactionType" IN ('Joined', 'Viewed', 'Commented'))
);

-- ==========================================================
-- Indexes
-- ==========================================================

CREATE INDEX idx_memberships_user
ON "CampusConnect"."Memberships"("userId");

CREATE INDEX idx_memberships_community
ON "CampusConnect"."Memberships"("communityId");

CREATE INDEX idx_posts_user
ON "CampusConnect"."Posts"("userId");

CREATE INDEX idx_posts_community
ON "CampusConnect"."Posts"("communityId");

CREATE INDEX idx_comments_post
ON "CampusConnect"."Comments"("postId");

CREATE INDEX idx_comments_user
ON "CampusConnect"."Comments"("userId");

CREATE INDEX idx_interactions_user
ON "CampusConnect"."Interactions"("userId");

-- ==========================================================
-- Seed Data
-- ==========================================================

-- Users

INSERT INTO "CampusConnect"."Users"
("username","email","passwordHash")
VALUES
('Ahmed Ali','ahmed@example.com','$2b$10$ExampleHash1'),
('Sara Mohamed','sara@example.com','$2b$10$ExampleHash2'),
('Omar Hassan','omar@example.com','$2b$10$ExampleHash3'),
('Mariam Adel','mariam@example.com','$2b$10$ExampleHash4'),
('Youssef Khaled','youssef@example.com','$2b$10$ExampleHash5'),
('Nour Ibrahim','nour@example.com','$2b$10$ExampleHash6');

-- Communities

INSERT INTO "CampusConnect"."Communities"
("name","description")
VALUES
('Computer Science Club','A community for students interested in programming, software engineering, and technology.'),
('Football Club','A community for students who enjoy football and sports activities.'),
('Robotics Team','A community focused on robotics projects and competitions.'),
('Photography Club','A place for photography enthusiasts to share their work and organize events.'),
('Gaming Community','A community for students interested in video games and eSports.'),
('AI Society','A community dedicated to artificial intelligence and machine learning.');

-- Memberships

INSERT INTO "CampusConnect"."Memberships"
("userId","communityId")
VALUES
(1,1),
(1,6),
(2,2),
(2,4),
(3,3),
(3,1),
(4,4),
(5,5),
(6,6);

-- Posts

INSERT INTO "CampusConnect"."Posts"
("title","body","userId","communityId")
VALUES
('Welcome to the Club','Welcome everyone to the Computer Science Club!',1,1),

('Programming Contest',
'The annual programming contest will be held next week.',
1,1),

('Friday Match',
'Join us this Friday for our weekly football match.',
2,2),

('New Robotics Workshop',
'Our robotics workshop starts next Monday.',
3,3),

('Photography Walk',
'Let's organize a photography walk around campus this weekend.',
4,4),

('Gaming Tournament',
'Who wants to participate in the FIFA tournament?',
5,5),

('AI Study Group',
'We will discuss neural networks this Thursday.',
6,6),

('Hackathon',
'Looking for teammates for the university hackathon.',
3,1),

('Camera Recommendations',
'Which beginner DSLR camera do you recommend?',
2,4),

('Machine Learning Resources',
'Share your favourite ML courses and books.',
1,6);

-- Comments

INSERT INTO "CampusConnect"."Comments"
("body","userId","postId")
VALUES
('Looking forward to it!',2,1),

('Great idea!',3,1),

('Count me in!',1,3),

('Excited for this workshop.',4,4),

('I will join.',6,5),

('Sounds fun!',2,6),

('Thank you for sharing.',5,7),

('I am interested.',4,8),

('Canon EOS is a great choice.',1,9),

('Andrew Ng''s course is excellent.',3,10);

-- Interactions

INSERT INTO "CampusConnect"."Interactions"
("userId","targetType","targetId","interactionType")
VALUES
(1,'Community',1,'Joined'),
(1,'Community',6,'Joined'),
(2,'Community',2,'Joined'),
(3,'Community',3,'Joined'),
(4,'Community',4,'Joined'),
(5,'Community',5,'Joined'),
(6,'Community',6,'Joined'),
(2,'Post',1,'Viewed'),
(3,'Post',1,'Commented'),
(1,'Post',3,'Viewed'),
(5,'Post',7,'Viewed'),
(6,'Post',10,'Commented');