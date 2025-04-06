'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDollarSign, CalendarSearch, Inbox, User } from 'lucide-react';

interface CardSectionProps {
  clientNumber: string;
  installationNumber: string;
  mouthReference: string;
  paymentValue: string;
}

const CardSection = ({
  clientNumber,
  installationNumber,
  mouthReference,
  paymentValue,
}: CardSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Número do cliente
          </CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clientNumber}</div>
          <p className="text-xs text-muted-foreground">Numero do cliente</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Número da instalação
          </CardTitle>
          <Inbox className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{installationNumber}</div>
          <p className="text-xs text-muted-foreground">Número da instalação</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Mês de referência
          </CardTitle>
          <CalendarSearch className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mouthReference}</div>
          <p className="text-xs text-muted-foreground">Mês de referência</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor total</CardTitle>
          <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {paymentValue}</div>
          <p className="text-xs text-muted-foreground">Valor total a pagar</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardSection;
