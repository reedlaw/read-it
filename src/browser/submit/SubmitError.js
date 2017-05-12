// @flow
import type { State } from '../../common/types';
import React from 'react';
import errorMessages from '../../common/submit/errorMessages';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../common/components';
import { connect } from 'react-redux';

const getMessage = error =>
  errorMessages[error.name] || error.toString();

const SubmitError = ({ error }) => {
  if (!error) return null;
  const message = getMessage(error);

  return (
    <Message backgroundColor="danger">
      {typeof message !== 'string'
        ? <FormattedMessage {...message} values={error.params} />
        : error.toString()}
    </Message>
  );
};

export default connect((state: State) => ({
  error: state.submit.error,
}))(SubmitError);
