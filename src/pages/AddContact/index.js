import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { addContactAsync } from "../../store/contactSlice";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const AddContact = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadToImgur = async () => {
    try {
      if (!photo) {
        console.error('No image selected');
        return;
      }
  
      const clientID = 'ba1e7f12939efbf';
  
      const base64 = await FileSystem.readAsStringAsync(photo, { encoding: FileSystem.EncodingType.Base64 });
      // console.log(base64);
      const formData = new FormData();
      formData.append('image', base64);
      formData.append('type', 'base64');
      formData.append('title', 'POC Proxy Upload Image');
      formData.append('description', 'Trying proxy upload image');
      
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${clientID}`,
        },
        body: formData,
      };  
      // console.log("data",formData);
      // console.log("cek");
  
      const response = await fetch('https://api.imgur.com/3/image', requestOptions);
      // console.log(response);
      const result = await response.json();
      // console.log("result",result);
      if (response.ok) {
        // console.log('Upload successful', result);
        const imageUrl = result.data.link;
        console.log(imageUrl);
        setImageUrl(imageUrl);
        
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading image to Imgur:', error);
    }
  };
  const handleSubmit = async () => {
    const contact = {
      firstName: firstName,
      lastName: lastName,
      age: parseInt(age),
      photo: imageUrl,
    };

    dispatch(addContactAsync(contact));

    setFirstName("");
    setLastName("");
    setAge("");
    setPhoto(null);
    setImageUrl("")
  };
  
  
  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setPhoto(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Contacts</Text>
      </View>

      <View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            paddingBottom: 50,
          }}
        >
          {photo ? (
            <View style={{ gap: 5, alignItems: "flex-start" }}>
              <Image
                source={{ uri: photo }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "orange",
                  flexDirection: "row",
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 10,
                }}
                onPress={() => {
                  pickImage();
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderRadius: 100,
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                }}
                onPress={() => pickImage()}
              >
                <Ionicons name="camera-outline" size={48} color="#333" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#333",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            alignSelf: "center",
          }}
          onPress={() => uploadToImgur(photo)}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Upload to Imgur</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color="#333"
          style={styles.icon}
        />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color="#333"
          style={styles.icon}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="calendar-outline"
          size={24}
          color="#333"
          style={styles.icon}
        />
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  header: {
    paddingVertical: 50,
    alignItems: "center",
  },
  headerText: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
    color: "#333",
  },
  input: {
    flex: 1,
    color: "#000",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    width: "50%",
  },
  button: {
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddContact;
