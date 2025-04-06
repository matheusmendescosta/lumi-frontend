import { useState } from 'react';

interface Invoice {
  id: string;
  name: string;
  url: string;
}

interface UploadInvoiceProps {
  loadInvoices: () => void;
}

export const useUploadInvoice = ({ loadInvoices }: UploadInvoiceProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadInvoice = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      if (file.type !== 'application/pdf') {
        throw new Error('Somente arquivos PDF são permitidos.');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      await response.json();
      
      loadInvoices();
    } catch (err: any) {
      console.error('Erro ao fazer upload do PDF:', err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return {
    invoices,
    uploadInvoice,
    loading,
    error,
  };
};
