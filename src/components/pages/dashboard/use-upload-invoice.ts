import { useState } from "react";

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
      if (file.type !== "application/pdf") {
        //todo: toast.error
        throw new Error("Somente arquivos PDF são permitidos.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        //todo: toast.error(result.error);
        throw new Error(result.error || "An unexpected error occurred.");
      }
      loadInvoices();
    } catch (error: any) {
      //todo: toast.error(result.error);
      setError(error.message || "An unexpected error occurred.");
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
