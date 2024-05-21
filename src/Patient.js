import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    weight: '',
    gender: '',
    age: '',
    disease: '',
    doctor: {
      id: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doctorId') {
      setPatientData((prevData) => ({
        ...prevData,
        doctor: {
          ...prevData.doctor,
          id: value, // Make sure this matches the property in the backend
        },
      }));
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/patient', patientData);
      console.log('Patient created:', response.data);
      setPatientData({
        name: '',
    weight: '',
    gender: '',
    age: '',
    disease: '',
    doctor: {
      id: '',
    },
      });
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <center>
      <div>
        <h2>Create New Patient</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={patientData.name} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Weight:
            <input type="text" name="weight" value={patientData.weight} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Gender:
            <input type="text" name="gender" value={patientData.gender} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Age:
            <input type="number" name="age" value={patientData.age} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Disease:
            <input type="text" name="disease" value={patientData.disease} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Doctor ID:
            <input type="text" name="doctorId" value={patientData.doctor.id} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit">Create Patient</button>
        </form>
      </div>
    </center>
  );
};

export default PatientForm;
