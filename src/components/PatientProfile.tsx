
import React from 'react';

const PatientProfile = ({ patient }) => {
  if (!patient) return <p>Please select a patient.</p>;

  const aiSummary = () => {
    const issues = [];
    if (patient.FBS && parseFloat(patient.FBS) > 100) issues.push("elevated fasting blood sugar");
    if (patient.BMI && parseFloat(patient.BMI) > 30) issues.push("obesity");
    if (patient["Blood pressure"] && patient["Blood pressure"].includes("140")) issues.push("hypertension");
    return "This patient is at high cardiometabolic risk due to " + issues.join(", ") + ".";
  };

  return (
    <div>
      <h2>{patient.Name}</h2>
      <p><strong>UHID:</strong> {patient.UHID}</p>
      <p><strong>Phone:</strong> {patient.Phone}</p>
      <p><strong>FBS:</strong> {patient.FBS}</p>
      <p><strong>BMI:</strong> {patient.BMI}</p>
      <p><strong>Blood Pressure:</strong> {patient["Blood pressure"]}</p>
      <p style={{ color: 'red' }}>{aiSummary()}</p>
    </div>
  );
};

export default PatientProfile;
