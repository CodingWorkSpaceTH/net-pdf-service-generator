
import React from 'react';
import { DocumentType, FieldOption, DOCUMENT_TYPE_OPTIONS } from '../types';
import Checkbox from './Checkbox';
import Button from './Button';
import { SparklesIcon } from './Icons';

interface OptionsPanelProps {
  documentType: DocumentType;
  onDocumentTypeChange: (type: DocumentType) => void;
  availableFields: FieldOption[];
  selectedFields: Set<string>;
  onFieldToggle: (fieldId: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  documentType,
  onDocumentTypeChange,
  availableFields,
  selectedFields,
  onFieldToggle,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5 space-y-6 sticky top-24">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          1. Select Document Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DOCUMENT_TYPE_OPTIONS.map((type) => (
            <button
              key={type}
              onClick={() => onDocumentTypeChange(type)}
              className={`px-3 py-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 ${
                documentType === type
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          2. Customize Fields
        </label>
        <div className="space-y-3 bg-gray-900/50 p-4 rounded-md border border-gray-700/50">
          {availableFields.map((field) => (
            <Checkbox
              key={field.id}
              id={field.id}
              label={field.label}
              checked={selectedFields.has(field.id)}
              onChange={() => onFieldToggle(field.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <Button onClick={onGenerate} disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 
            <>
              <SparklesIcon />
              Generate C# Service
            </>
          }
        </Button>
      </div>
    </div>
  );
};

export default OptionsPanel;
