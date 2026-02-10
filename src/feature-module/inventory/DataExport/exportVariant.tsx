import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface VariantExport {
  variantId: string;
  name: string;
  sku: string;
  costPrice: number | string;
  unitPrice: number | string;
  stock: number | string;
  createdAt: string;
}

/* =========================
   EXPORT VARIANTS TO PDF
========================= */
export const exportVariantsToPDF = (variants: VariantExport[]) => {
  const doc = new jsPDF();
  doc.text("Variant List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [["ID", "Name", "SKU", "Price", "Stock", "Created At"]],
    body: variants.map((v) => [
      v.variantId,
      v.name,
      v.sku,
      v.costPrice,
      v.unitPrice,
      v.stock,
      v.createdAt
        ? new Date(v.createdAt).toLocaleDateString()
        : "N/A",
    ]),
  });

  doc.save("variants.pdf");
};

/* =========================
   EXPORT VARIANTS TO EXCEL
========================= */
export const exportVariantsToExcel = (variants: VariantExport[]) => {
  const excelFormatted = variants.map((v) => ({
    ID: v.variantId,
    Name: v.name,
    SKU: v.sku,
    Price: v.costPrice,
    UnitPrice: v.unitPrice,
    Stock: v.stock,
    "Created At": v.createdAt
      ? new Date(v.createdAt).toLocaleDateString()
      : "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Variants");
  XLSX.writeFile(workbook, "variants.xlsx");
};
