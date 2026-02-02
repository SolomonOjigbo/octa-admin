import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface StoreExport {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export const exportStoresToPDF = (stores: StoreExport[]) => {
  const doc = new jsPDF();
  doc.text("Store List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [["ID", "Name", "Email", "Phone", "Address", "Created At"]],
    body: stores.map((c) => [
      c.id,
      c.name,
      c.email,
      c.phone,
      c.address,
      c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A",
    ]),
  });

  doc.save("stores.pdf");
};

export const exportStoresToExcel = (stores: StoreExport[]) => {
  const excelFormatted = stores.map((c) => ({
    ID: c.id,
    Name: c.name,
    Email: c.email,
    Phone: c.phone,
    Address: c.address,
    "Created At": c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  XLSX.writeFile(workbook, "stores.xlsx");
};
