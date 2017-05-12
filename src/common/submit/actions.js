// @flow
import type { Action, Deps, Post } from '../types';
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
        score: 0,
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

const mapFirebaseErrorToEsteValidationError = code => {
  const prop = {
    'required': 'title',
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
                       return Observable.of(submitPostFail(error));
                     });
  });

export const epics = [submitPostEpic];
