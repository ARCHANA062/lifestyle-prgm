
import React from 'react';
import { Activity, ChevronDown, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const Hematology = ({ isOpen, onToggle }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">🩸 Hematology</h2>
          </div>
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" size={18} />
                <h3 className="font-semibold text-green-800">Hemoglobin</h3>
              </div>
              <div className="text-2xl font-bold text-green-700">15.3 g/dL</div>
              <div className="text-sm text-green-600">Normal</div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={18} />
                <h3 className="font-semibold text-yellow-800">MCHC</h3>
              </div>
              <div className="text-2xl font-bold text-yellow-700">31.8 g/dL</div>
              <div className="text-sm text-yellow-600">Slightly low</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" size={18} />
                <h3 className="font-semibold text-green-800">Platelets</h3>
              </div>
              <div className="text-lg font-bold text-green-700">Normal</div>
              <div className="text-sm text-green-600">Within range</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" size={18} />
                <h3 className="font-semibold text-green-800">WBC & RBC</h3>
              </div>
              <div className="text-lg font-bold text-green-700">Normal</div>
              <div className="text-sm text-green-600">Within range</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-2">🧠 Clinical Interpretation</h4>
            <p className="text-blue-700 text-sm">
              <strong>Stable hematological profile</strong> with normal hemoglobin levels. The slightly 
              low MCHC (Mean Corpuscular Hemoglobin Concentration) may suggest early iron deficiency, 
              though hemoglobin remains normal. Consider iron studies if symptoms of fatigue develop.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
