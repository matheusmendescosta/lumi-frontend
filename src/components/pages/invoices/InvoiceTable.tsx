'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useInvoices from '../use-invoices';

const InvoiceTable = () => {
  const { invoices } = useInvoices();

  return (
    <Table className="w-full border">
      <TableCaption>Faturas recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Arquivo</TableHead>
          <TableHead>Mês de Referencia</TableHead>
          <TableHead>Valor total</TableHead>
          <TableHead className="text-right">Acesso</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.name}</TableCell>
            <TableCell>{invoice.mouthReference}</TableCell>
            <TableCell>{invoice.paymentValue}</TableCell>
            <TableCell className="text-right">acessar</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
