import Form from "./Form";
import { createValidationRule } from "./ValidationUtils"; 
import "./customCSS.scss";

const DemoOneForm = () => {
  const initialValues = {
    url: "",
    name: "",
    email: "",
    phone: "",
    job: false,
    gender: "",
    address: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Submitted:", values);
  };

  const validationSchema = {

    url: createValidationRule<string>()
      .url(),

    name: createValidationRule<string>()
      .required("Name is required")
      .minLength(3, "Name must be at least 3 characters")
      .maxLength(12, "Name cannot exceed 12 characters")
      .isAlphabetic("Name can only contain letters"),

    email: createValidationRule<string>()
      .email(),

    address: createValidationRule<string>()
      .minLength(12, "Address must be at least 12 characters")
      .maxLength(50, "Address cannot exceed 50 characters"),

    phone: createValidationRule<string>()
      .required("Phone is required")
      .minLength(10, "Phone must be at least 10 digits")
      .maxLength(10, "Phone cannot exceed 10 digits"),

    gender: createValidationRule<string>().required("Gender is required"),

  };

  const validateForm = (values: typeof initialValues) => {
    const errors: Record<string, string | null> = {};

    Object.keys(values).forEach((field) => {
      const validation = validationSchema[field as keyof typeof validationSchema];
      if (validation) {
        const value = values[field as keyof typeof initialValues];
        const error = validation.validate(value as string);
        if (error) {
          errors[field] = error;
        }
      }
    });
    return errors;
  };

  return (
    <div className="form-container">
      <Form
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <>

            <div className="input-group">
              <label>URL:</label>
              <input
                type="url"
                name="url"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter URL"
              />
              {touched.url && errors.url && (
                <span className="error-message">{errors.url}</span>
              )}
            </div>

            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Name"
              />
              {touched.name && errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label>Address:</label>
              <textarea
                rows={7}
                cols={65}
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Address"
              />
              {touched.address && errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>

            <div className="input-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0987654321"
              />
              {touched.phone && errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="input-group">
              <label>Gender:</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                onBlur={handleBlur}
              /> Male
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                onBlur={handleBlur}
              /> Female
              {touched.gender && errors.gender && (
                <span className="error-message">{errors.gender}</span>
              )}
            </div>

            <button className="submit-button" type="submit">Submit</button>
          </>
        )}
      </Form>
    </div>
  );
};

export default DemoOneForm;
