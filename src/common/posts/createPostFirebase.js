// @flow
import type { Post } from '../types';

const createPostFirebase = (json: ?Object): ?Post => {
  if (!json || !json.providerData) return null;
  const postData = json.providerData[0];
  const post: Post = {
    createdAt: postData.createdAt,
    id: json.uid,
    title: postData.title,
    url: postData.url,
    text: postData.text,    
  };
  return post;
};

export default createPostFirebase;
