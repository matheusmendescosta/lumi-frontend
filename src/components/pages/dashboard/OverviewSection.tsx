"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useInvoices from "../use-invoices";

const data = [
  { name: "Jan", total: 4500 },
  { name: "Feb", total: 4100 },
  { name: "Mar", total: 2800 },
  { name: "Apr", total: 5200 },
  { name: "May", total: 3300 },
  { name: "Jun", total: 4400 },
  { name: "Jul", total: 4000 },
  { name: "Aug", total: 4700 },
  { name: "Sep", total: 2600 },
  { name: "Oct", total: 2300 },
  { name: "Nov", total: 1400 },
  { name: "Dec", total: 2700 },
];

const OverviewSection = () => {
  const { invoices } = useInvoices();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip />
              <Bar dataKey="total" fill="#ffffff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ultimos uploads</CardTitle>
          <CardDescription>Lista dos ultimos uploads.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoices.map((invoice, index) => (
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
  );
};

export default OverviewSection;
