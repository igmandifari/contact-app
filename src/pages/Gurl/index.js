import React, { useState, useEffect } from 'react';
import { View, Button, Image, ActivityIndicator, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadImageToImgur = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const uploadToImgur = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'file');
      formData.append('title', 'Simple upload');
      formData.append('description', 'This is a simple image upload in Imgur');

      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID e2661e85f639777', // Replace with your actual ID
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImage(data.data.link);
        setResponse(data.data);
        setLoading(false);
      } else {
        console.error('Imgur API Error:', data.data.error); // Check for errors in response
        Alert.alert(
          'Upload Gagal',
          'Terjadi kesalahan saat mengunggah gambar. Periksa console untuk detailnya.'
        );
        setLoading(false);
      }
    } catch (error) {
      console.error('Error uploading image: ', error.message);
      Alert.alert('Error', 'Terjadi kesalahan saat mengunggah gambar. Periksa console untuk detailnya.');
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Izin akses ke galeri diperlukan!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!pickerResult.cancelled) {
      // Check if the URI is a local URI (might be different based on Expo version)
      if (pickerResult.uri.startsWith('file://')) {
        setImage(pickerResult.uri);
      } else {
        // If not a local URI, you might need to handle it differently based on Expo's behavior
        console.warn('Non-standard image URI format:', pickerResult.uri);
      }
    }
  };

  // useEffect to handle potential asynchronous rendering issue
  useEffect(() => {
    if (image) {
      console.log('Image URI:', image); // Log the image URI for debugging
    }
  }, [image]);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : image ? (
        <>
          <Image source={{ uri: image }} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
          <Button title="Upload File" onPress={() => uploadToImgur({ uri: image })} disabled={loading} />
        </>
      ) : (
        <Button title="Pilih Gambar" onPress={pickImage} />
      )}
    </View>
  );
};

export default UploadImageToImgur;
