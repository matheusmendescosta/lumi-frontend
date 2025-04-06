'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { FileText } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import useInvoices from '../use-invoices';
import { useUploadInvoice } from './use-upload-invoice';
import useListMouthReferenceOrder from './use-list-mouth-reference-order';

const data = [
  { month: 'JAN', desktop: 186 },
  { month: 'FEV', desktop: 305 },
  { month: 'MAR', desktop: 237 },
  { month: 'ABR', desktop: 73 },
  { month: 'MAI', desktop: 209 },
  { month: 'JUN', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig;

const OverviewSection = () => {
  const { invoices, loadInvoices } = useInvoices();
  const { uploadInvoice, loading, error } = useUploadInvoice({ loadInvoices });
  const { invoiceMouthOrder } = useListMouthReferenceOrder();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadInvoice(file);
    }
  };

  const recentInvoices = invoices.slice(-6);

  const mouthReference =
    invoiceMouthOrder?.map((invoice) => ({
      month: invoice.mouthReference || 'N/A',
      desktop: parseFloat(invoice.paymentValue) || 0,
    })) || [];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Valores dos últimos meses</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart
                data={mouthReference.length ? mouthReference : data}
                barCategoryGap="20%"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={40}
                />
                <Bar
                  dataKey="desktop"
                  fill={chartConfig.desktop.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Últimos uploads</CardTitle>
            <CardDescription>Lista dos últimos uploads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInvoices.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText />
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {invoice.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.clientNumber}
                    </p>
                  </div>
                </div>
                <div className="font-medium">{invoice.paymentValue}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="w-full">
        <CardHeader>Upload PDF</CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="pdf-upload"
              className="cursor-pointer bg-slate-500 text-white px-4 py-2 rounded-md dark:hover:bg-slate-600 transition"
            >
              Escolher arquivo PDF
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-sm text-muted-foreground">
              Apenas arquivos PDF são permitidos.
            </p>
          </div>

          {loading && <p>Enviando PDF...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewSection;
