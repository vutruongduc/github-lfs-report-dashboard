import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import type { UsageRecord } from '../types/usage';

interface FileUploadProps {
  onDataLoaded: (data: UsageRecord[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const validateRecord = (record: any): boolean => {
    const requiredFields = [
      'date',
      'product',
      'sku',
      'quantity',
      'unit_type',
      'username',
      'organization',
      'repository',
    ];
    return requiredFields.every((field) => field in record);
  };

  const processFile = useCallback(
    (file: File) => {
      setIsProcessing(true);
      setError(null);
      setFileName(file.name);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          try {
            if (results.errors.length > 0) {
              throw new Error(`CSV parsing errors: ${results.errors[0].message}`);
            }

            const data = results.data as any[];

            if (data.length === 0) {
              throw new Error('CSV file is empty');
            }

            if (!validateRecord(data[0])) {
              throw new Error(
                'CSV file is missing required columns. Please check the file format.'
              );
            }

            const typedData: UsageRecord[] = data.map((record) => ({
              date: String(record.date || ''),
              product: String(record.product || ''),
              sku: String(record.sku || ''),
              quantity: Number(record.quantity || 0),
              unit_type: String(record.unit_type || ''),
              applied_cost_per_quantity: Number(record.applied_cost_per_quantity || 0),
              gross_amount: Number(record.gross_amount || 0),
              discount_amount: Number(record.discount_amount || 0),
              net_amount: Number(record.net_amount || 0),
              username: String(record.username || ''),
              organization: String(record.organization || ''),
              repository: String(record.repository || ''),
              workflow_path: String(record.workflow_path || ''),
              cost_center_name: String(record.cost_center_name || ''),
            }));

            onDataLoaded(typedData);
            setIsProcessing(false);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setIsProcessing(false);
          }
        },
        error: (err) => {
          setError(`Failed to parse CSV: ${err.message}`);
          setIsProcessing(false);
        },
      });
    },
    [onDataLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type === 'text/csv') {
        processFile(file);
      } else {
        setError('Please upload a valid CSV file');
      }
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'}
        `}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          disabled={isProcessing}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Upload CSV file"
        />

        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
              <p className="text-gray-600">Processing {fileName}...</p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop your CSV file here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports GitHub Actions/LFS usage reports
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Error</h4>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {fileName && !error && !isProcessing && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <FileText className="w-5 h-5 text-green-500" />
          <p className="text-sm text-green-800">
            Successfully loaded <span className="font-medium">{fileName}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
