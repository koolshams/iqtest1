import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import action_itemsSlice from './action_items/action_itemsSlice';
import collegesSlice from './colleges/collegesSlice';
import companiesSlice from './companies/companiesSlice';
import counselorsSlice from './counselors/counselorsSlice';
import my_collegesSlice from './my_colleges/my_collegesSlice';
import parentsSlice from './parents/parentsSlice';
import sessionsSlice from './sessions/sessionsSlice';
import studentsSlice from './students/studentsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import companySlice from './company/companySlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    action_items: action_itemsSlice,
    colleges: collegesSlice,
    companies: companiesSlice,
    counselors: counselorsSlice,
    my_colleges: my_collegesSlice,
    parents: parentsSlice,
    sessions: sessionsSlice,
    students: studentsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    company: companySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
