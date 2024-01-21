// MedicationReminders.js

import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Notifications } from 'react-native-notifications';
import AddMedicineScreen from "./AddMedicineScreen";

// Import your background image
import backgroundImg from '../assets/images/background.png';

// MedicineCard component for rendering each medicine item
const MedicineCard = ({ medicine, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.cardText}>{medicine.name} - {medicine.dosage}</Text>
      <Text style={styles.cardText}>
        Reminder Time: {medicine.reminderTime.toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );
};

const MedicationReminders = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Configure notifications when component mounts
    Notifications.registerRemoteNotifications();
  }, []);

  const addMedicine = (medicine) => {
    setMedicines([...medicines, medicine]);
    scheduleNotification(medicine);
  };

  const editMedicine = (index, updatedMedicine) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = updatedMedicine;
    setMedicines(updatedMedicines);
    navigation.goBack();
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const scheduleNotification = (medicine) => {
    const notificationBody = `It's time to take ${medicine.name} - ${medicine.dosage}`;

    Notifications.postLocalNotification({
      title: "Medication Reminder",
      body: notificationBody,
      payload: {
        /* Any custom data you want to send with the notification */
      },
      silent: false,
    });
  };
  

  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <View style={styles.container}>
        {/* Section for Adding Medicine */}
        <View style={styles.addButtonContainer}>
          <Button
            title="Add Medicine"
            onPress={() => navigation.navigate('AddMedicine', { addMedicine })}
          />
        </View>
        {/* Section for Displaying Medicines */}
        <FlatList
          data={medicines}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <MedicineCard
              medicine={item}
              onPress={() => navigation.navigate("EditMedicine", { index, medicine: item, editMedicine })}
            />
          )}
        />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  addButtonContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust opacity as needed
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
});

export default MedicationReminders;
