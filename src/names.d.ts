/**
 * Capitalizes a string: the first letter of the string is capitalized, the rest are lowercase.
 *
 * @param name the name to capitalize
 * @returns the capitalized name
 */
export function capitalize(name: string): string;

/**
 * Splits a camelCase name into an array of strings.
 *
 * @param name the name to split
 * @returns an array of strings
 * @remarks Splits before every capital letter, so runs of capitals split into single letters:
 *   `'HTMLElement'` → `['H', 'T', 'M', 'L', 'Element']`. The `to*` functions normalize case,
 *   so acronyms do not survive a round trip (`toCamelCase(['foo', 'HTML'])` → `'fooHtml'`).
 */
export function fromCamelCase(name: string): string[];

/**
 * Joins an array of strings into a camelCase name.
 *
 * @param names an array of strings
 * @returns a camelCase name
 */
export function toCamelCase(names: string[]): string;

/**
 * Splits a PascalCase name into an array of strings.
 *
 * @param name the name to split
 * @returns an array of strings
 * @remarks Same algorithm as {@link fromCamelCase()} — see its note on capital runs (acronyms).
 */
export function fromPascalCase(name: string): string[];

/**
 * Joins an array of strings into a PascalCase name.
 *
 * @param names an array of strings
 * @returns a PascalCase name
 */
export function toPascalCase(names: string[]): string;

/**
 * Splits a snake_case name into an array of strings.
 *
 * @param name the name to split
 * @returns an array of strings
 */
export function fromSnakeCase(name: string): string[];

/**
 * Joins an array of strings into a snake_case name.
 *
 * @param names an array of strings
 * @returns a snake_case name
 */
export function toSnakeCase(names: string[]): string;

/**
 * Joins an array of strings into a SNAKE_CASE name.
 *
 * @param names an array of strings
 * @returns a SNAKE_CASE name
 */
export function toAllCapsSnakeCase(names: string[]): string;

/**
 * Splits a kebab-case name into an array of strings.
 *
 * @param name the name to split
 * @returns an array of strings
 */
export function fromKebabCase(name: string): string[];

/**
 * Joins an array of strings into a kebab-case name.
 *
 * @param names an array of strings
 * @returns a kebab-case name
 */
export function toKebabCase(names: string[]): string;

/**
 * Splits a whitespace-separated name into an array of strings.
 *
 * @param name the name to split
 * @returns an array of strings
 */
export function fromWords(name: string): string[];

/**
 * Joins an array of strings into a lowercase whitespace-separated name.
 *
 * @param names an array of strings
 * @returns a space-separated lowercase name
 */
export function toWords(names: string[]): string;

/**
 * Joins an array of strings into a space-separated name with every word capitalized.
 *
 * @param names an array of strings
 * @returns a space-separated Title Case name
 * @remarks Simple title case: every word is capitalized, including articles and prepositions.
 */
export function toTitleCase(names: string[]): string;
