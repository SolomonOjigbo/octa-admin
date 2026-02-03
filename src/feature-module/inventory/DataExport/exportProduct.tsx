import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface ProductExport {
  id: string;
  product: string;
  sku: string;
  category: string;
  brand: string;
  //qty: number;
  createdAt: Date | string;
}

export const exportProductsToPDF = (products: ProductExport[]) => {
  const doc = new jsPDF();
  doc.text("Product List", 14, 12);

  autoTable(doc, {
    startY: 20,
    head: [["ID", "Product", "SKU", "Category", "Brand", "Created On"]],
    body: products.map((p) => [
      p.id,
      p.product,
      p.sku,
      p.category,
      p.brand,
     // p.qty,
      new Date(p.createdAt).toLocaleString(),
    ]),
  });

  doc.save("products.pdf");
};

export const exportProductsToExcel = (products: ProductExport[]) => {
  const excelFormatted = products.map((p) => ({
    ID: p.id,
    Product: p.product,
    SKU: p.sku,
    Category: p.category,
    Brand: p.brand,
    //Qty: p.qty,
    CreatedAt: new Date(p.createdAt).toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelFormatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  XLSX.writeFile(workbook, "products.xlsx");
};
