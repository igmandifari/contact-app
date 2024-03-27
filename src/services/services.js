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