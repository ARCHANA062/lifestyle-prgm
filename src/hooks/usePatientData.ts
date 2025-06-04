
import { useEffect, useState } from 'react';

export const usePatientData = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycby04z6EycR5mmc19t2mJiqLMjha6NpOJaI_vEBDiDrZX1fwzGscOvgz5oPdglUQC85_jw/exec?t=" + Date.now());
        const data = await res.json();
        setPatients(data.filter(p => p.Name));
      } catch (err) {
        console.error("Failed to fetch patient data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return { patients, loading };
};
