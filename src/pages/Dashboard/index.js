import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../store/contactSlice";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const status = useSelector((state) => state.contacts.status);
  const error = useSelector((state) => state.contacts.error);
  const user = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Membuat salinan baru dari array contacts
  // Membuat salinan baru dari array contacts jika contacts tidak undefined
  const sortedContacts = contacts ? [...contacts] : [];

  // Mengurutkan salinan array jika sortedContacts tidak kosong
  if (sortedContacts.length > 0) {
    sortedContacts.sort((a, b) => {
      // Logika pengurutan...
    });
  }

  // Mengurutkan salinan array
  sortedContacts.sort((a, b) => {
    // Urutkan berdasarkan nomor terlebih dahulu
    if (isNaN(parseInt(a.firstName)) && isNaN(parseInt(b.firstName))) {
      // Jika keduanya bukan angka, urutkan berdasarkan huruf
      return a.firstName.localeCompare(b.firstName);
    } else if (!isNaN(parseInt(a.firstName)) && !isNaN(parseInt(b.firstName))) {
      // Jika keduanya angka, urutkan berdasarkan nilai angka
      return parseInt(a.firstName) - parseInt(b.firstName);
    } else if (!isNaN(parseInt(a.firstName))) {
      // Jika a adalah angka dan b bukan, a harus didahulukan
      return -1;
    } else {
      // Jika b adalah angka dan a bukan, b harus didahulukan
      return 1;
    }
  });
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContactsAsync());
    } else if (status === "succeeded") {
      const sortedContacts = [...contacts];
      sortedContacts.sort((a, b) => {
        // Logika pengurutan...
      });

      // Filter sortedContacts dan simpan hasilnya ke dalam filteredContacts
      const filtered = sortedContacts.filter((contact) => {
        const fullName =
          `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      });
      setFilteredContacts(filtered);
    }
  }, [status, dispatch, contacts, searchQuery]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchContactsAsync());
    }, [])
  );

  if (status === "loading") {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }
  if (status === "failed") {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contact App</Text>
        <Text style={styles.subHeaderText}>
          There are {contacts.length} contacts with id
        </Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => setIsSearching(true)}>
          <Ionicons name="search" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("add-contact")}>
          <Ionicons name="add" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      {isSearching && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
              setIsSearching(false);
            }}
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        style={styles.containerFlat}
        data={isSearching ? filteredContacts : sortedContacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("edit-contact", { contactId: item.id })
            }
            style={styles.contactItem}
          >
            <Text style={styles.contactName}>
              {item.firstName} {item.lastName}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListHeaderComponent={<View style={styles.listHeader} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  subHeaderText: {
    color: "#000000",
    fontSize: 14,
  },
  containerFlat: {
    flex: 1,
  },
  contactItem: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderRadius: 15,
    borderBottomColor: "#E0E0E0",
  },
  contactName: {
    color: "#000000",
    fontSize: 16,
  },
  listHeader: {
    height: 16,
  },
  headerIcons: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemSeparator: {
    height: 10,
  },
});

export default Dashboard;
