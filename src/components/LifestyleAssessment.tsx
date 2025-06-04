
import React from 'react';
import { Users, ChevronDown, ChevronRight, CheckCircle, X, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const LifestyleAssessment = ({ isOpen, onToggle }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-purple-500">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">🧘‍♂️ Lifestyle Assessment</h2>
          </div>
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                🥗 Nutrition Assessment
              </h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-green-800 font-medium">Eats fruits/vegetables daily</span>
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <X className="text-red-600" size={16} />
                    <span className="text-red-800 font-medium">No structured diet plan</span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="text-yellow-600" size={16} />
                    <span className="text-yellow-800 font-medium">Reduce saturated fat, sugar, salt</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                🏃 Physical Activity
              </h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <X className="text-red-600" size={16} />
                    <span className="text-red-800 font-medium">Sedentary lifestyle</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="text-blue-800 text-sm">
                    <strong>Recommendation:</strong> Start 30-45 minutes of moderate-intensity activity daily
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                🚬 Smoking Status
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-gray-600" size={16} />
                  <span className="text-gray-800 font-medium">Status not recorded</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  "No current tobacco use reported – confirm during follow-up"
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                🧠 Motivation & Wellness
              </h3>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-yellow-600" size={16} />
                  <span className="text-yellow-800 font-medium">No structured wellness program</span>
                </div>
                <div className="text-xs text-yellow-600 mt-1">
                  Encourage gradual habit building and accountability tracking
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
