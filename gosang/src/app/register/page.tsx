'use client'
import Button from '@/components/common/Button';
import AdvanceInput from '@/components/register/AdvanceInput';
import React, { useState, useEffect } from 'react';

// Define the type for the form data
interface FormProps {
  phone: string;
  name: string;
  email: string;
  DOB:string;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormProps>({
    phone:"",
    name: '',
    email: '',
    DOB:""
  });
  const [errors, setErrors] = useState<Partial<FormProps>>({});

  useEffect(() => {
    const handleBack = (event: PopStateEvent) => {
      if (step > 0) {
        event.preventDefault();
        setStep(prevStep => prevStep - 1);
      } else {
        // If on the first step, allow the browser back navigation
        window.history.back();
      }
    };

    window.addEventListener('popstate', handleBack);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleBack);
    };
  }, [step]);

  const validateField = (fieldName: keyof FormProps, value: string) => {
    let error = '';

    if (!value) {
      error = 'This field is required';
    } else {
      switch (fieldName) {
        case 'email':
          if (!/\S+@\S+\.\S+/.test(value)) {
            error = 'Email is invalid';
          }
          break;
        // case 'age':
        //   if (isNaN(Number(value)) || Number(value) < 1 || Number(value) > 120) {
        //     error = 'Age must be a valid number between 1 and 120';
        //   }
        //   break;
        case 'name':
          if(value === ""){
            error = "Name is required"
          }
          break;
        case 'DOB':
          if(value=== ""){
            error = "DOB is required"
          }
          break;
        case 'phone':
          if(value=== ""){
            error = "Phone number is required"
          }
          break;

        default:
          break;
      }
    }

    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormProps;

    setFormData({
      ...formData,
      [fieldName]: value
    });

    setErrors({
      ...errors,
      [fieldName]: validateField(fieldName, value)
    });
  };

  const handleNext = () => {
    const currentField = Object.keys(formData)[step] as keyof FormProps;
    const currentError = validateField(currentField, formData[currentField]);

    if (!currentError) {
      setStep(step + 1);
      window.history.pushState({}, ''); // Update the browser history
    } else {
      setErrors({
        ...errors,
        [currentField]: currentError
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission here
    console.log('Form submitted:', formData);
  };

  const renderInputField = () => {
    const fieldNames = Object.keys(formData) as Array<keyof FormProps>;
    const currentField = fieldNames[step];

    return (
      <div className='flex flex-1 flex-col justify-center items-center bg-cyan-400 py-20 px-40 ' >
         {
          currentField === 'phone' &&
          <div className='flex flex-col items-center justify-center animate-slideIn gap-y-4'>
          <h1 className='font-bold text-4xl text-gray-900  '> What's your {currentField.charAt(0).toUpperCase() + currentField.slice(1)}?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'number'}
              name={currentField}
              value={formData['phone']}
              onChange={handleInputChange}
            />
          </label>
        </div>
        }
        {
          currentField === 'name' &&
          <div className='flex flex-col items-center justify-center animate-slideIn gap-y-4'>
          <h1 className='font-bold text-4xl text-gray-900  '> What's your {currentField.charAt(0).toUpperCase() + currentField.slice(1)}?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'text'}
              name={currentField}
              value={formData['name']}
              onChange={handleInputChange}
            />
          </label>
        </div>
        }
        {
          currentField === 'email' && 
          <div className='flex flex-col bg-cyan-400 items-center justify-center animate-slideIn gap-y-4'>
       
          <h1 className='font-bold text-4xl text-gray-900  '> What's your {currentField.charAt(0).toUpperCase() + currentField.slice(1)}?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'text'}
              name={currentField}
              value={formData['email']}
              onChange={handleInputChange}
            />
          </label>
        </div>
        }
         {
          currentField === 'DOB' &&
          <div className='flex flex-col items-center justify-center animate-slideIn gap-y-4'>
          <h1 className='font-bold text-4xl text-gray-900  '> What's your {currentField.charAt(0).toUpperCase() + currentField.slice(1)}?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'text'}
              name={currentField}
              value={formData['DOB']}
              onChange={handleInputChange}
            />
          </label>
        </div>
        }
        {errors[currentField] && <p style={{ color: 'red' }}>{errors[currentField]}</p>}
        <div className='mt-6'>
          {/* {step > 0 && <button type="button" onClick={() => window.history.back()}>Back</button>} */}
          <Button type="button"  onClick={handleNext}>
            {step < fieldNames.length - 1 ? 'Continue' : 'Submit'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className='bg-white flex flex-1 justify-center items-center flex-col h-svh'>
      <form onSubmit={handleSubmit}>
        {step < Object.keys(formData).length ? renderInputField() : <button type="submit">Submit</button>}
      </form>
    </div>
  );
}
