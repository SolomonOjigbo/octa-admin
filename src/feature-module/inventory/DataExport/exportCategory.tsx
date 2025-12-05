import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface CategoryExport {
  id: string;
  name: string;
  description: string | null;
  parentName: string | null;
  createdAt: string;
  updatedAt: string;
}

export const exportCategoriesToPDF = (categories: CategoryExport[]) => {
  const doc = new jsPDF();
  doc.text("Category List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [[
        "ID", 
        "Name", 
        "Description", 
        "Parent", 
        "Created", 
        "Updated"]],
    body: categories.map((c) => [
      c.id,
      c.name,
      c.description ?? "-",
      c.parentName ?? "-",
      new Date(c.createdAt).toLocaleString(),
      new Date(c.updatedAt).toLocaleString(),
    ]),
  });

  doc.save("categories.pdf");
};


export const exportCategoriesToExcel = (categories: CategoryExport[]) => {
  const excelFormatted = categories.map((c) => ({
    ID: c.id,
    Name: c.name,
    Description: c.description ?? "-",
    Parent: c.parentName ?? "-",
    CreatedAt: new Date(c.createdAt).toLocaleString(),
    UpdatedAt: new Date(c.updatedAt).toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

  XLSX.writeFile(workbook, "categories.xlsx");
};
