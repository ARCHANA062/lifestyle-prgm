
import React from 'react';
import { Heart, ChevronDown, ChevronRight, AlertTriangle, TrendingUp } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const CardiovascularRisk = ({ isOpen, onToggle }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-red-500">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="text-red-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">🫀 Cardiovascular Risk (QRISK3-Based)</h2>
          </div>
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-red-600" size={18} />
                <h3 className="font-semibold text-red-800">QRISK3 Score</h3>
              </div>
              <div className="text-2xl font-bold text-red-700">5.4%</div>
              <div className="text-sm text-red-600">Elevated Risk</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="text-gray-600" size={18} />
                <h3 className="font-semibold text-gray-800">Healthy Reference</h3>
              </div>
              <div className="text-2xl font-bold text-gray-700">0.6%</div>
              <div className="text-sm text-gray-600">Same-age healthy person</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-orange-600" size={18} />
                <h3 className="font-semibold text-orange-800">Relative Risk</h3>
              </div>
              <div className="text-2xl font-bold text-orange-700">8.4x</div>
              <div className="text-sm text-orange-600">Higher than healthy peer</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="text-purple-600" size={18} />
                <h3 className="font-semibold text-purple-800">Heart Age</h3>
              </div>
              <div className="text-2xl font-bold text-purple-700">51 years</div>
              <div className="text-sm text-purple-600">+18 years older</div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <h4 className="font-semibold text-red-800 mb-2">📌 Clinical Conclusion</h4>
            <p className="text-red-700 text-sm">
              <strong>High relative risk despite young age.</strong> Nishanth has 8.4 times higher risk of 
              cardiovascular disease than a healthy person of the same age. His cardiovascular system is 
              aging 18 years faster than normal. <strong>Aggressive risk factor reduction is strongly advised.</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
