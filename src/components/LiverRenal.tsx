
import React from 'react';
import { Activity, ChevronDown, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const LiverRenal = ({ isOpen, onToggle }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">🩺 Liver & Renal Health</h2>
          </div>
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Liver Function Tests</h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-yellow-800">SGOT</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-yellow-700">39 U/L</span>
                      <AlertTriangle className="text-yellow-600" size={16} />
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">Slightly elevated</div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-yellow-800">SGPT</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-yellow-700">48 U/L</span>
                      <AlertTriangle className="text-yellow-600" size={16} />
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">Mildly elevated</div>
                </div>

                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-orange-800">Ultrasound Finding</span>
                    <AlertTriangle className="text-orange-600" size={16} />
                  </div>
                  <div className="font-bold text-orange-700 mt-1">Grade I Fatty Liver</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Renal Function</h3>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-800">Creatinine</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-700">0.6 mg/dL</span>
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                </div>
                <div className="text-xs text-green-600 mt-1">Normal range</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-2">🧠 Clinical Interpretation</h4>
            <p className="text-blue-700 text-sm">
              <strong>Early metabolic fatty liver detected</strong> with mildly elevated liver enzymes, 
              likely related to insulin resistance and metabolic syndrome. <strong>No renal compromise detected</strong> - 
              creatinine levels are normal. Lifestyle modification focusing on weight loss and metabolic 
              improvement is recommended.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
