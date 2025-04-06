export type invoiceDto = {
  id: string;
  name: string;
  clientNumber: string;
  installationNumber: string;
  mouthReference: string;
  dueDate: string;
  paymentValue: string;
  invoiceItems: {
    items: [
      {
        item: string;
        unid: string;
        quant: string;
        valor: string;
        pisCofins: string;
        precoUnit: string;
      }
    ][];
  };
}[];
