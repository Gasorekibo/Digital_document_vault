import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseUrl';
//Create doc action
export const redirectAfterDocsCreation = createAction('redirect/AfterCreation');
export const redirectAfterDocsUpdated = createAction('redirect/AfterUpdated');
export const redirectAfterDocsDeleted = createAction('redirect/AfterDeleted');
//Upload
export const uploadDocumentAction = createAsyncThunk(
  'doc/upload',
  async (doc, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append('filename', doc?.filename);
      formData.append('category', doc?.category);
      formData.append('image', doc?.image);
      const { data } = await axios.post(
        baseURL + '/file/upload',
        formData,
        config
      );
      dispatch(redirectAfterDocsCreation());
      console.log(data)
      return data;
    } catch (error) {
      console.log('error ' + error);
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ====== Update a doc =======

export const updatePostAction = createAsyncThunk(
  'post/updated',
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.put(
        `${baseURL}/api/post/${post?.id}`,
        post,
        config
      );
      dispatch(redirectAfterDocsUpdated());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//  ===== doc
export const deleteDocumentAction = createAsyncThunk(
  'doc/delete',
  async (docId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.user;

    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.delete(
        `${baseURL}/file/delete/${docId}`,
        config
      );
      dispatch(redirectAfterDocsDeleted());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ---------- Fetch all doc action----------

export const fetchAllDocumentAction = createAsyncThunk(
  'post/fetchAll',
  async ( _,{ rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseURL}/file/all`, config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.message);
    }
  }
);

// ======= Fetch Single doc Detail ========
export const fetchPostDetailsAction = createAsyncThunk(
  'post/details',
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/api/post/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.message);
    }
  }
);

// ========= Doc Slices ==========
const docSlice = createSlice({
  name: 'docs',
  initialState: {},
  extraReducers: (builder) => {
    //create post
    builder.addCase(uploadDocumentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(redirectAfterDocsCreation, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(uploadDocumentAction.fulfilled, (state, action) => {
      console.log(action.payload)
      state.docUploaded = action?.payload;
      state.isCreated = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(uploadDocumentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(redirectAfterDocsUpdated, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.isUpdated = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //Delete post
    builder.addCase(deleteDocumentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(redirectAfterDocsDeleted, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteDocumentAction.fulfilled, (state, action) => {
      state.postDeleted = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteDocumentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //get all posts
    builder.addCase(fetchAllDocumentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchAllDocumentAction.fulfilled, (state, action) => {
      state.docLists = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllDocumentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Single post Details

    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
export default docSlice.reducer;
