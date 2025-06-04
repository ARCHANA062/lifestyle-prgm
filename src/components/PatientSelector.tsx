
import React from 'react';

const PatientSelector = ({ patients, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a patient</option>
      {patients.map((p, i) => (
        <option key={i} value={p.Name}>{p.Name}</option>
      ))}
    </select>
  );
};

export default PatientSelector;
