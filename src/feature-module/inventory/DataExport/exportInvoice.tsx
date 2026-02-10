import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface InvoiceExport {
  invoiceNo: string;
  status: string;
  totalAmount: number;
  tenantName: string;
  customerName: string;
  dueDate: string;
}

/* =========================
   EXPORT INVOICES TO PDF
========================= */
export const exportInvoicesToPDF = (invoices: InvoiceExport[]) => {
  const doc = new jsPDF();
  doc.text("Invoice List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [["Invoice No", "Customer", "Tenant", "Due Date", "Total Amount", "Status"]],
    body: invoices.map((inv) => [
      inv.invoiceNo,
      inv.customerName,
      inv.tenantName,
      inv.dueDate,
      inv.totalAmount,
      inv.status,
    ]),
  });

  doc.save("invoices.pdf");
};

/* =========================
   EXPORT INVOICES TO EXCEL
========================= */
export const exportInvoicesToExcel = (invoices: InvoiceExport[]) => {
  const excelFormatted = invoices.map((inv) => ({
    "Invoice No": inv.invoiceNo,
    Customer: inv.customerName,
    Tenant: inv.tenantName,
    "Due Date": inv.dueDate,
    "Total Amount": inv.totalAmount,
    Status: inv.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
  XLSX.writeFile(workbook, "invoices.xlsx");
};
