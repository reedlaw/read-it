// @flow
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Box, Button, Field, Text, TextInput } from '../../common/components';
import { Form } from '../components';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl } from 'react-intl';
import { submitPost } from '../../common/submit/actions';

type NewPostProps = {|
                     submitPost: typeof submitPost,
                     fields: any,
                     intl: $IntlShape,
                    |};

const NewPost = ({ submitPost, fields, intl }: NewPostProps) => {
  const onSubmit = () => {
    const text = fields.text.value.trim();
    const title = fields.title.value.trim();
    const url = fields.url.value.trim();
    submitPost(text, title, url);
    fields.$reset();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Field
          {...fields.title}
          label="*Title"
          maxLength={100}
          placeholder="A descriptive title"
          // error="Title is required"
      />      
      <Field
          {...fields.url}
          maxLength={100}
          label="Url"
          placeholder="A link to the story"
      />
      <Text bold size={-1}>or</Text>
      <Field
          {...fields.text}
          label="Text"
          maxLength={100}
          placeholder="Story text"
      />
      <Box flexDirection="row" marginTop={1}>
        <FormattedMessage {...buttonsMessages.submit}>
          {message => <Button primary onPress={onSubmit}>{message}</Button>}
        </FormattedMessage>
      </Box>
    </Form>
  );
};

export default compose(
  connect(null, { submitPost }),
  injectIntl,
  fields({
    path: 'newPost',
    fields: [
      'text',
      'title',
      'url',
    ]
  }),
)(NewPost);
