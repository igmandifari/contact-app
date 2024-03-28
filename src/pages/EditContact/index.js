import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateContactAsync } from "../../store/contactSlice";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { useNavigation } from '@react-navigation/native';

const EditContact = ({ route, navigation }) => {
  const { contact } = route.params;
  const dispatch = useDispatch();

  // Extracting contact details
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [age, setAge] = useState(contact.age ? contact.age.toString() : "");
  const [photo, setPhoto] = useState(contact.photo); // Set initial photo if exists

  useEffect(() => {
    // Load contact data when component mounts or when contact changes
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setAge(contact.age ? contact.age.toString() : "");
    setPhoto(contact.photo);
  }, [contact]);

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setPhoto(null);
  };

  const handleUpdate = () => {
    const { id } = contact;
    const updatedContact = {
      firstName,
      lastName,
      age: Number(age),
      photo,
    };
  
    dispatch(updateContactAsync({ contactId: id, updatedContactData: updatedContact }))
      .then(() => {
        alert("Succes Edit Contact");
        navigation.goBack();
        navigation.navigate('dashboard'); // Navigasi ke dashboard setelah sukses
      })
      .catch((error) => {
        // Tangani kesalahan jika ada
        console.error('Error updating contact:', error);
        // Tampilkan pesan kesalahan kepada pengguna
        alert('Failed to update contact. Please try again later.');
      });
  };

  const handleChoosePhoto = async () => { // Function to choose photo
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri); // Set chosen photo
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Contacts</Text>
      </View>
      <View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            paddingBottom:50,
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
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
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
  label: {
    fontSize: 16,
    marginTop: 10,
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

export default EditContact;
