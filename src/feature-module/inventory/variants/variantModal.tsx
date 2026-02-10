import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createGlobalVariant } from "../../../core/redux/slices/globalVariant";
import { AppDispatch, RootState } from "../../../core/redux/store";

const VariantModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ get products from globalProduct slice
  const { products = [] } = useSelector(
    (state: RootState) => state.globalProduct
  );

  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    costPrice: "",
    unitPrice: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredProducts = products.filter((p: any) =>
    `${p.name} ${p.sku}`.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!selectedProduct) {
      Swal.fire("Error", "Please select a product", "error");
      return;
    }

    try {
      await dispatch(
        createGlobalVariant({
          globalProductId: selectedProduct.id,
          name: form.name,
          sku: form.sku,
          costPrice: Number(form.costPrice),
          unitPrice: Number(form.unitPrice),
          stock: Number(form.stock),
        })
      );

      Swal.fire("Success", "Variant added successfully", "success");

      document.getElementById("variant-modal-close-btn")?.click();

      setForm({
        name: "",
        sku: "",
        costPrice: "",
        unitPrice: "",
        stock: "",
      });
      setSelectedProduct(null);
      setProductSearch("");
    } catch {
      Swal.fire("Error", "Failed to add variant", "error");
    }
  };

  return (
    <div className="modal fade" id="variant-modal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Add Variant</h4>
            <button
              id="variant-modal-close-btn"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            {/* ✅ PRODUCT SEARCH DROPDOWN */}
            <div className="input-blocks mb-3">
              <label>Select Product</label>
              <input
                className="form-control"
                placeholder="Search product by name or SKU"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />

              {productSearch && (
                <div className="border rounded mt-1 max-h-200 overflow-auto">
                  {filteredProducts.length ? (
                    filteredProducts.map((product: any) => (
                      <div
                        key={product.id}
                        className="p-2 cursor-pointer hover-bg"
                        onClick={() => {
                          setSelectedProduct(product);
                          setProductSearch(`${product.name} (${product.sku})`);
                        }}
                      >
                        <strong>{product.name}</strong>
                        <div className="text-muted small">{product.sku}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-muted">No products found</div>
                  )}
                </div>
              )}
            </div>

            {/* VARIANT FIELDS */}
            {["name", "sku", "costPrice", "unitPrice", "stock"].map((field) => (
              <div className="input-blocks" key={field}>
                <label className="text-capitalize">{field}</label>
                <input
                  className="form-control"
                  name={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <button className="btn btn-submit mt-3" onClick={handleSubmit}>
              Add Variant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantModal;
