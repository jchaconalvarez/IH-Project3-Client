# minimidi

## Description

Web based DAW.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **500:** As an anon/user I can see a 500 page if something went wrong.
-  **Signup:** As an anon I can sign up in the platform.
-  **Login:** As a user I can login to the platform to begin to play music.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Play music:** As a user I can use a MIDI keyboard to play music.
-  **See Notes:** As a user I can see the music notation while I'm playing.
-  **Save composition:** As a user I can save my song.
-  **Edit composition:** As a user I can edit my song.
-  **Delete composition:** As a user I can delete a song that I created.
-  **See profile:** As a user I can see my profile.
-  **Edit profile:** As a user I can edit my profile.

## Backlog

- Synth
- Live music sheet
- Make it social
- Live music sessions

# Client

## Routes

- `/`
  - HomePageComponent
  - public
- `/auth/signup`
  - SignupPageComponent
  - anon only
  - signup form, link to login
  - navigate to homepage after signup
- `/auth/login`
  - LoginPageComponent
  - anon only
  - login form, link to signup
  - navigate to homepage after login
- `/play`
  - PlayPageComponent
  - user only ???
  - play music
  - see notation
  - select instrument output
  - button to edit
  - button to save
- `/play/:id/edit`
  - EditSongPageComponent
  - user only
  - edit song
  - button to save the edition
- `/profile/me`
  - ProfilePageComponent
  - user only
  - my details
  - button to edit personal information
  - songs created by me
  - button to edit song
  - button to delete song
- `/profile/me/edit`
  - EditProfilePageComponent
  - user only
  - edit personal information
  - button to save the edition
- `/profile/me/:id/edit`
  - EditSongPageComponent
  - user only
  - edit song
  - button to save the edition
- `**`
  - NotFoundPageComponent


## Components

- Sign up Form component
- Log in Form component
- Song Card component
- Piano component
- Board component
- Key component
- Display component

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Song Service
  - song.list()
  - song.create()
  - song.detail()
  - song.edit()
- Profile Service
  - profile.get()
  - profile.edit()

# Server

## Models

User model

```
email			String
password		String
songs			[ObjectID<Song>]
```

Song model

```
player			ObjectID<User>
songName		String
noteHistory:		{Object}
timpeStamp:		Number
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- GET /play
- GET /profile
- Get /dash

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/dbQAdrhq/ironhack-project-3)

### Git

[Client repository Link](https://github.com/jchaconalvarez/IH-Project3-Client.git)

[Server repository Link](https://github.com/jchaconalvarez/IH-Project3-Server.git)

### Heroku

[Deploy Link](https://minimidi-server.herokuapp.com)

### Firebase

[Deploy Link](https://minimidi-client.firebaseapp.com/)

### Slides

[Slides Link](https://slides.com/jchaconalvarez/midiact#/)
