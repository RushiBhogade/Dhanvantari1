import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "@react-native-community/checkbox";

const BloodDonationScreen = () => {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("O+");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [recentDonation, setRecentDonation] = useState(false);
  const [hasDisease, setHasDisease] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const submitForm = () => {
    // Handle the form submission logic here
    console.log("Form submitted:", {
      name,
      bloodType,
      contactNumber,
      selectedState,
      selectedCity,
      recentDonation,
      hasDisease,
      birthDate,
    });
    // You can add further logic, such as sending the form data to a server
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setBirthDate(date);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Donation Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Select Blood Type:</Text>
      <RNPicker
        style={styles.picker}
        selectedValue={bloodType}
        onValueChange={(value) => setBloodType(value)}
      >
        <RNPicker.Item label="O+" value="O+" />
        <RNPicker.Item label="A+" value="A+" />
        <RNPicker.Item label="B+" value="B+" />
        <RNPicker.Item label="AB+" value="AB+" />
      </RNPicker>
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Select State:</Text>
      <RNPicker
        style={styles.picker}
        selectedValue={selectedState}
        onValueChange={(value) => setSelectedState(value)}
      >
        <RNPicker.Item label="Maharashtra" value="Maharashtra" />
        <RNPicker.Item label="Karnataka" value="Karnataka" />
        <RNPicker.Item label="Tamil Nadu" value="Tamil Nadu" />
      </RNPicker>
      <Text style={styles.label}>Select City:</Text>
      <RNPicker
        style={styles.picker}
        selectedValue={selectedCity}
        onValueChange={(value) => setSelectedCity(value)}
      >
        <RNPicker.Item label="Mumbai" value="Mumbai" />
        <RNPicker.Item label="Bengaluru" value="Bengaluru" />
        <RNPicker.Item label="Chennai" value="Chennai" />
      </RNPicker>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={recentDonation}
          onValueChange={() => setRecentDonation(!recentDonation)}
        />
        <Text style={styles.checkboxLabel}>Recent Blood Donation</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={hasDisease}
          onValueChange={() => setHasDisease(!hasDisease)}
        />
        <Text style={styles.checkboxLabel}>Do you have any diseases?</Text>
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Select Birth Date:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {birthDate.toLocaleDateString("en-US")}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <Button title="Submit" onPress={submitForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start", // Align left
    justifyContent: "center",
    backgroundColor: "#f8f8f8", // Light background color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#e74c3c", // Theme color
  },
  input: {
    height: 40,
    borderColor: "#bdc3c7", // Light border color
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 370,
    borderRadius: 5,
    backgroundColor: "#ecf0f1", // Light background color
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "flex-start",
    color: "#333", // Dark text color
  },
  picker: {
    height: 40,
    width: 370,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#ecf0f1", // Light background color
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8, // Add margin for better separation
    color: "#333", // Dark text color
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#3498db", // Theme color
  },
});

export default BloodDonationScreen;
