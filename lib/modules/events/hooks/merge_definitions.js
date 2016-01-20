Astro.Module.modules.events.onMergeDefinitions = function(
  targetDefinition, sourceDefinition, ClassName
) {
  _.each(sourceDefinition.events, function(events, eventName) {
    eventName = eventName.toLowerCase();
    targetDefinition.events[eventName] = targetDefinition.events[eventName] || [];
    targetDefinition.events[eventName] =
      targetDefinition.events[eventName].concat(events);
  });
};