import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateGlobalVariant } from "../../../core/redux/slices/globalVariant";
import { AppDispatch } from "@/core/redux/store";

const VariantEditModal = ({ selectedVariantEdit }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const MySwal = withReactContent(Swal);

  const [form, setForm] = useState<any>({
    name: "",
    sku: "",
    costPrice: "",
    unitPrice: "",
    stock: "",
  });

  useEffect(() => {
    if (selectedVariantEdit) {
      setForm({
        name: selectedVariantEdit.name || "",
        sku: selectedVariantEdit.sku || "",
        costPrice: selectedVariantEdit.costPrice || "",
        unitPrice: selectedVariantEdit.unitPrice || "",
        stock: selectedVariantEdit.stock || "",
      });
    }
  }, [selectedVariantEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedVariantEdit?.id) return;

      document.getElementById("variant-edit-close-btn")?.click();

    await dispatch(
      updateGlobalVariant(selectedVariantEdit.id, {
        name: form.name,
        sku: form.sku,
        costPrice: Number(form.costPrice),
        unitPrice: Number(form.unitPrice),
        stock: Number(form.stock),
      })
    );

    MySwal.fire({
    icon: "success",
    title: "Updated",
    text: "Variant updated successfully",
    timer: 1500,
    showConfirmButton: true,
  });
    //MySwal.fire("Updated", "Variant updated successfully", "success");
   // document.getElementById("variant-edit-close-btn")?.click();
  };

  return (
    <div className="modal fade" id="variant-edit-modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Edit Variant</h4>
            <button
              id="variant-edit-close-btn"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            {["name", "sku", "costPrice", "unitPrice", "stock"].map((field) => (
              <div className="input-blocks" key={field}>
                <label>{field}</label>
                <input
                  className="form-control"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <button className="btn btn-submit mt-3" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default VariantEditModal;
