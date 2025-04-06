'use client';
import { invoiceDto } from '@/dto/invoiceDto';
import { useCallback, useEffect, useState } from 'react';

const useInvoices = () => {
  const [invoices, setInvoices] = useState<invoiceDto>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = useCallback(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/list`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetch fail');
        }
        return response.json();
      })
      .then((data) => {
        setInvoices(data);
      })
      .catch((fetchError) => {
        setError(fetchError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  return { isLoading, error, invoices, loadInvoices };
};

export default useInvoices;
