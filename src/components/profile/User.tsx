 export  interface Address {
    address_line: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }

 export  interface Vehicle {
    vehicle_brand: string;
    vehicle_capacity: string;
    vehicle_modal: string;
    vehicle_number: string;
    vehicle_type: string;
  }
  
 export default interface User {
    _id: { $oid: string };
    created_at: { $date: string };
    updated_at: { $date: string };
    user_id: string;
    dob: string;
    aadhar_number: string;
    address: Address;
    driver_license: string;
    email: string;
    first_name: string;
    is_aadhar_verified: boolean;
    is_email_verified: boolean;
    is_number_verified: boolean;
    last_name: string;
    phone_number: string;
    user_image: string;
    vehical_list: Array<Vehicle>;  
    vehicle_capacity: string;
    vehicle_color: string;
    vehicle_number: string;
    vehicle_type: string;
  }
  