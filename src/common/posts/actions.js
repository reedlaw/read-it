// @flow
import type { Action, Deps, Post } from '../types';

export const submitPost = (title: string, url: string) =>
  ({ getUid, now }: Deps): Action => ({
    type: 'SUBMIT_POST',
    payload: {
      post: {
        createdAt: now(),
        id: getUid(),
        title: title.trim(),
        url: url.trim(),
      },
    },
  });

export const likePost = (id: string): Action => ({
  type: 'LIKE_POST',
  payload: { id },
});
