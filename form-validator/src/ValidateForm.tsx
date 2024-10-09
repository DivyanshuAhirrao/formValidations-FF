// import React, { useState } from 'react';
// import './CustomValidationForm.css';
// import { StringValidationBuilder, NumberValidationBuilder } from './ValidationBuilder';

// const ValidateForm: React.FC = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         age: '',
//         gender: '',
//         agree: false,
//         file: null,
//         favoriteColor: '',
//     });

//     const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, type, value } = e.target;
//         const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: updatedValue,
//         }));

//         // Clear error on change
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: undefined,
//         }));
//     };

//     // const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
//     //     const { name, type, value } = e.target;
//     //     const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

//     //     const newErrors = {
//     //         ...errors,
//     //         [name]: validateField(name, updatedValue),
//     //     };

//     //     setErrors(newErrors);
//     // };

//     const validateField = (name: string, value: never): string | undefined => {
//         switch (name) {
//             case 'name':
//                 return new StringValidationBuilder().required().validate(value);
//             case 'email':
//                 return new StringValidationBuilder().required().email().validate(value);
//             case 'password':
//                 return new StringValidationBuilder().required().validate(value); // You can add more password rules if needed
//             case 'age':
//                 return new NumberValidationBuilder().required().minNumber(1).maxNumber(120).validate(Number(value));
//             case 'gender':
//                 return new StringValidationBuilder().required().validate(value);
//             case 'agree':
//                 return new StringValidationBuilder().required().validate(value ? 'true' : ''); // Convert boolean to string for validation
//             case 'file':
//                 return new StringValidationBuilder().required().validate(value);
//             case 'favoriteColor':
//                 return new StringValidationBuilder().required().validate(value);
//             default:
//                 return undefined;
//         }
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const newErrors: any = {};
//         Object.keys(formData).forEach((key) => {
//             newErrors[key] = validateField(key, formData[key]);
//         });

//         setErrors(newErrors);

//         if (Object.values(newErrors).every((err) => err === undefined)) {
//             console.log('Form submitted successfully:', formData);
//             // Reset form logic here, e.g.:
//             setFormData({
//                 name: '',
//                 email: '',
//                 password: '',
//                 age: '',
//                 gender: '',
//                 agree: false,
//                 file: null,
//                 favoriteColor: '',
//             });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} noValidate>
//             <div>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </label>
//                 {errors.name && <span className="error">{errors.name}</span>}
//             </div>

//             <div>
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </label>
//                 {errors.email && <span className="error">{errors.email}</span>}
//             </div>

//             <div>
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </label>
//                 {errors.password && <span className="error">{errors.password}</span>}
//             </div>

//             <div>
//                 <label>
//                     Age:
//                     <input
//                         type="number"
//                         name="age"
//                         value={formData.age}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </label>
//                 {errors.age && <span className="error">{errors.age}</span>}
//             </div>

//             <div>
//                 <label>
//                     Gender:
//                     <select name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur}>
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>
//                 </label>
//                 {errors.gender && <span className="error">{errors.gender}</span>}
//             </div>

//             <div>
//                 <label>
//                     <input
//                         type="checkbox"
//                         name="agree"
//                         checked={formData.agree}
//                         onChange={handleChange}
//                     />
//                     I agree to the terms
//                 </label>
//                 {errors.agree && <span className="error">{errors.agree}</span>}
//             </div>

//             <div>
//                 <label>
//                     File Upload:
//                     <input
//                         type="file"
//                         name="file"
//                         onChange={(e) => setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null })}
//                     />
//                 </label>
//                 {errors.file && <span className="error">{errors.file}</span>}
//             </div>

//             <div>
//                 <label>
//                     Favorite Color:
//                     <input
//                         type="text"
//                         name="favoriteColor"
//                         value={formData.favoriteColor}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </label>
//                 {errors.favoriteColor && <span className="error">{errors.favoriteColor}</span>}
//             </div>

//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default ValidateForm;
