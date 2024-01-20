import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";

const DoctorAppointments = ({ navigation }) => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Doe", specialization: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialization: "Dermatologist" },
    // Add more doctor details as needed
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAppointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const handleAppointmentConfirm = () => {
    // Handle appointment confirmation logic here
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== selectedDoctor.id);
    setDoctors(updatedDoctors);
    setAppointmentConfirmed(true);
    // Add logic for navigating to success screen or showing a success message
  };

  return (
    <View style={styles.container}>
      {doctors.map((doctor) => (
        <TouchableOpacity
          key={doctor.id}
          style={styles.card}
          onPress={() => handleCardClick(doctor)}
        >
          <Text style={styles.cardTitle}>{doctor.name}</Text>
          <Text style={styles.cardText}>{doctor.specialization}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal for confirming the appointment */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {!isAppointmentConfirmed ? (
              <>
                <Text style={styles.modalTitle}>Confirm Appointment</Text>
                <Text style={styles.modalText}>Do you want to schedule an appointment with {selectedDoctor?.name}?</Text>
                <View style={styles.modalButtons}>
                  <Button title="Yes, Confirm" onPress={handleAppointmentConfirm} />
                  <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.confirmationText}>Appointment Confirmed!</Text>
                <Button title="OK" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  confirmationText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default DoctorAppointments;
