import axios from 'axios'; 
import { getCredentials } from '@/app/actions/auth';
import { instance } from '@/constants/apis/instance';
export const UserProfile = async () => {
  try {
    // Assuming token is stored in localStorage or cookies
    const session = await getCredentials();
    if (!session.token) {
      throw new Error('No token found');
    }

    const response = await instance.post(
      '/user_profile/get_user/',
      { user_id: session.phone_number },
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.user) {
      const userData = JSON.parse(response.data.user);
      return userData;
    }
    throw new Error('User not found');
  } catch ( response) {
    console.log('Error fetching user profile:', response);
    throw response;
  }
};
