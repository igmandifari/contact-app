import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateContactAsync } from '../../store/contactSlice';

const EditContact = ({ route, navigation }) => {
  const { contact } = route.params;
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  // const contact = contacts.find((c) => c.id === contact);

  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [age, setAge] = useState(contact.age ? contact.age.toString() : '');
  const [photo, setPhoto] = useState(null);

  const handleUpdate = () => {
    const updatedContact = { ...contact, firstName, lastName, age: Number(age),photo };
    dispatch(updateContactAsync(updatedContact));
    alert('Contact updated successfully');
    navigation.goBack();
  };

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  return (
    <View style={styles.container}>
          <Button style={styles.button} color="black" title="Choose Photo" onPress={handleChoosePhoto} />
      <Text style={styles.label}>{photo ? photo.uri : 'No photo'}</Text>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Photo:</Text>

      <Button
        style={styles.button}
        color="black"
        title="Update Contact"
        onPress={handleUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    color: '#000',
  },
});

export default EditContact;