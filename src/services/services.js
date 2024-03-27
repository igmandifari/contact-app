import axiosInstance from "../api/axiosInstance";
import baseurl from "../api/baseurl";

export const fetchContacts = async () => {
    try {
      const response = await fetch(`${baseurl}`);
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
};

export const addContact = async (contactData) => {
    try {
      const response = await fetch(`${baseurl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
};