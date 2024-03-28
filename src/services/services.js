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
export const updateContact = async (contactId, updatedContactData) => {
  try {
    const response = await axiosInstance.put(`${baseurl}/${contactId}`, updatedContactData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating contact with ID ${contactId}:`, error);
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    const response = await axiosInstance.delete(`${baseurl}/${contactId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting contact with ID ${contactId}:`, error);
    throw error;
  }
};