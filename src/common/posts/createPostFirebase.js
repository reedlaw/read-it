// @flow
import type { Post } from '../types';

const createPostFirebase = (json: ?Object): ?Post => {
  if (!json || !json.providerData) return null;
  const postData = json.providerData[0];
  const post: Post = {
    createdAt: postData.createdAt,
    id: json.uid,
    score: postData.score,
    text: postData.text,
    title: postData.title,
    url: postData.url,
  };
  return post;
};

export default createPostFirebase;
