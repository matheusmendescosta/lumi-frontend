'use client';

import useInvoices from '../use-invoices';
import CardSection from './CardSection';
import OverviewSection from './OverviewSection';

const DashboardPage = () => {
  const { invoices } = useInvoices();
  const lastInvoice = invoices[invoices.length - 1];

  return (
    <div className="p-4 space-y-6">
      <h1>Informações da última fatura enviada</h1>
      <CardSection
        installationNumber={lastInvoice?.installationNumber}
        mouthReference={lastInvoice?.mouthReference}
        clientNumber={lastInvoice?.clientNumber}
        paymentValue={lastInvoice?.paymentValue}
      />
      <OverviewSection />
    </div>
  );
};

export default DashboardPage;
