// @flow
import type { State } from '../../common/types';
import HttpError from 'found/lib/HttpError';
import React from 'react';
import queryFirebase from './queryFirebase';
import { makeRouteConfig, Route } from 'found/lib/jsx';
import { onUsersPresence } from '../../common/users/actions';
import { onLoadPosts, onLoadPost } from '../../common/posts/actions';

// Pages
import App from './App';
import HomePage from '../home/HomePage';
import MePage from '../me/MePage';
import ProfilePage from '../me/ProfilePage';
import SettingsPage from '../me/SettingsPage';
import SignInPage from '../auth/SignInPage';
import UsersPage from '../users/UsersPage';
import SubmitPage from '../submit/SubmitPage';
import PostPage from '../posts/PostPage';

// Custom route to require viewer aka authenticated user.
const AuthorizedRoute = () => {};
AuthorizedRoute.createRoute = props => ({
  ...props,
  render: ({ Component, match, props }) => {
    const state: State = match.context.store.getState();
    if (!state.users.viewer) {
      // No redirect, just 401 Unauthorized, so we don't have to handle pesky
      // redirections manually. Check app/renderError.
      throw new HttpError(401);
    }
    return <Component {...props} />;
  },
});

const routeConfig = makeRouteConfig(
  <Route path="/" Component={App}>
    <Route
        Component={HomePage}
        getData={queryFirebase(
                ref => [ref.child('posts'), 'value', onLoadPosts],
          )}
    />
    <Route
        path="posts/:postId"
        Component={PostPage} />
    <AuthorizedRoute path="me" Component={MePage}>
      <Route path="profile" Component={ProfilePage} />
      <Route path="settings" Component={SettingsPage} />
    </AuthorizedRoute>
    <Route path="signin" Component={SignInPage} />
    <AuthorizedRoute path="submit" Component={SubmitPage} />
    <Route
      path="users"
      Component={UsersPage}
      getData={queryFirebase(
        ref => [ref.child('users-presence'), 'value', onUsersPresence],
        // ref => [ref.child('what-ever').limitToFirst(1), 'value', onWhatEver],
      )}
    />
  </Route>,
);

export default routeConfig;
