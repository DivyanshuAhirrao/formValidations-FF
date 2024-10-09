// ValidationBuilder.ts
class ValidationBuilder<T> {
    protected validators: ((value: T) => string | undefined)[] = [];

    validate(value: T): string | undefined {
        for (const validator of this.validators) {
            const error = validator(value);
            if (error) return error;
        }
        return undefined;
    }
}

class StringValidationBuilder extends ValidationBuilder<string> {
    required(): this {
        this.validators.push((value) => (!value ? 'This field is required' : undefined));
        return this;
    }

    email(): this {
        this.validators.push((value) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return !emailPattern.test(value) ? 'Invalid email format' : undefined;
        });
        return this;
    }
}

class NumberValidationBuilder extends ValidationBuilder<number> {
    required(): this {
        this.validators.push((value) => (value === undefined || value === null ? 'This field is required' : undefined));
        return this;
    }

    minNumber(min: number): this {
        this.validators.push((value) => (value < min ? `Value must be at least ${min}` : undefined));
        return this;
    }

    maxNumber(max: number): this {
        this.validators.push((value) => (value > max ? `Value must be no more than ${max}` : undefined));
        return this;
    }
}

export { StringValidationBuilder, NumberValidationBuilder };
