# CampusConnect

## Technologies Used
We are using :
- React
- React Router
And for mock data because we still didnt implement data base
- Context API files
- Local Storage


-------------------------------------------------------------------

## How to Run the Project from the terminal
1. Clone the repository
2. Navigate into the project
cd CampusConnect\frontend
3. Install dependencies
     npm install
4. Start the development server
npm run dev

5. Open the application

Open the URL shown in the terminal (usually):
http://localhost:5173
------------------------------------------------------------------------------------------------
# Project Features
## Authentication
Location:
- Login Page(src/pages/Login/Login.jsx) --- (src/pages/Login/Login.css)
- Register Page(src/pages/Register/Register.jsx) --- (src/pages/Register/Register.css)

Features:
- Register a new account
- Login
- User session is stored in Local Storage
- Joined communities are saved per user

---

## Community Directory

Location:
- (src/pages/CommunityDirectory/CommunityDirectory.jsx) --- (src/pages/CommunityDirectory/CommunityDirectory.css)

Features:
- Browse all communities
- Search for communities
- Join or leave communities
- Community member count updates automatically

---

## Community Details

Location:
- (src/pages/CommunityPage/CommunityPage.jsx) --- (src/pages/CommunityPage/CommunityPage.css)

Features:
- View community information
- View posts belonging to the community
- Create new posts
- Delete your own posts

## Create Post

Location:
- (src/pages/CreatePost/CreatePost.jsx) --- (src/pages/CreatePost/CreatePost.css)

Features:
- Create a new post within a community
- Validate required fields before submission
- Store posts in Local Storage
- Display the newly created post immediately in the selected community
- Associate each post with the currently logged-in user

## Post Details

Location:
- (src/pages/PostDetail/PostDetail.jsx) --- (src/pages/PostDetail/PostDetail.css)

Features:
- View the full post
- View comments
- Add comments
- Delete your own comments

---

## User Profile

Location:
- (src/pages/Profile/Profile.jsx) --- (src/pages/Profile/Profile.css)

Features:
- View user information
- View joined communities
- View created posts
- View created comments

---

## Recommendations

Location:
- (src/pages/Recommendations/Recommendations.jsx) --- (src/pages/Recommendations/Recommendations.css)

Features:
- Personalized recommendations
- Recommendations are generated using recorded user interactions
- Communities already joined are excluded
- Users can:
  - View Community
  - Join & Visit directly

Recommendation score is calculated using:

- Join = 3 points
- Comment = 2 points
- View = 1 point

Communities from categories with the highest scores are recommended first.

---

## Interaction Tracking

The application records the following user interactions:

- Joining a community
- Viewing a post
- Commenting on a post

These interactions are stored in Local Storage and are used by the recommendation system.

---

# Data Persistence

The application uses Local Storage to persist:

- Users
- Current logged-in user
- Communities
- Joined communities
- Member counts
- Posts
- Comments
- User interactions

Refreshing the browser will not remove stored data.

---

# Project Structure
src/
│
├── components/
│
├── context/
│   ├── AuthContext.jsx
│   ├── CommunityContext.jsx
│   ├── PostContext.jsx
│   ├── CommentContext.jsx
│   └── InteractionContext.jsx
│
├── data/
│   ├── communities.js
│   ├── posts.js
│   ├── comments.js
│   └── users.js
│
├── pages/
│   ├── Login/
│   ├── Register/
│   ├── CommunityDirectory/
│   ├── CommunityPage/
│   ├── PostDetail/
│   ├── Profile/
│   └── Recommendations/
│
└── App.jsx


------------------------------------------------------------------------------------------------

