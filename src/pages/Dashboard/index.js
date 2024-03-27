import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  FlatList
} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../store/contactSlice";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const status = useSelector((state) => state.contacts.status);
  const error = useSelector((state) => state.contacts.error);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContactsAsync());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }
  return (
    <View style={styles.container}>
    <Text>Phone</Text>
    <Text>{contacts.length} contact with phone numbers</Text>
      <View style={styles.bawah}>
        <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.firstName} {item.lastName}</Text>
          </View>
        )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default Dashboard;
