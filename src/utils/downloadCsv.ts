export const downloadSampleCsv = () => {
  const headers = [
    "name",
    "sku",
    "globalCategoryName",
    "brandName",
    "unitPrice",
    "costPrice",
    "description",
    "isVariable",
    "isPrescription",
    "isActive",
  ];

  const sampleRow = [
    "Sample Product",
    "SKU-001",
    "Analgesics",      // Category NAME (not ID)
    "Chefaro",         // Brand NAME (not ID, optional)
    "1000",
    "800",
    "Sample description",
    "false",
    "false",
    "true",
  ];

  const csvContent = headers.join(",") + "\n" + sampleRow.join(",");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "global-products-sample.csv";
  link.click();

  URL.revokeObjectURL(url);
};
