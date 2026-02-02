import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateGlobalStore } from "../../../core/redux/slices/store";
import { Store } from "@/core/redux/types/store";
import { AppDispatch } from "@/core/redux/store";
import { getChangedFields } from "../../../utils/getChangedFields";

interface Props { 
  selectedStoreEdit: Store | null; 
}

const StoreEditModal: React.FC<Props> = ({ selectedStoreEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const MySwal = withReactContent(Swal);

  const [form, setForm] = useState<Partial<Store>>({});
  const [original, setOriginal] = useState<Store | null>(null);

  useEffect(() => {
    if (selectedStoreEdit) {
      setForm(selectedStoreEdit);
      setOriginal(selectedStoreEdit);
    }
  }, [selectedStoreEdit]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!original) return;

    const changed = getChangedFields(original, form);

    if (Object.keys(changed).length === 0) {
      MySwal.fire("No changes", "No field was modified.", "info");
      return;
    }

    try {
      await dispatch(updateGlobalStore(original.id, changed));
      MySwal.fire("Updated!", "Store updated successfully.", "success");
      document.getElementById("store-edit-close-btn")?.click();
    } catch (err: any) {
      MySwal.fire("Error!", err.message || "Failed to update store.", "error");
    }
  };

  return (
    <div className="modal fade" id="store-edit-modal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">

          <div className="modal-header border-0 custom-modal-header">
            <h4>Edit Store</h4>
            <button
              id="store-edit-close-btn"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body custom-modal-body">
            <form>

              <div className="row">
                {["name", "code", "email", "phone", "address"].map((field) => (
                  <div className="col-lg-4" key={field}>
                    <div className="input-blocks">
                      <label>{field}</label>
                      <input
                        type="text"
                        name={field}
                        className="form-control"
                        value={(form as any)[field] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ))}

                <div className="col-lg-4">
                  <div className="input-blocks">
                    <label>Is Main</label>
                    <input
                      type="checkbox"
                      name="isMain"
                      checked={form.isMain || false}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer-btn">
                <button className="btn btn-cancel me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button className="btn btn-submit" type="button" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreEditModal;
