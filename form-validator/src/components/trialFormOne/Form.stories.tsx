// Form.stories.tsx
import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Form from './Form';  // Assuming Form component is located in the same folder
import { createValidationRule } from './ValidationUtils';

export default {
  title: 'Components/Form',
  component: Form,
} as Meta;

// Helper function to dynamically add and remove input fields
const DynamicFormStory: StoryFn = () => {
  const [inputs, setInputs] = useState<string[]>(['email', 'username']);
  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
  });

  // Define validation rules for each input field
  const validate = (values: Record<string, string | number | boolean>) => {
    const errors: Record<string, string | null> = {};
    const emailValidator = createValidationRule<string>()
      .required('Email is required')
      .email();
    const usernameValidator = createValidationRule<string>()
      .required('Username is required')
      .minLength(3, 'Username must be at least 3 characters')
      .maxLength(15, 'Username must be 15 characters or less')
      .isAlphabetic('Only alphabetic characters allowed');
    
    if (inputs.includes('email')) {
      errors.email = emailValidator.validate(values.email as string);
    }
    
    if (inputs.includes('username')) {
      errors.username = usernameValidator.validate(values.username as string);
    }

    return errors;
  };

  // Handle dynamic input management
  const handleAddInput = (inputName: string) => {
    setInputs((prevInputs) => [...prevInputs, inputName]);
    setFormValues((prevValues) => ({ ...prevValues, [inputName]: '' }));
  };

  const handleRemoveInput = (inputName: keyof typeof formValues) => {
    setInputs((prevInputs) => prevInputs.filter((input) => input !== inputName));
    setFormValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[inputName];
      return newValues;
    });
  };

  return (
    <div>
      <h3>Dynamic Form with Validation</h3>

      {/* Form Component */}
      <Form
        initialValues={formValues}
        validate={validate}
        onSubmit={(values) => alert(`Form submitted with values: ${JSON.stringify(values)}`)}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <>
            {inputs.includes('email') && (
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <button onClick={() => handleRemoveInput('email')}>Remove Email</button>
              </div>
            )}
            
            {inputs.includes('username') && (
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.username && errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                <button onClick={() => handleRemoveInput('username')}>Remove Username</button>
              </div>
            )}

            <div>
              <button type="button" onClick={() => handleAddInput('email')}>Add Email</button>
              <button type="button" onClick={() => handleAddInput('username')}>Add Username</button>
            </div>

            <button type="submit">Submit</button>
          </>
        )}
      </Form>
    </div>
  );
};

export const DynamicForm = DynamicFormStory.bind({});
