// @flow
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  required: {
    defaultMessage: `Please fill out {prop, select,
      title {title}
    }.`,
    id: 'submit.submitError.required',
  },
});

export default errorMessages;
