import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from "@react-native-community/datetimepicker";

const OrganDonations = ({ navigation }) => {
  const [selectedOrgan, setSelectedOrgan] = useState("Heart");
  const [donatedRecently, setDonatedRecently] = useState(false);
  const [hasDisease, setHasDisease] = useState(false);
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [registrationDate, setRegistrationDate] = useState(new Date());

  const handleOrganDonation = () => {
    // Handle submission logic here
    const formData = {
      selectedOrgan,
      donatedRecently,
      hasDisease,
      selectedState,
      selectedCity,
      birthdate,
      phoneNumber,
      medicalConditions,
      allergies,
      medications,
      email,
      address,
      registrationDate,
    };

    // Perform your logic to submit the form data (e.g., API call, database update)
    console.log("Submitted Form Data:", formData);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setBirthdate(date);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Organ Donation Form</Text>
      <Text style={styles.label}>Enter Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Select Organ:</Text>
      <RNPicker
        selectedValue={selectedOrgan}
        onValueChange={(itemValue) => setSelectedOrgan(itemValue)}
        style={styles.picker}
      >
        <RNPicker.Item label="Heart" value="Heart" />
        <RNPicker.Item label="Liver" value="Liver" />
        <RNPicker.Item label="Kidney" value="Kidney" />
        {/* Add more options as needed */}
      </RNPicker>

      <Text style={styles.label}>Have you donated recently?</Text>
      <CheckBox
        value={donatedRecently}
        onValueChange={(newValue) => setDonatedRecently(newValue)}
      />

      <Text style={styles.label}>Do you have any disease?</Text>
      <CheckBox
        value={hasDisease}
        onValueChange={(newValue) => setHasDisease(newValue)}
      />

      <Text style={styles.label}>Select State:</Text>
      <RNPicker
        selectedValue={selectedState}
        onValueChange={(itemValue) => setSelectedState(itemValue)}
        style={styles.picker}
      >
        <RNPicker.Item label="Maharashtra" value="Maharashtra" />
        <RNPicker.Item label="Gujarat" value="Gujarat" />
        {/* Add more options as needed */}
      </RNPicker>

      <Text style={styles.label}>Select City:</Text>
      <RNPicker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
        style={styles.picker}
      >
        <RNPicker.Item label="Mumbai" value="Mumbai" />
        <RNPicker.Item label="Ahmedabad" value="Ahmedabad" />
        {/* Add more options as needed */}
      </RNPicker>

      <Text style={styles.label}>Select Birthdate:</Text>
      <TouchableOpacity onPress={showDatePickerModal} style={styles.datePickerContainer}>
        <Text style={styles.dateText}>{birthdate.toLocaleDateString("en-US")}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Enter Medical Conditions:</Text>
      <TextInput
        style={styles.input}
        placeholder="Medical Conditions"
        value={medicalConditions}
        onChangeText={(text) => setMedicalConditions(text)}
      />

      <Text style={styles.label}>Enter Allergies if Yes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Allergies"
        value={allergies}
        onChangeText={(text) => setAllergies(text)}
      />

      <Text style={styles.label}>Enter Medications if Yes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Medications"
        value={medications}
        onChangeText={(text) => setMedications(text)}
      />

      <Text style={styles.label}>Enter Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Enter Home Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: "#2ecc71" }]}
        onPress={handleOrganDonation}
      >
        <Text style={styles.submitButtonText}>Submit Donation Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#e74c3c", // Theme color
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#333", // Dark text color
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ecf0f1", // Light background color
  },
  picker: {
    marginBottom: 10,
    height: 40,
    backgroundColor: "#ecf0f1", // Light background color
  },
  datePickerContainer: {
    marginBottom: 10,
    backgroundColor: "#ecf0f1", // Light background color
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#3498db", // Theme color
  },
  submitButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 90,
    alignItems: "center",
  },
  submitButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrganDonations;
