import { ErrorMessagesInterface } from '../interfaces/error-messages-interface';

export const errorTranslations: ErrorMessagesInterface = {
  required: 'Required field',
  minlength: 'Too short value',
  pattern: 'Invalid Format',
};

export const editFieldsErrors: ErrorMessagesInterface = {
  required: 'Required field',
  duplicateFieldName: 'Field must be unique',
  invalidFieldValue: 'Field doesnt correspond to the selected type',
};
