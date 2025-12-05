import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface BrandExport {
  id: string;
  name: string;
  manufacturer: string | null;
  description: string | null;
  isActive: boolean;
  isGlobal: boolean;
  tenant: string | null;
}

export const exportBrandsToPDF = (brands: BrandExport[]) => {
  const doc = new jsPDF();
  doc.text("Brand List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [[
      "ID",
      "Name",
      "Manufacturer",
      "Description",
      "Active",
      "Global",
      "Tenant",
    ]],
    body: brands.map((b) => [
      b.id,
      b.name,
      b.manufacturer ?? "N/A",
      b.description ?? "N/A",
      b.isActive ? "Yes" : "No",
      b.isGlobal ? "Yes" : "No",
      b.tenant ?? "N/A",
    ]),
  });

  doc.save("brands.pdf");
};


export const exportBrandsToExcel = (brands: BrandExport[]) => {
  const excelFormatted = brands.map((b) => ({
    id: b.id,
    name: b.name,
    manufacturer: b.manufacturer ?? "N/A",
    description: b.description ?? "N/A",
    isActive: b.isActive ? "Yes" : "No",
    isGlobal: b.isGlobal ? "Yes" : "No",
    tenant: b.tenant ?? "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Brands");
  XLSX.writeFile(workbook, "brands.xlsx");
};
