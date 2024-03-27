import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../store/contactSlice";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; 

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
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchContactsAsync());
    }, [])
  );
  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Phone</Text>
        <Text style={styles.subHeaderText}>{contacts.length} contacts with id</Text>
      </View>
      <View style={styles.headerIcons}>
          <TouchableOpacity onPress={()=> navigation.navigate('add-contact')}>
            <Ionicons name="add" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
        )}
        ListHeaderComponent={<View style={styles.listHeader} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      paddingVertical: 50,
      alignItems:"center"
    },
    headerText: {
      color: '#000000',
      fontSize: 25,
      fontWeight: 'bold',
    },
    subHeaderText: {
      color: '#000000',
      fontSize: 14,
    },
    contactItem: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    contactName: {
      color: '#000000',
      fontSize: 16,
    },
    listHeader: {
      height: 16,
    },
    headerIcons: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
  });

export default Dashboard;