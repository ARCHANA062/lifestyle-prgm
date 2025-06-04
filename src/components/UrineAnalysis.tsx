
import React from 'react';
import { Droplets, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const UrineAnalysis = ({ isOpen, onToggle }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-orange-500">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets className="text-orange-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">🧪 Urine Analysis</h2>
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
                <h3 className="font-semibold text-yellow-800">Protein</h3>
              </div>
              <div className="text-2xl font-bold text-yellow-700">+</div>
              <div className="text-sm text-yellow-600">Proteinuria detected</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-orange-600" size={18} />
                <h3 className="font-semibold text-orange-800">RBCs</h3>
              </div>
              <div className="text-2xl font-bold text-orange-700">3-5/HPF</div>
              <div className="text-sm text-orange-600">Microscopic hematuria</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="text-green-600" size={18} />
                <h3 className="font-semibold text-green-800">Pus Cells</h3>
              </div>
              <div className="text-2xl font-bold text-green-700">2-4/HPF</div>
              <div className="text-sm text-green-600">Within normal limits</div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h4 className="font-semibold text-orange-800 mb-2">🔍 Clinical Note</h4>
            <p className="text-orange-700 text-sm">
              <strong>Microscopic hematuria and proteinuria detected.</strong> These findings warrant 
              follow-up for comprehensive renal screening. Consider repeat urinalysis, urine ACR 
              (albumin-to-creatinine ratio), and nephrology consultation if persistent.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
