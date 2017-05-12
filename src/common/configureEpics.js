// @flow
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as authEpics } from './auth/actions';
import { epics as usersEpics } from './users/actions';
import { epics as submitEpics } from './submit/actions';
import { epics as postsEpics } from './posts/actions';

const epics = [...appEpics, ...authEpics, ...usersEpics, ...submitEpics, ...postsEpics];

const configureEpics = (deps: Object) =>
  (action$: any, { getState }: any) =>
    combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
