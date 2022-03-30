# Welcome to my app!

🔗 [Live App](https://stupendous-dolphin-daa363.netlify.app/).

This is a Music Player for Web Application Programming (WDDM-120) course, part of the Web Design and Development Program at Humber College.

When you click in "Log In", you will find some User Credentials for testing the app.

This App includes the following:

- Login with Firebase Authentication (email and password)
- Each user has access to a different collection of Tracks in a Firestore Database
- Each track in the Firebase Database has trackID that allows it to retrieve its cover art from Firebase Storage. The trackID is the same for identical Tracks that appear in multiple collections. Unlike unique IDs, trackID allows the same track in different collections to connect with its respective cover art (or any other stored track info) without the need to store it more than once.
- General interactions:
    - Play/pause Track
    - Next/previous Track
    - Display Tracklist and select Track
    - Progress Bar
    - Dynamic Style

You can certanly create [new users](/register.html) for testing propouses, but you will have an empty database, which won't let the App work properly. Contact the administrator if you want your Tracks to be added.