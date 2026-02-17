import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface UserExport {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export const exportUsersToPDF = (users: UserExport[]) => {
  const doc = new jsPDF();
  doc.text("User List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [["ID", "Name", "Email", "Phone", "Address", "Created At"]],
    body: users.map((c) => [
      c.userId,
      c.name,
      c.email,
      c.phone,
      c.address,
      c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A",
    ]),
  });

  doc.save("users.pdf");
};

export const exportUsersToExcel = (users: UserExport[]) => {
  const excelFormatted = users.map((c) => ({
    ID: c.userId,
    Name: c.name,
    Email: c.email,
    Phone: c.phone,
    Address: c.address,
    "Created At": c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  XLSX.writeFile(workbook, "users.xlsx");
};
