'use client';
import { invoiceDto } from '@/dto/invoiceDto';
import { useCallback, useEffect, useState } from 'react';

const useListMouthReferenceOrder = () => {
  const [invoiceMouthOrder, setInvoiceMouthOrder] = useState<invoiceDto>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInvoiceMouthReferenceOrder = useCallback(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/listmouthreference`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetch fail');
        }
        return response.json();
      })
      .then((data) => {
        setInvoiceMouthOrder(data);
      })
      .catch((fetchError) => {
        setError(fetchError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadInvoiceMouthReferenceOrder();
  }, [loadInvoiceMouthReferenceOrder]);

  return { isLoading, error, invoiceMouthOrder, loadInvoiceMouthReferenceOrder };
};

export default useListMouthReferenceOrder;
