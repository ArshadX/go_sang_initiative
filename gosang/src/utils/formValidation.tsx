
interface FormProps {
    phone: string,
    first_name: string,
    last_name:string,
    email: string,
    DOB:string,
  }
export const validateField = (fieldName: keyof FormProps, value: string) => {
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
        case 'first_name':
          if(value === ""){
            error = "Name is required"
          }
          break;
        case 'last_name':
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
            if (value.trim() === '') {
              error = 'Phone number is required';
            } else if (!/^[6-9]\d{9}$/.test(value)) {
              error = 'Phone number must be a 10-digit & starting with 6, 7, 8,9';
            }
            break;

        default:
          break;
      }
    }

    return error;
  };