
// Provides a function that asserts that the type argument on the left must extend the type on the right
// This function is intended to be placed next to a type declaration, to add more compiler time checks against that type
// For example:
// ```
// type ItemName = 'Sapphire' | 'Emerald' | 'Gold' | 'Death rune';
// type GemName = 'Sapphire' | 'Emerald';
// assertTypeExtendsType<GemName, ItemName>(); // This line will error if the second type has extra items added to it that don't exist in the first type
// ```
//
// The

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertTypeExtendsType<_Type1 extends Type2, Type2>() {}