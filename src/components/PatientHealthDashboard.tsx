import React, { useState, useEffect } from 'react';
import { ExternalApiService, PatientRecord, AIInsight } from '../services/externalApiService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Activity, Heart, Brain, Moon, Zap, AlertTriangle } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export const PatientHealthDashboard = () => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    setIsLoading(true);
    try {
      const data = await ExternalApiService.fetchPatientData();
      setPatients(data);
      setLastUpdated(new Date().toLocaleString());
      
      // Auto-select first patient if available
      if (data.length > 0 && !selectedPatient) {
        handlePatientSelect(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch patient data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSelect = (patient: PatientRecord) => {
    setSelectedPatient(patient);
    const insights = ExternalApiService.generateAIInsights(patient);
    setAiInsights(insights);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreBadgeColor = (score: number, type: 'risk' | 'quality') => {
    if (type === 'risk') {
      if (score > 7) return 'destructive';
      if (score > 4) return 'secondary';
      return 'default';
    } else {
      if (score < 4) return 'destructive';
      if (score < 7) return 'secondary';
      return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                🤖 Preventify AI Dashboard
              </h1>
              <p className="text-gray-600">Real-time Patient Health Analytics & AI Insights</p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated}</p>
              )}
            </div>
            <button 
              onClick={fetchPatientData}
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Patient Selector */}
        <Card className="mb-6 border-l-4 border-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="text-purple-600" size={24} />
              Select Patient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Selection
                </label>
                {isLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select 
                    value={selectedPatient?.name || ''} 
                    onValueChange={(name) => {
                      const patient = patients.find(p => p.name === name);
                      if (patient) handlePatientSelect(patient);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a patient..." />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.name} value={patient.name}>
                          <div className="flex flex-col">
                            <span className="font-medium">{patient.name}</span>
                            <span className="text-xs text-gray-500">
                              {patient.age}y • {patient.gender} • {patient.diagnosis || 'No diagnosis'}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-800 font-medium">Data Source</div>
                <div className="text-xs text-blue-600">
                  📊 Google Sheets API<br/>
                  🔄 Real-time sync<br/>
                  🤖 AI Analysis Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Summary Panel */}
        {selectedPatient && (
          <div className="space-y-6">
            {/* AI Health Summary */}
            {aiInsights && (
              <Card className="border-l-4 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🧠 AI Health Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
                    <p className="text-gray-800 leading-relaxed font-medium">
                      {aiInsights.healthSummary}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium">Overall Risk Level:</span>
                    <Badge className={getRiskLevelColor(aiInsights.riskLevel)}>
                      {aiInsights.riskLevel.toUpperCase()}
                    </Badge>
                  </div>

                  {aiInsights.keyRiskFactors.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-orange-500" />
                        Key Risk Factors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {aiInsights.keyRiskFactors.map((factor, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* AI Clinical Summary */}
            {aiInsights && (
              <Card className="border-l-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-orange-600" size={24} />
                    AI Clinical Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <p className="text-gray-800 leading-relaxed">{aiInsights.summary}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">AI Recommendations</h4>
                      <ul className="space-y-1">
                        {aiInsights.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-blue-500 mt-0.5">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="text-blue-600" size={20} />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Name</span>
                    <p className="font-medium">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Age</span>
                    <p className="font-medium">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Gender</span>
                    <p className="font-medium">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <p className="font-medium text-xs">
                      {new Date(selectedPatient.timestamp || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {selectedPatient.symptoms && (
                  <div>
                    <span className="text-sm text-gray-600">Symptoms</span>
                    <p className="text-sm bg-gray-50 p-2 rounded mt-1">{selectedPatient.symptoms}</p>
                  </div>
                )}
                
                {selectedPatient.diagnosis && (
                  <div>
                    <span className="text-sm text-gray-600">Diagnosis</span>
                    <p className="text-sm bg-blue-50 p-2 rounded mt-1 font-medium">{selectedPatient.diagnosis}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vitals & Lab Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="text-green-600" size={20} />
                  Vitals & Lab Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-xs text-gray-600">Blood Sugar</span>
                    <p className="text-lg font-bold text-gray-800">{selectedPatient.bloodSugar} mg/dL</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-xs text-gray-600">FBS</span>
                    <p className="text-lg font-bold text-gray-800">{selectedPatient.fbs} mg/dL</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Diabetic Risk Score</span>
                    <Badge variant={getScoreBadgeColor(selectedPatient.diabeticRiskScore, 'risk')}>
                      {selectedPatient.diabeticRiskScore}/10
                    </Badge>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min(selectedPatient.diabeticRiskScore * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-600">ECG Results</span>
                  <p className="font-medium">{selectedPatient.ecg}</p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Hypertension Status</span>
                  <p className="font-medium">{selectedPatient.hypertension}</p>
                </div>
              </CardContent>
            </Card>

            {/* Risk Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-red-600" size={20} />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">QRISK Score</span>
                    <Badge variant={getScoreBadgeColor(selectedPatient.qrisk, 'risk')}>
                      {selectedPatient.qrisk}%
                    </Badge>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min(selectedPatient.qrisk * 5, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Stress Score</span>
                    <Badge variant={getScoreBadgeColor(selectedPatient.stressScore, 'risk')}>
                      {selectedPatient.stressScore}/10
                    </Badge>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${selectedPatient.stressScore * 10}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep & Lifestyle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="text-purple-600" size={20} />
                  Sleep & Lifestyle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Sleep Quality Score</span>
                    <Badge variant={getScoreBadgeColor(selectedPatient.sleepScore, 'quality')}>
                      {selectedPatient.sleepScore}/10
                    </Badge>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${selectedPatient.sleepScore * 10}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-3 rounded">
                  <h4 className="font-medium text-purple-800 mb-1">Sleep Analysis</h4>
                  <p className="text-xs text-purple-700">
                    {selectedPatient.sleepScore < 4 
                      ? 'Poor sleep quality detected. Consider sleep hygiene counseling.' 
                      : selectedPatient.sleepScore < 7
                      ? 'Moderate sleep quality. Monitor and improve sleep patterns.'
                      : 'Good sleep quality maintained.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Patient Selected State */}
        {!selectedPatient && !isLoading && (
          <Card className="text-center py-12">
            <CardContent>
              <Activity className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Patient Selected</h3>
              <p className="text-gray-600">Please select a patient from the dropdown above to view their health dashboard.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
