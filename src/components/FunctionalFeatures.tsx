
import React from 'react';
import { BarChart3, Download, Calendar, Smartphone, Info } from 'lucide-react';

export const FunctionalFeatures = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-500">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="text-gray-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">📈 Additional Features</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 transition-colors">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-blue-600" size={20} />
            <div className="text-left">
              <div className="font-semibold text-blue-800">Trend Charts</div>
              <div className="text-sm text-blue-600">HbA1c, Lipids, Creatinine</div>
            </div>
          </div>
        </button>

        <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 transition-colors">
          <div className="flex items-center gap-3">
            <Download className="text-green-600" size={20} />
            <div className="text-left">
              <div className="font-semibold text-green-800">Export Report</div>
              <div className="text-sm text-green-600">Download as PDF</div>
            </div>
          </div>
        </button>

        <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg border border-purple-200 transition-colors">
          <div className="flex items-center gap-3">
            <Smartphone className="text-purple-600" size={20} />
            <div className="text-left">
              <div className="font-semibold text-purple-800">WhatsApp Follow-up</div>
              <div className="text-sm text-purple-600">Quick appointment booking</div>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="text-gray-600 mt-0.5" size={18} />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Interactive Tooltips Available</h3>
            <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>• C-peptide significance</div>
              <div>• QRISK3 calculation method</div>
              <div>• Heart Age interpretation</div>
              <div>• Prediabetes management</div>
              <div>• Fatty liver implications</div>
              <div>• Proteinuria causes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
