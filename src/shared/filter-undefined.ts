/// Helper function to pass to array.filter() when you want to filter out where one of the properties is `undefined`
/// Using this function will tell Typescript that that all the `undefined` entries have been removed, so it
/// will stop complaining that "key could be undefined". We know it CAN'T be undefined because they all got filtered out.

// Type representing the original type but with the specified key changed from `key: type | undefined` to `key: type`
type FilteredType<Type, Key extends keyof Type> = Type & {
  [key in Key]-?: Exclude<Type[key], undefined>;
};

// Function takes the name of the key that should be stripped of it's `undefined` typing
// Returns a function that you can pass directly to `array.filter()`
// Use like this: items.filter(filterUndefined('propertyName'))
function filterUndefined<Type, Key extends keyof Type>(
  key: Key,
): (object: Type) => object is FilteredType<Type, Key> {
  return (item): item is FilteredType<Type, Key> => item[key] !== undefined;
}

export default filterUndefined;
