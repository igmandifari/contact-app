import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateContactAsync } from "../../store/contactSlice";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ route, navigation }) => {
  const { contactId } = route.params;
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const contact = contacts.find((c) => c.id === contactId);
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [age, setAge] = useState(contact.age ? contact.age.toString() : "");
  const [photo, setPhoto] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={96} color="#000000" />
        )}
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.age}>{`${age}`} Years Old</Text>

        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="videocam-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Storage locations</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="trash-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("edit-contact", { contact: contact })}
          style={styles.button}
        >
          <Ionicons name="build-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="share-social-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 50,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  detailsContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  age: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "light",
  },
  phone: {
    color: "#000000",
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  actionButton: {
    padding: 8,
    marginHorizontal: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bottomButtonText: {
    color: "#000000",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Profile;
