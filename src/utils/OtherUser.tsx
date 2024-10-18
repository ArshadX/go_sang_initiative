import axios from 'axios';
import { getCredentials } from '@/app/actions/auth';
import { instance } from '@/constants/apis/instance';

export const OtherUser = async (requested_user:string) => {
  try {
    const session = await getCredentials();
    if (!session.token) {
      throw new Error('No token found');
    }
   
    const response = await instance.post(
      '/user_profile/get_others_profile/',
      {
        user_id: session.phone_number,
        requested_profile_id: requested_user,
      },
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response) {
      console.log(response);
      return response;
    }
    throw new Error('User not found');
  } catch (error) {
    console.log('Error fetching user:', error);
    throw error;
  }
};
