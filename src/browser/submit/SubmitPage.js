// @flow
import type { State } from '../../common/types';
import NewPost from './NewPost';
import React from 'react';
import SubmitError from './SubmitError';
import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Title } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const SubmitPage = () => {
  return (
    <Box>
      <Title message={linksMessages.submit} />
      <FormattedMessage {...linksMessages.submit}>
        {message => <PageHeader heading={message}
                                description="You may submit either a link or text." />}
      </FormattedMessage>
      <NewPost />
      <SubmitError />
    </Box>
  );
};

export default compose(
  connect((state: State) => ({
    disabled: state.auth.formDisabled,
  })),
  injectIntl,
)(SubmitPage);
