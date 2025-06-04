export interface PatientRecord {
  name: string;
  age: number;
  gender: string;
  symptoms: string;
  diagnosis: string;
  bloodSugar: number;
  fbs: number;
  hba1c: number;
  diabeticRiskScore: number;
  qrisk: number;
  ecg: string;
  hypertension: string;
  stressScore: number;
  sleepScore: number;
  timestamp?: string;
}

export interface AIInsight {
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  summary: string;
  recommendations: string[];
  keyRiskFactors: string[];
  healthSummary: string;
}

export class ExternalApiService {
  private static readonly API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLj3uPXI_G3Q2qMpKqb8l_VBqOs81cyCWdAQ_V_tBal4_7RFUUXG6K6JjeJtakXrWPDNlFaB5Tm3GN7jVqcfEhKJvGT6L99A6AeYhhne8QAef8veIN8gRQtoaSbRca4yyCUjM9K9NvBK79or9-dK_bFArawYF8TtljuvtyS8llUcyCQ6ijzeR38wF4ih9BhOdApivQI_0P_wQwLfVPHWP1n8lr_wba8PJkqzO40_sNNB3VPkWQLdbajVtijyg_aQ6c4K8AnyeyabMeyz8z_C6qnCWm5H7HexwrBbD97a&lib=MwctCU0IBxxYRpVsuD0aQMX7-A9KReanu';

  static async fetchPatientData(): Promise<PatientRecord[]> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      let patientData = data;

      if (data.values && Array.isArray(data.values[0])) {
        const headers = data.values[0];
        const rows = data.values.slice(1);
        patientData = rows.map((row: string[]) => {
          const entry: Record<string, string> = {};
          headers.forEach((key, i) => {
            entry[key.trim()] = row[i]?.trim() || '';
          });
          return entry;
        });
      }

      if (!Array.isArray(patientData) || patientData.length === 0) {
        return this.getMockData();
      }

      return this.transformApiData(patientData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      return this.getMockData();
    }
  }

  private static transformApiData(rawData: Record<string, string>[]): PatientRecord[] {
    return rawData.map((row, index) => ({
      name: row['Name'] || `Patient ${index + 1}`,
      age: this.calculateAge(row['Age'] || row['DOB']),
      gender: row['Sex'] || 'Unknown',
      symptoms: row['Symptoms'] || '',
      diagnosis: row['Diagnosis'] || '',
      bloodSugar: parseFloat(row['Fasting Glucose  '] || '0') || 0,
      fbs: parseFloat(row['FBS'] || '0') || 0,
      hba1c: parseFloat(row['HbA1c'] || '0') || 0,
      diabeticRiskScore: this.calculateDiabetesRiskScore(row),
      qrisk: this.calculateQRiskFromFormFields(row),
      ecg: row['ECG'] || 'Normal',
      hypertension: row['Hypertension Status'] || 'No',
      stressScore: parseFloat(
        row['Stress Score'] ||
        this.mapStressToScore(row['In the last month, how often have you felt nervous and stressed?']) ||
        '0'
      ) || 0,
      sleepScore: this.calculateSleepScore(row),
      timestamp: row['Timestamp'] || new Date().toISOString(),
    }));
  }

  private static calculateAge(dobString?: string): number {
    if (!dobString) return 0;
    try {
      const dob = new Date(dobString);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= 0 && age < 120 ? age : 0;
    } catch {
      return 0;
    }
  }

  private static mapStressToScore(input: string): string {
    const scale = {
      'never': '1',
      'almost never': '2',
      'sometimes': '4',
      'fairly often': '7',
      'very often': '9'
    };
    if (!input) return '0';
    const cleaned = input.trim().toLowerCase();
    return scale[cleaned] || '0';
  }

  private static calculateSleepScore(row: Record<string, string>): number {
    const sleepFields = [
      'I have difficulty falling asleep',
      'I wake up while sleeping',
      'I have difficulty getting back to sleep once i wake up in middle of the night',
      'I feel refreshed after sleep',
      'Poor sleep makes it hard to concentrate at work',
      'Sleepiness interferes with my daily life',
      'I am satisfied with my sleep',
    ];

    const scoreMap: Record<string, number> = {
      'never': 10,
      'rarely': 8,
      'sometimes': 6,
      'often': 3,
      'almost/always': 1,
      'almost always': 1
    };

    let total = 0;
    let count = 0;

    for (const field of sleepFields) {
      const value = (row[field] || '').toLowerCase().trim();
      if (value) {
        const val = scoreMap[value] ?? 5;
        total += val;
        count++;
      }
    }

    return count ? Math.round(total / count) : 0;
  }

  private static calculateQRiskFromFormFields(row: Record<string, string>): number {
    const age = this.calculateAge(row['Age'] || row['DOB']);
    const sex = (row['Sex'] || '').toLowerCase();
    const smoker = (row['Do you currently smoke tobacco?'] || '').toLowerCase() === 'yes';
    const diabetes = (row['Diabetes Status'] || '').toLowerCase() === 'yes';
    const systolic = parseInt((row['Blood pressure'] || '').split('/')?.[0] || '120');

    let score = 0;
    if (age > 40) score += 2;
    if (sex === 'male') score += 1;
    if (smoker) score += 2;
    if (diabetes) score += 3;
    if (systolic > 140) score += 2;

    return score;
  }

  private static calculateDiabetesRiskScore(row: Record<string, string>): number {
    const weight = parseFloat(row['Weight'] || '0');
    const height = parseFloat(row['Height(cm)'] || '0') / 100;
    const bmi = weight && height ? weight / (height * height) : 0;
    const familyHistory = (row['Family history of diabetes'] || '').toLowerCase().includes('parent');

    let score = 0;
    if (bmi > 25) score += 2;
    if (familyHistory) score += 2;
    if (parseFloat(row['Fasting Glucose  '] || '0') > 100) score += 3;

    return score;
  }

  private static getMockData(): PatientRecord[] {
    return [
      {
        name: 'Mr. Nishanth N (Mock Data - API Not Connected)',
        age: 45,
        gender: 'Male',
        symptoms: 'Chest pain, shortness of breath, fatigue',
        diagnosis: 'Hypertension, Pre-diabetes',
        bloodSugar: 145,
        fbs: 110,
        hba1c: 6.2,
        diabeticRiskScore: 65,
        qrisk: 25,
        ecg: 'Abnormal - LVH',
        hypertension: 'Stage 1',
        stressScore: 75,
        sleepScore: 45,
        timestamp: '2025-06-03T10:30:00Z'
      }
    ];
  }

  static generateAIInsights(patient: PatientRecord): AIInsight {
    const riskFactors: string[] = [];
    const recommendations: Set<string> = new Set();
    let riskLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    let riskScore = 0;

    // HbA1c Risk
    if (patient.hba1c >= 6.5) {
      riskFactors.push(`Diagnosed diabetes (HbA1c: ${patient.hba1c}%)`);
      recommendations.add('Start diabetes care plan with diet, exercise, and medications');
      recommendations.add('Repeat HbA1c every 3 months');
      riskScore += 3;
    } else if (patient.hba1c >= 5.7) {
      riskFactors.push(`Pre-diabetes (HbA1c: ${patient.hba1c}%)`);
      recommendations.add('Initiate lifestyle changes to prevent diabetes progression');
      recommendations.add('Repeat HbA1c in 6 months');
      riskScore += 2;
    }

    // Diabetes Risk
    if (patient.diabeticRiskScore > 60) {
      riskFactors.push('High diabetes risk');
      recommendations.add('Check HbA1c and blood sugar profile');
      riskScore += 2;
    } else if (patient.diabeticRiskScore > 30) {
      riskFactors.push('Moderate diabetes risk');
      recommendations.add('Encourage dietary changes and monitor sugars');
      riskScore += 1;
    }

    // Cardiovascular Risk
    if (patient.qrisk > 20) {
      riskFactors.push('Very high cardiovascular risk');
      recommendations.add('Start statin therapy and refer to cardiology');
      riskScore += 3;
    } else if (patient.qrisk > 10) {
      riskFactors.push('Elevated cardiovascular risk');
      recommendations.add('DASH diet, aerobic exercise, and lipid profile follow-up');
      riskScore += 2;
    }

    // Stress & Sleep
    const poorSleep = patient.sleepScore < 50;
    const highStress = patient.stressScore > 70;

    if (poorSleep && highStress) {
      riskFactors.push('Poor sleep quality with high stress');
      recommendations.add('Initiate CBT and sleep hygiene practices');
      riskScore += 2;
    } else {
      if (highStress) {
        riskFactors.push('High stress levels');
        recommendations.add('Suggest stress reduction techniques and therapy');
        riskScore += 1;
      }
      if (poorSleep) {
        riskFactors.push('Poor sleep quality');
        recommendations.add('Counsel on sleep hygiene and consider medical review');
        riskScore += 1;
      }
    }

    // Hypertension
    if (patient.hypertension !== 'No' && patient.hypertension !== 'Normal') {
      riskFactors.push('Hypertension present');
      recommendations.add('Monitor BP, reduce salt intake, consider medication');
      riskScore += 2;
    }

    // ECG
    if (patient.ecg !== 'Normal') {
      riskFactors.push('ECG abnormalities');
      recommendations.add('Refer to cardiology for detailed evaluation');
      riskScore += 2;
    }

    if (riskScore >= 8) riskLevel = 'critical';
    else if (riskScore >= 5) riskLevel = 'high';
    else if (riskScore >= 2) riskLevel = 'moderate';

    const summary = `${patient.age}-year-old ${patient.gender} with ${riskFactors.length} risk factor${riskFactors.length > 1 ? 's' : ''}.`;
    const healthSummary = riskFactors.length > 0
      ? `This patient shows signs of ${riskFactors.join(', ')}.`
      : 'No major risk factors identified.';

    return {
      riskLevel,
      summary,
      recommendations: Array.from(recommendations),
      keyRiskFactors: riskFactors,
      healthSummary,
    };
  }
}
