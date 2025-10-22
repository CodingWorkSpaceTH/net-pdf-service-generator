
export type DocumentType = 'Quotation' | 'Invoice' | 'Receipt' | 'Purchase Order';

export interface FieldOption {
  id: string;
  label: string;
}

export const DOCUMENT_TYPE_OPTIONS: DocumentType[] = [
  'Invoice',
  'Quotation',
  'Receipt',
  'Purchase Order',
];

export const COMMON_FIELDS: FieldOption[] = [
  { id: 'DocumentNumber', label: 'Document Number' },
  { id: 'IssueDate', label: 'Issue Date' },
  { id: 'CustomerName', label: 'Customer Name' },
  { id: 'CustomerAddress', label: 'Customer Address' },
];

export const DOCUMENT_SPECIFIC_FIELDS: Record<DocumentType, FieldOption[]> = {
  Invoice: [
    { id: 'DueDate', label: 'Due Date' },
    { id: 'PaymentTerms', label: 'Payment Terms' },
  ],
  Quotation: [
    { id: 'ValidUntil', label: 'Valid Until' },
    { id: 'PreparedBy', label: 'Prepared By' },
  ],
  Receipt: [
    { id: 'PaymentMethod', label: 'Payment Method' },
    { id: 'AmountPaid', label: 'Amount Paid' },
  ],
  'Purchase Order': [
    { id: 'VendorName', label: 'Vendor Name' },
    { id: 'ShippingAddress', label: 'Shipping Address' },
  ],
};
