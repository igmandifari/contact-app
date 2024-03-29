import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const Gurl = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Mengonversi gambar menjadi base64
    });

    if (!result.cancelled) {
      setImage(result.base64); // Menyimpan gambar base64 ke state
    }
  };

  const uploadToImgur = async () => {
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }

      const clientID = 'ba1e7f12939efbf';
      const body = {
        image: image,
        type: 'base64',
        title: 'POC Proxy Upload Image',
        description: 'Trying proxy upload image',
      };
      console.log("data", body);
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${clientID}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };

      const response = await fetch('https://api.imgur.com/3/image', requestOptions);
      const result = await response.json();

      if (response.ok) {
        console.log('Upload successful', result);
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading image to Imgur:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {image ? (
        <View>
          <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ width: 200, height: 200 }} />
          <TouchableOpacity onPress={uploadToImgur}>
            <Text>Upload to Imgur</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setImage(null)}>
            <Ionicons name="camera-reverse-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="camera-outline" size={48} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Gurl;
