// src/CustomValidationForm.tsx

import React, { useState } from 'react';
import './CustomValidationForm.css';

interface FormData {
    name: string;
    email: string;
    password: string;
    age: number | string;
    gender: string;
    agree: boolean;
    file: File | null| string;
    favoriteColor: string;
}

const validateFormData = (data: FormData) => {
    const errors: Partial<FormData> = {};

    // Validate name
    if (!data.name) {
        errors.name = 'Name is required';
    } else if (data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }

    // Validate email
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format';
    }

    // Validate password
    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    // Validate age
    if (data.age === '') {
        errors.age = 'Age is required';
    } else if (Number(data.age) < 1 || Number(data.age) > 120) {
        errors.age = 'Age must be between 1 and 120';
    }

    // Validate gender
    if (!data.gender) {
        errors.gender = 'Gender is required';
    }

    // Validate agreement checkbox
    // if (!data.agree) {
    //     errors.agree = 'You must agree to the terms';
    // }

    // Validate file upload
    if (!data.file) {
        errors.file = 'File is required';
    }

    // Validate favorite color selection
    if (!data.favoriteColor) {
        errors.favoriteColor = 'Favorite color is required';
    }

    return errors;
};

const CustomValidationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        agree: false,
        file: null,
        favoriteColor: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        const { checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, file }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validateFormData(formData);
        
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted successfully:', formData);
            // Reset form or perform additional actions
            setFormData({
                name: '',
                email: '',
                password: '',
                age: '',
                gender: '',
                agree: false,
                file: null,
                favoriteColor: '',
            });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age === '' ? '' : formData.age}
                        onChange={handleChange}
                    />
                </label>
                {errors.age && <span className="error">{errors.age}</span>}
            </div>

            <div>
                <label>Gender:</label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                    />
                    Male
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                    />
                    Female
                </label>
                {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                    />
                    I agree to the terms
                </label>
                {errors.agree && <span className="error">{errors.agree}</span>}
            </div>

            <div>
                <label>
                    Favorite Color:
                    <select
                        name="favoriteColor"
                        value={formData.favoriteColor}
                        onChange={handleChange}
                    >
                        <option value="">Select...</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>
                </label>
                {errors.favoriteColor && <span className="error">{errors.favoriteColor}</span>}
            </div>

            <div>
                <label>
                    Upload File:
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </label>
                {errors.file && <span className="error">{`errors.file`}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </form>
    );
};

export default CustomValidationForm;
