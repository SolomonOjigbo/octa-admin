import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface CustomerExport {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export const exportCustomersToPDF = (customers: CustomerExport[]) => {
  const doc = new jsPDF();
  doc.text("Customer List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [["ID", "Name", "Email", "Phone", "Address", "Created At"]],
    body: customers.map((c) => [
      c.customerId,
      c.name,
      c.email,
      c.phone,
      c.address,
      c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A",
    ]),
  });

  doc.save("customers.pdf");
};

export const exportCustomersToExcel = (customers: CustomerExport[]) => {
  const excelFormatted = customers.map((c) => ({
    ID: c.customerId,
    Name: c.name,
    Email: c.email,
    Phone: c.phone,
    Address: c.address,
    "Created At": c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
  XLSX.writeFile(workbook, "customers.xlsx");
};
