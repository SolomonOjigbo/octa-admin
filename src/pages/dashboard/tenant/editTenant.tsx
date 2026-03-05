import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateGlobalTenant } from "../../../core/redux/slices/tenantSlice";
import { Tenant } from "@/core/redux/types/tenantTypes";
import { AppDispatch } from "@/core/redux/store";

interface TenantEditModalProps {
  selectedTenantEdit: Tenant | null;
}

const TenantEditModal: React.FC<TenantEditModalProps> = ({
  selectedTenantEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const MySwal = withReactContent(Swal);
  const [form, setForm] = useState<Partial<Tenant>>({});

  useEffect(() => {
    if (selectedTenantEdit) {
      setForm({ ...selectedTenantEdit });
    }
  }, [selectedTenantEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedTenantEdit) return;

    try {
      const payload = {
  name: form.name,
  slug: form.slug,
  legalName: form.legalName,
  contactEmail: form.contactEmail,
  //type: form.type,
};
      await dispatch(
        updateGlobalTenant(selectedTenantEdit.id, payload)
      );

      MySwal.fire("Updated!", "Tenant has been updated.", "success");

      document
        .getElementById("tenant-edit-close-btn")
        ?.click();
    } catch (err: any) {
      MySwal.fire(
        "Error!",
        err.message || "Failed to update tenant.",
        "error"
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="tenant-edit-modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="modal-header border-0 custom-modal-header">
            <h4>Edit Tenant</h4>
            <button
              id="tenant-edit-close-btn"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body custom-modal-body">
            <form>
              <div className="row">

                {/* Name */}
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Slug */}
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Slug</label>
                    <input
                      type="text"
                      name="slug"
                      className="form-control"
                      value={form.slug || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Legal Name */}
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Legal Name</label>
                    <input
                      type="text"
                      name="legalName"
                      className="form-control"
                      value={form.legalName || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Contact Email */}
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      className="form-control"
                      value={form.contactEmail || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

              </div>

              <div className="modal-footer-btn">
                <button
                  type="button"
                  className="btn btn-cancel me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-submit"
                  onClick={handleSubmit}
                >
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

export default TenantEditModal;