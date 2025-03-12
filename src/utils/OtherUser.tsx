import axios from 'axios';
import { getCredentials } from '@/app/actions/auth';
import { instance } from '@/constants/apis/instance';

export const OtherUser = async (requested_user:string) => {
  try {
    const session = await getCredentials();
    console.log(session.token);
    if (!session.token) {
      throw new Error('No token found');
    }
   
    const response = await instance.post(
      '/user_profile/get_others_profile/',
      {
        user_id: session.phone_number,
        requested_profile_id: '670e1786eaca41e3ff2eb7dc',
      },
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response.data) {
      const user= JSON.parse(response.data);
       console.log(user);
      return user;
    }
    throw new Error('User not found');
  } catch (error) {
    console.log('Error fetching user:', error);
    throw error;
  }
};
