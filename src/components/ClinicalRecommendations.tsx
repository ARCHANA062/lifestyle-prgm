
import React from 'react';
import { FileText, ChevronDown, ChevronRight, Calendar, Activity, TrendingUp, Shield } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const ClinicalRecommendations = ({ isOpen, onToggle }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-indigo-500">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-indigo-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">📋 Clinical Recommendations</h2>
          </div>
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-green-600" size={18} />
                <h3 className="font-semibold text-green-800">Therapeutic Lifestyle Changes (TLC)</h3>
              </div>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Begin low-GI diet with emphasis on fiber-rich foods</li>
                <li>• Implement cardio-protective lifestyle modifications</li>
                <li>• Focus on weight management and waist circumference reduction</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-blue-600" size={18} />
                <h3 className="font-semibold text-blue-800">Monitoring Schedule</h3>
              </div>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• HbA1c monitoring every 3 months</li>
                <li>• Lipid profile assessment every 3 months</li>
                <li>• Urine ACR (albumin-to-creatinine ratio) every 3 months</li>
                <li>• Regular BP, weight, and waist measurements</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-yellow-600" size={18} />
                <h3 className="font-semibold text-yellow-800">Pharmacological Considerations</h3>
              </div>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• If LDL cholesterol not reduced with lifestyle, consider statin initiation</li>
                <li>• Monitor liver enzymes if statin therapy is started</li>
                <li>• Consider nephrology referral for persistent proteinuria</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="text-purple-600" size={18} />
                <h3 className="font-semibold text-purple-800">Patient Education Priorities</h3>
              </div>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Educate on QRISK3 score significance and cardiovascular risk</li>
                <li>• Explain the importance of relative risk reduction</li>
                <li>• Provide resources for diabetes prevention</li>
                <li>• Emphasize the reversibility of current conditions with lifestyle changes</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
