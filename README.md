# PostIt - Go Social 👨🏾‍🤝‍👨

Welcome to PostIt! The social media platform for people who love to 🍴 🔁 😴 🔁 👩🏻‍💻

## 📝Instructions to run the project in your machine

- fork this
- copy the git remote url
- create a new git repo in your machine
- add, commit, switch to main, and then `git remote add origin ${remoteUrl}`
- git pull all from here onto your machine
- `cd client` -> `npm install`
- `cd server` -> `npm install`

### And, then an important part comes into the picture, `.env` for backend

- You need to put these variables, in there as according to comments,
  ```
  MONGO_URL= // url to your mongodb cloud database on atlas
  JWT_SECRET= // secret key for creating jwt token of each loggedin user
  PORT= // port for your backend to run - !imp 3301 is currently for this project
  ```

### And, `.env` for frontend

- You need to put these variables, in there as according to comments,
  ```
  REACT_APP_IS_PROD= // 'true' or 'false'
  REACT_APP_BACKEND_PROD= // prod url of backend
  REACT_APP_BACKEND_DEV= // dev url of backend
  ```

# Happy Socializing 😁
