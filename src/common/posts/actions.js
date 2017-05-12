// @flow
import type { Action, Deps } from '../types';
import { Observable } from 'rxjs/Observable';
import { appError } from '../app/actions';
import { dissoc } from 'ramda';

export const onLoadPosts = (snap: Object): Action => {
  const posts = snap.val();
  return {
    type: 'ON_LOAD_POSTS',
    payload: { posts },
  };
};

export const savePostDone = (): Action => ({
  type: 'SAVE_POST_DONE',
});

const savePostEpic = (action$: any, { firebase }: Deps) =>
  Observable.merge(
    action$.filter((action: Action) => action.type === 'SUBMIT_POST_DONE'),
  ).mergeMap(action => {
    const { post } = action.payload.post;
    const promise = firebase.update({
      [`posts/${post.id}`]: post,
    });
    return Observable.from(promise)
                     .map(savePostDone)
                     .catch(error => Observable.of(appError(error)));
  });

export const epics = [savePostEpic];
