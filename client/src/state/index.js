import { createSlice } from '@reduxjs/toolkit';

// global state which would be available in our whole application, and we don't need to pass state props here and there.
const initialState = {
  mode: 'dark',
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFreinds: (state, action) => {
      if (state.user) {
        state.user.freinds = action.payload.freinds;
      } else {
        console.error('user freinds non-existent');
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFreinds, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
