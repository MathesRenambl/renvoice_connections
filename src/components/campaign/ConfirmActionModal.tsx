import { X } from 'lucide-react'
import React from 'react'

function ConfirmActionModal({modalConfig,onClose,onConfirm}) {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                
                <h2 className="text-xl flex flex-row font-semibold text-gray-900">
                    {modalConfig.icon}
                  {modalConfig.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                {modalConfig.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 p-6 pt-0">
              <button
                onClick={onClose}
                className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 bg-black text-white px-4 py-2 rounded-lg transition-colors font-medium `}
              >
                {modalConfig.confirmText}
              </button>
            </div>
          </div>
        </div>
     
    </div>
  
  )
  
}

export default ConfirmActionModal
