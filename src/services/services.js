import axiosInstance from "../api/axiosInstance";
import baseurl from "../api/baseurl";

export const fetchContacts = async () => {
  try {
    const response = await axiosInstance.get(baseurl);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const addContact = async (contactData) => {
  try {
    const response = await axiosInstance.post(baseurl, contactData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};
