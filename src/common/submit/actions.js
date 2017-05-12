// @flow
import type { Action, Deps, Post } from '../types';
import firebaseMessages from './firebaseMessages';
import invariant from 'invariant';
import createPostFirebase from '../posts/createPostFirebase';
import { Observable } from 'rxjs/Observable';
import { ValidationError } from '../lib/validation';
import { appError } from '../app/actions';

export const submitPost = (text: string, title: string, url: string) =>
  ({ getUid, now }: Deps): Action => ({
    type: 'SUBMIT_POST',
    payload: {
      post: {
        createdAt: now(),
        id: getUid(),
        text: text.trim(),
        title: title.trim(),
        url: url.trim(),
      },
    },
  });

export const submitPostDone = (firebasePost: Object): Action => ({
  type: 'SUBMIT_POST_DONE',
  payload: {
    post: createPostFirebase(firebasePost),
  },
});

export const submitPostFail = (error: Error): Action => ({
  type: 'SUBMIT_POST_FAIL',
  payload: { error },
});

export const likePost = (id: string): Action => ({
  type: 'LIKE_POST',
  payload: { id },
});

const mapFirebaseErrorToEsteValidationError = code => {
  const prop = {
    'auth/email-already-in-use': 'email',
    'auth/invalid-email': 'email',
    'auth/user-not-found': 'email',
    'auth/wrong-password': 'password',
  }[code];
  return new ValidationError(code, { prop });
};

const validatePost = (validate, fields) =>
  validate(fields)
    .prop('title')
    .required().promise;

const submitPostEpic = (action$: any, { firebaseDatabase, validate }: Deps) =>
  action$.filter((action: Action) => action.type === 'SUBMIT_POST').mergeMap(({
    payload: { post },
  }) => {
    const { id, title } = post;
    const promise = validatePost(validate, {
      title,
    }).then(() =>
      firebaseDatabase().ref(`posts/${id}`).set({ post })
    );
    return Observable.from(promise)
                     .map(firebasePost => submitPostDone(firebasePost))
                     .catch(error => {
                       console.log(error);
                       console.log(error.code);                       
                       return Observable.of(submitPostFail(error));
                     });
  });

export const epics = [submitPostEpic];
