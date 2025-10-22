
import React, { useState, useMemo, useCallback } from 'react';
import { DocumentType, DOCUMENT_TYPE_OPTIONS, COMMON_FIELDS, DOCUMENT_SPECIFIC_FIELDS } from './types';
import { generatePdfServiceCode } from './services/geminiService';
import OptionsPanel from './components/OptionsPanel';
import CodeDisplay from './components/CodeDisplay';
import Header from './components/Header';
import { GithubIcon } from './components/Icons';

const App: React.FC = () => {
  const [documentType, setDocumentType] = useState<DocumentType>('Invoice');
  const [selectedFields, setSelectedFields] = useState<Set<string>>(
    new Set([...COMMON_FIELDS.map(f => f.id), ...DOCUMENT_SPECIFIC_FIELDS['Invoice'].map(f => f.id)])
  );
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const availableFields = useMemo(() => {
    return [...COMMON_FIELDS, ...DOCUMENT_SPECIFIC_FIELDS[documentType]];
  }, [documentType]);

  const handleDocumentTypeChange = (newType: DocumentType) => {
    setDocumentType(newType);
    const newFields = new Set([
      ...COMMON_FIELDS.map(f => f.id),
      ...DOCUMENT_SPECIFIC_FIELDS[newType].map(f => f.id)
    ]);
    setSelectedFields(newFields);
    setGeneratedCode('');
    setError(null);
  };

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fieldId)) {
        newSet.delete(fieldId);
      } else {
        newSet.add(fieldId);
      }
      return newSet;
    });
  };

  const handleGenerateCode = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    try {
      const fieldLabels = availableFields
        .filter(field => selectedFields.has(field.id))
        .map(field => field.label);
      
      const code = await generatePdfServiceCode(documentType, fieldLabels);
      const cleanedCode = code.replace(/^```csharp\n|```$/g, '').trim();
      setGeneratedCode(cleanedCode);
    } catch (e) {
      setError('Failed to generate code. Please check your API key and try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [documentType, selectedFields, availableFields]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 xl:col-span-3">
          <OptionsPanel
            documentType={documentType}
            onDocumentTypeChange={handleDocumentTypeChange}
            availableFields={availableFields}
            selectedFields={selectedFields}
            onFieldToggle={handleFieldToggle}
            onGenerate={handleGenerateCode}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-8 xl:col-span-9">
          <CodeDisplay
            code={generatedCode}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
          <a href="https://github.com/google/generative-ai-docs/tree/main/app-integration/building-apps-with-google-apis/net-pdf-service-generator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
            <GithubIcon />
            View on GitHub
          </a>
      </footer>
    </div>
  );
};

export default App;
