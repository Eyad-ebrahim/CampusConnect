-- ==========================================================
-- CampusConnect Database Schema
-- ==========================================================

DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS interactions CASCADE;
DROP TABLE IF EXISTS memberships CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS communities CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ==========================================================
-- USERS
-- ==========================================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- COMMUNITIES
-- ==========================================================

CREATE TABLE communities (
    community_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL
);

-- ==========================================================
-- MEMBERSHIPS
-- ==========================================================

CREATE TABLE memberships (
    membership_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    community_id INTEGER NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_membership_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_membership_community
        FOREIGN KEY (community_id)
        REFERENCES communities(community_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_membership
        UNIQUE (user_id, community_id)
);

-- ==========================================================
-- POSTS
-- ==========================================================

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    community_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_post_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_post_community
        FOREIGN KEY (community_id)
        REFERENCES communities(community_id)
        ON DELETE CASCADE
);

-- ==========================================================
-- COMMENTS
-- ==========================================================

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comment_post
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id)
        ON DELETE CASCADE
);

-- ==========================================================
-- INTERACTIONS
-- ==========================================================

CREATE TABLE interactions (
    interaction_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    target_type VARCHAR(20) NOT NULL,
    target_id INTEGER NOT NULL,
    interaction_type VARCHAR(30) NOT NULL,
    interacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_interaction_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT chk_target_type
        CHECK (target_type IN ('Community', 'Post')),

    CONSTRAINT chk_interaction_type
        CHECK (interaction_type IN ('Joined','Viewed','Commented','Posted'))
);





-- ==========================================================
-- Seed Data
-- ==========================================================

-- ==========================
-- USERS
-- ==========================

INSERT INTO users (username, email, password_hash)
VALUES
('Mohamed','test@test.com','$2b$10$svdv8h9Z3I0SYMKD/1h8isuwQlShGlmR6yvjBBv9h1BwW2PxzZo/3G'),
('Eslam Kabonga','ahmed@example.com','$2b$10$svdv8h9Z3I0SYMKD/1h8isuwQlShGlmR6yvjBBv9h1BwW2PxzZo/3G'),
('Sara','sara@example.com','$2b$10$svdv8h9Z3I0SYMKD/1h8isuwQlShGlmR6yvjBBv9h1BwW2PxzZo/3G'),
('Omar Hassan','omar@example.com','$2b$10$svdv8h9Z3I0SYMKD/1h8isuwQlShGlmR6yvjBBv9h1BwW2PxzZo/3G'),
('Ali','ali456@test.com','$2b$10$QlWMGhA4IJITIXyDI77ujeSLgJvMF5IRYhP.3ggoeDP0uGFTc8Rje'),
('Aloosh','Aloosh@test.com','$2b$10$DGnzc/qCx2J.w2FWB.J4JuWh3sIzADIr2yJp4FxDdjm3NuMFBPMS');

-- ==========================
-- COMMUNITIES
-- ==========================

INSERT INTO communities (name, description)
VALUES
('AI Club','Community for AI enthusiasts'),
('Computer Science Club','Community for Computer Science students.'),
('Football Club','Community for students who enjoy football.'),
('Robotics Team','Community for robotics enthusiasts.');

-- ==========================
-- MEMBERSHIPS
-- ==========================

INSERT INTO memberships (user_id, community_id)
VALUES
(2,2),
(3,3),
(4,4),
(1,1),
(1,3);

-- ==========================
-- POSTS
-- ==========================

INSERT INTO posts (title, body, user_id, community_id)
VALUES
('Welcome Everyone!',
'Welcome to the Computer Science Club community.',
2,2),

('Football Match',
'Join us this Friday for a friendly football match.',
3,3),

('Workshop Announcement',
'Our robotics workshop starts next Monday.',
4,4),

('Testing API',
'This post was created from Postman.',
1,1),

('My First Community Post',
'This is a test post for the recommendation system.',
1,1),

('My First Community Post',
'This is a test post for the recommendation system.',
1,1),

('My First Community Post',
'This is a test post for the recommendation system.',
1,1),

('HI',
'HI 2',
6,1),

('hl',
'hl',
6,4),

('Hi',
'hi',
6,3);

-- ==========================
-- COMMENTS
-- ==========================

INSERT INTO comments (body, user_id, post_id)
VALUES
('Looking forward to it!',3,1),
('Count me in!',4,2),
('Sounds exciting!',2,3),
('Nice post!',1,5),
('This is my interaction test comment.',1,1),
('Hello from React',1,8),
('HIIIIIIII',6,5);

-- ==========================
-- INTERACTIONS
-- ==========================

INSERT INTO interactions
(user_id, target_type, target_id, interaction_type)
VALUES
(2,'Community',2,'Joined'),
(3,'Post',1,'Viewed'),
(4,'Post',3,'Commented'),
(1,'Community',1,'Joined'),
(1,'Post',1,'Viewed'),
(1,'Post',1,'Viewed'),
(1,'Post',1,'Commented'),
(1,'Post',8,'Posted'),
(1,'Community',3,'Joined'),
(1,'Post',9,'Posted'),
(6,'Community',1,'Joined'),
(6,'Community',2,'Joined');