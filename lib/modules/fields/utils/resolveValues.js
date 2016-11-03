import {
  each
}
from 'lodash';
import config from '../../../core/config.js';
import getChildClass from './getChildClass';

function resolveValues(args = {}) {
  const {
    Class,
    rawDoc
  } = args;

  if (!config.resolving) {
    return rawDoc;
  }

  // When resolving values, we need to get resolve method for a child class
  // if a given document is actually an instance of child class.
  const ChildClass = getChildClass({
    Class,
    rawDoc
  });

  const fields = ChildClass.getFields();
  const resolvedValues = {};
  each(fields, (field) => {
    resolvedValues[field.name] = field.resolveValue(rawDoc);
  });
  return resolvedValues;
}

export default resolveValues;