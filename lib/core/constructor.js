defaultConstructor = function(attrs) {
  var doc = this;
  var Class = doc.constructor;
  attrs = attrs || {};

  // Create "_values" property when legacy browsers support is turned on.
  if (!Astro.config.supportLegacyBrowsers) {
    doc._values = {};
  }

  // Set values of all fields.
  Astro.utils.fields.setAllValues(doc, attrs, {
    cast: true,
    default: true
  });

  // 1. Create the "_original" property inside the document for storing original
  // object's values (before any modifications). Thanks to it, we can compare
  // "_original" values with the current values and decide what fields have been
  // modified.
  // 2. Copy values to the "_original" property, if it's an already saved
  // document fetched from the collection or a document that does not get stored
  // in the collection directly.
  if (attrs._id || !Class.getCollection()) {
    doc._original = EJSON.clone(Astro.utils.fields.getAllValues(doc, {
      cast: false,
      default: false,
      plain: false
    }));
  } else {
    doc._original = {
      _id: attrs._id
    };
  }

  // Set the "_isNew" flag indicating if an object had been persisted in the
  // collection.
  doc._isNew = true;
};