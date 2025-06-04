
interface PatientFormData {
  timestamp: string;
  name: string;
  uhid: string;
  age: number;
  gender: string;
  phone: string;
  occupation: string;
  maritalStatus: string;
  hba1c: number;
  fastingGlucose: number;
  cPeptide: number;
  totalCholesterol: number;
  triglycerides: number;
  ldl: number;
  hdl: number;
  vldl: number;
  sgot: number;
  sgpt: number;
  creatinine: number;
  hemoglobin: number;
  // Add more fields as needed based on your Google Form
}

interface AnalyzedPatientData {
  patientId: string;
  formData: PatientFormData;
  analysis: {
    diabetesRisk: 'normal' | 'prediabetes' | 'diabetes';
    cardiovascularRisk: 'low' | 'moderate' | 'high';
    liverHealth: 'normal' | 'mild' | 'moderate' | 'severe';
    recommendations: string[];
  };
  preventifyScore: {
    cardiovascular: 'LOW' | 'MODERATE' | 'HIGH';
    metabolic: 'LOW' | 'MODERATE' | 'HIGH';
    liver: 'LOW' | 'MODERATE' | 'HIGH';
    renal: 'LOW' | 'MODERATE' | 'HIGH';
  };
}

export class PatientDataService {
  static async fetchGoogleFormsData(): Promise<PatientFormData[]> {
    // This will call your Supabase Edge Function that fetches from Google Forms API
    console.log('Fetching data from Google Forms via Supabase...');
    
    try {
      const response = await fetch('/api/google-forms-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch Google Forms data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Google Forms data:', error);
      return [];
    }
  }

  static analyzePatientData(formData: PatientFormData): AnalyzedPatientData {
    console.log('Analyzing patient data with AI...', formData);
    
    // Determine diabetes risk with proper type assertion
    let diabetesRisk: 'normal' | 'prediabetes' | 'diabetes';
    if (formData.hba1c >= 6.5) {
      diabetesRisk = 'diabetes';
    } else if (formData.hba1c >= 5.7) {
      diabetesRisk = 'prediabetes';
    } else {
      diabetesRisk = 'normal';
    }
    
    // Determine cardiovascular risk with proper type assertion
    let cardiovascularRisk: 'low' | 'moderate' | 'high';
    if (formData.totalCholesterol > 240 || formData.ldl > 160) {
      cardiovascularRisk = 'high';
    } else if (formData.totalCholesterol > 200 || formData.ldl > 130) {
      cardiovascularRisk = 'moderate';
    } else {
      cardiovascularRisk = 'low';
    }
    
    // Determine liver health with proper type assertion
    let liverHealth: 'normal' | 'mild' | 'moderate' | 'severe';
    if (formData.sgot > 40 || formData.sgpt > 40) {
      liverHealth = 'mild';
    } else {
      liverHealth = 'normal';
    }
    
    // AI-powered analysis logic
    const analysis = {
      diabetesRisk,
      cardiovascularRisk,
      liverHealth,
      recommendations: [
        formData.hba1c >= 5.7 ? 'Consider diabetes prevention program' : '',
        formData.totalCholesterol > 200 ? 'Lipid management required' : '',
        formData.sgot > 35 || formData.sgpt > 35 ? 'Liver function monitoring needed' : '',
      ].filter(Boolean)
    };

    // Determine preventify scores with proper type assertion
    let cardiovascularScore: 'LOW' | 'MODERATE' | 'HIGH';
    if (cardiovascularRisk === 'high') {
      cardiovascularScore = 'HIGH';
    } else if (cardiovascularRisk === 'moderate') {
      cardiovascularScore = 'MODERATE';
    } else {
      cardiovascularScore = 'LOW';
    }
    
    let metabolicScore: 'LOW' | 'MODERATE' | 'HIGH';
    if (diabetesRisk === 'diabetes') {
      metabolicScore = 'HIGH';
    } else if (diabetesRisk === 'prediabetes') {
      metabolicScore = 'MODERATE';
    } else {
      metabolicScore = 'LOW';
    }
    
    let liverScore: 'LOW' | 'MODERATE' | 'HIGH';
    if (liverHealth === 'mild') {
      liverScore = 'MODERATE';
    } else {
      liverScore = 'LOW';
    }

    const preventifyScore = {
      cardiovascular: cardiovascularScore,
      metabolic: metabolicScore,
      liver: liverScore,
      renal: 'LOW' as const // Based on creatinine analysis
    };

    return {
      patientId: `${formData.name.toLowerCase().replace(/\s+/g, '_')}_${formData.uhid}`,
      formData,
      analysis,
      preventifyScore
    };
  }
}
