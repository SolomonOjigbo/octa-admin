import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface SupplierExport {
  name: string;
  email: string;
  phone: string;
  paymentTerms: string | null;
  tenant: string | null;
  createdAt: string | null;
}

// PDF Export
export const exportSuppliersToPDF = (suppliers: SupplierExport[]) => {
  const doc = new jsPDF();
  doc.text("Supplier List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [[
      "Name",
      "Email",
      "Phone",
      "Payment Terms",
      "Tenant",
      "Created At",
    ]],
    body: suppliers.map((s) => [
      s.name,
      s.email,
      s.phone,
      s.paymentTerms ?? "N/A",
      s.tenant ?? "N/A",
      s.createdAt ?? "N/A",
    ]),
  });

  doc.save("suppliers.pdf");
};

// Excel Export
export const exportSuppliersToExcel = (suppliers: SupplierExport[]) => {
  const excelFormatted = suppliers.map((s) => ({
    name: s.name,
    email: s.email,
    phone: s.phone,
    paymentTerms: s.paymentTerms ?? "N/A",
    tenant: s.tenant ?? "N/A",
    createdAt: s.createdAt ?? "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
  XLSX.writeFile(workbook, "suppliers.xlsx");
};
