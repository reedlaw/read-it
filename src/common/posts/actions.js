// @flow
import type { Action, Deps, Post, User } from '../types';
import { ValidationError } from '../lib/validation';
import { Observable } from 'rxjs/Observable';
import { appError } from '../app/actions';
import { dissoc } from 'ramda';

export const likePost = (post: Post, user: ?User): Action => ({
  type: 'LIKE_POST',
  payload: { post, user },
});

export const likePostDone = (posts: Object): Action => {
  return {
    type: 'LIKE_POST_DONE',
    payload: { posts },
  };
};

export const likePostFail = (error: Error): Action => ({
  type: 'LIKE_POST_FAIL',
  payload: { error },
});

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

const likePostEpic = (action$: any, { firebaseDatabase }: Deps) =>
  action$.filter((action: Action) => action.type === 'LIKE_POST').mergeMap(({
    payload: { post, user },
  }) => {
    if (user) {
      const { id } = post;
      post.score += 1;
      const promise = firebaseDatabase().ref(`users-likes/${user.id}/${id}`).once('value', (snapshot) => {
        if (!snapshot.val()) {
          firebaseDatabase().ref(`posts/${id}`).set({ post });
          firebaseDatabase().ref(`users-likes/${user.id}/${id}`).set(true);
        }
      })
      return Observable.from(promise)
                       .map(firebasePosts => likePostDone(firebasePosts))
                       .catch(error => {
                         console.log(error);
                         console.log(error.code);
                         return Observable.of(likePostFail(error));
                       });
    } else {
      const error = new ValidationError('auth', { user });
      return Observable.of(likePostFail(error));
    }
  });

export const epics = [likePostEpic];
