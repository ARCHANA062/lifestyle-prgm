
import React from 'react';
import { Activity, ChevronDown, ChevronRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const MetabolicHealth = ({ isOpen, onToggle }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-yellow-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">🧬 Metabolic & Glycemic Health</h2>
          </div>
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={18} />
                <h3 className="font-semibold text-yellow-800">HbA1c</h3>
              </div>
              <div className="text-2xl font-bold text-yellow-700">6.0%</div>
              <div className="text-sm text-yellow-600">Prediabetes Range</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-green-600" size={18} />
                <h3 className="font-semibold text-green-800">Fasting Blood Sugar</h3>
              </div>
              <div className="text-2xl font-bold text-green-700">102 mg/dL</div>
              <div className="text-sm text-green-600">Normal Range</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-orange-600" size={18} />
                <h3 className="font-semibold text-orange-800">C-Peptide (Fasting)</h3>
              </div>
              <div className="text-2xl font-bold text-orange-700">1669 pmol/L</div>
              <div className="text-sm text-orange-600">High-Normal</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Clinical Interpretation</h4>
            <p className="text-blue-700 text-sm">
              Early insulin resistance with preserved β-cell function. The elevated C-peptide indicates 
              the pancreas is working harder to maintain normal glucose levels. Lifestyle intervention 
              is crucial at this stage.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
