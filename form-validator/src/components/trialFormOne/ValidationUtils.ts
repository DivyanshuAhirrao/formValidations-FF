export type Validator<T> = (value: T) => string | null;

const createErrorMessage = (message: string | undefined, defaultMessage: string): string => 
  message || defaultMessage;

const isValidString = (value: unknown): value is string => typeof value === 'string';
const isValidNumber = (value: unknown): value is number => typeof value === 'number';
const isValidDate = (value: unknown): value is Date => value instanceof Date && !isNaN(value.getTime());

export const createValidationRule = <T>() => {
  const rules: Validator<T>[] = [];

  const addRule = (rule: Validator<T>) => {
    rules.push(rule);
    return ruleSet;
  };

  const ruleSet = {
    required: (message?: string) =>
      addRule(value => !value ? createErrorMessage(message, "This field is required") : null),

    maxLength: (max: number, message?: string) =>
      addRule(value =>
        isValidString(value) && value.length > max
          ? createErrorMessage(message, `Must be ${max} characters or less`)
          : null
      ),

    minLength: (min: number, message?: string) =>
      addRule(value =>
        isValidString(value) && value.length < min
          ? createErrorMessage(message, `Must be at least ${min} characters`)
          : null
      ),

    typeOf: (expectedType: string, message?: string) =>
      addRule(value =>
        typeof value !== expectedType
          ? createErrorMessage(message, `Must be of type ${expectedType}`)
          : null
      ),

    matches: (pattern: RegExp, message?: string) =>
      addRule(value =>
        isValidString(value) && !pattern.test(value)
          ? createErrorMessage(message, `Must match pattern: ${pattern}`)
          : null
      ),

    oneOf: (allowedValues: T[], message?: string) =>
      addRule(value =>
        !allowedValues.includes(value)
          ? createErrorMessage(message, `Value must be one of: ${allowedValues.join(", ")}`)
          : null
      ),

    notOneOf: (disallowedValues: T[], message?: string) =>
      addRule(value =>
        disallowedValues.includes(value)
          ? createErrorMessage(message, `Value cannot be one of: ${disallowedValues.join(", ")}`)
          : null
      ),

    isAlphabetic: (message?: string) =>
      addRule(value =>
        isValidString(value) && !/^[a-zA-Z]*$/.test(value)
          ? createErrorMessage(message, "Only alphabets are allowed")
          : null
      ),

    email: (message?: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return addRule(value =>
        isValidString(value) && !emailRegex.test(value)
          ? createErrorMessage(message, "Invalid email format")
          : null
      );
    },

    url: (message?: string) => {
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{6,})([/\w .-]*)*\/?$/;
      return addRule(value =>
        isValidString(value) && !urlRegex.test(value)
          ? createErrorMessage(message, "Invalid URL format")
          : null
      );
    },

    uuid: (message?: string) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return addRule(value =>
        isValidString(value) && !uuidRegex.test(value)
          ? createErrorMessage(message, "Invalid UUID format")
          : null
      );
    },

    integer: (message?: string) =>
      addRule(value =>
        isValidNumber(value) && !Number.isInteger(value)
          ? createErrorMessage(message, "Value must be an integer")
          : null
      ),

    positive: (message?: string) =>
      addRule(value =>
        isValidNumber(value) && value <= 0
          ? createErrorMessage(message, "Value must be a positive number")
          : null
      ),

    negative: (message?: string) =>
      addRule(value =>
        isValidNumber(value) && value >= 0
          ? createErrorMessage(message, "Value must be a negative number")
          : null
      ),

    min: (min: number, message?: string) =>
      addRule(value =>
        isValidNumber(value) && value < min
          ? createErrorMessage(message, `Value must be at least ${min}`)
          : null
      ),

    max: (max: number, message?: string) =>
      addRule(value =>
        isValidNumber(value) && value > max
          ? createErrorMessage(message, `Value must be no more than ${max}`)
          : null
      ),

    date: (message?: string) =>
      addRule(value =>
        !isValidDate(value)
          ? createErrorMessage(message, "Invalid date")
          : null
      ),

    minDate: (minDate: Date, message?: string) =>
      addRule(value =>
        isValidDate(value) && value < minDate
          ? createErrorMessage(message, `Date must be after ${minDate}`)
          : null
      ),

    maxDate: (maxDate: Date, message?: string) =>
      addRule(value =>
        isValidDate(value) && value > maxDate
          ? createErrorMessage(message, `Date must be before ${maxDate}`)
          : null
      ),

    validate: (value: T): string | null =>
      rules.map(rule => rule(value)).find(result => result !== null) || null // Stop on first error
  };

  return ruleSet;
};
