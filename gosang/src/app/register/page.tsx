'use client'
import Button from '@/components/common/Button';
import AdvanceInput from '@/components/register/AdvanceInput';
import { instance } from '@/constants/apis/instance';
import { validateField } from '@/utils/formValidation';
import React, { useState, useEffect, useCallback } from 'react';

// Define the type for the form data
interface FormProps {
  phone: string;
  first_name: string,
  last_name:string,
  email: string;
  DOB:string;
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormProps>({
    phone:"",
    first_name: "",
    last_name:"",
    email: "",
    DOB:""
  });
  const [errors, setErrors] = useState<Partial<FormProps>>({});
  const registerUser = () => {
    instance.post('/user/registration',formData)
  }
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
  
  const formatDOB = (value:string) => {
      // Remove non-numeric characters
      value = value.replace(/\D/g, '');
      // Add "/" after the 2nd and 4th character
      if (value.length > 2 && value.length <= 4) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      } else if (value.length > 4) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4,8);
      }
      return value;
    
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormProps;
    if(name === 'DOB'){
      setFormData({
        ...formData,
        [fieldName]: formatDOB(value)
      });

    }else {
      setFormData({
        ...formData,
        [fieldName]: value
      });
    }
  }

  const handleNext = () => {
    const currentField = Object.keys(formData)[step] as keyof FormProps;
    const currentError = validateField(currentField, formData[currentField]);

    if (!currentError) { 
      if(currentField === 'first_name') setStep(step + 2)
      else setStep(step + 1);
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
      <div className='flex flex-1 flex-col justify-center items-center bg-cyan-400 md:py-20 md:px-40 sm:w-full w-full sm:py-10 sm:px-20 px-5 py-20' >
         {
          currentField === 'phone' &&
          <div className='flex flex-col items-center justify-center animate-slideIn gap-y-4'>
          <h1 className='font-bold sm:text-4xl text-3xl text-center text-gray-900'> What&apos;s your {currentField.charAt(0).toUpperCase() + currentField.slice(1)}?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4 w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'tel'}
              required={true}
              name={currentField}
              value={formData['phone']}
              onChange={handleInputChange}
              maxLength={13}
              autoFocus
              autoComplete='tel-local'
            />
          </label>
        </div>
        }
        {
          currentField === 'first_name' &&
          <div className='flex flex-col items-center justify-center animate-slideIn gap-y-4'>
          <h1 className='font-bold sm:text-4xl text-3xl text-center text-gray-900  '> What&apos;s your Name?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'text'}
              name={currentField}
              required={true}
              placeholder='First name'
              value={formData['first_name']}
              onChange={handleInputChange}
              autoFocus
              
            />
          </label>
          <label>
            <input
              className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'text'}
              name={'last_name'}
              placeholder='Last name'
              value={formData['last_name']}
              onChange={handleInputChange}
            />
          </label>
        </div>
        }

        {
          currentField === 'email' && 
          <div className='flex flex-col bg-cyan-400 items-center justify-center animate-slideIn gap-y-4'>
       
          <h1 className='font-bold sm:text-4xl text-3xl text-center text-gray-900  '> What&apos;s your {currentField.charAt(0).toUpperCase() + currentField.slice(1)}?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'text'}
              name={currentField}
              value={formData['email']}
              onChange={handleInputChange}
              autoFocus
            />
          </label>
        </div>
        }
         {
          currentField === 'DOB' &&
          <div className='flex flex-col items-center justify-center animate-slideIn gap-y-4'>
          <h1 className='font-bold sm:text-4xl text-3xl text-center text-gray-900  '> What&apos;s your {currentField.charAt(0).toUpperCase() + currentField.slice(1)}?</h1>
          <label>
            <input
              className="rounded-3xl py-2 px-4 w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400"
              type={'text'}
              required={true}
              placeholder="DD/MM/YYYY" 
              name={currentField}
              value={formData['DOB']}
              autoFocus
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
    <div className='bg-white flex justify-center md:items-center flex-col h-dvh md:p-0 px-2  '>
      <form onSubmit={handleSubmit}>
        {step < Object.keys(formData).length ? renderInputField() : <button type="submit">Submit</button>}
      </form>
    </div>
  );
}
