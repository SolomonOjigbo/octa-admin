import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/redux/store";
import { createGlobalStore } from "../../../core/redux/slices/store";
import type { StoreType } from "../../../core/redux/types/tenantTypes";

interface StoreForm {
  tenantId: string;
  businessEntityId: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  type:
    | "RETAIL_STORE"
    | "WHOLESALE_WAREHOUSE"
    | "HOSPITAL_OPD"
    | "HOSPITAL_WARD"
    | "CLINIC_BRANCH"
    | "DIAGNOSTIC_CENTER";
  status: string;
  isMain: boolean;
}

const STORE_TYPES: StoreForm["type"][] = [
  "RETAIL_STORE",
  "WHOLESALE_WAREHOUSE",
  "HOSPITAL_OPD",
  "HOSPITAL_WARD",
  "CLINIC_BRANCH",
  "DIAGNOSTIC_CENTER",
];

const StoreModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get tenants from Redux store (like Customers)
  const { tenants = [] } = useSelector((state: RootState) => state.tenant); // make sure you have a tenant slice

  const [tenantSearch, setTenantSearch] = useState("");
  const [form, setForm] = useState<StoreForm>({
    tenantId: "",
    businessEntityId: "",
    code: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    type: "RETAIL_STORE",
    status: "ACTIVE",
    isMain: true,
  });

  // Filter tenants based on search
  const filteredTenants = useMemo(() => {
    const lower = tenantSearch.toLowerCase();
    return tenants.filter((t) => t.name.toLowerCase().includes(lower));
  }, [tenantSearch, tenants]);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  if (type === "checkbox" && e.target instanceof HTMLInputElement) {
    // Only input checkboxes have 'checked'
    setForm((prev) => ({ ...prev, [name]: e.target.checked }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleTenantSelect = (tenantId: string) => {
    setForm((prev) => ({ ...prev, tenantId }));
    setTenantSearch("");
  };

  const handleSubmit = () => {
    document.getElementById("store-modal-close-btn")?.click();
    dispatch<any>(createGlobalStore(form));
    setForm({
      tenantId: "",
      businessEntityId: "",
      code: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      type: "RETAIL_STORE",
      status: "ACTIVE",
      isMain: true,
    });
  };

  return (
    <div>
      <div className="modal fade" id="store-modal">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Store</h4>
                  </div>
                  <button
                    id="store-modal-close-btn"
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="modal-body custom-modal-body">
                  <form>
                    <div className="row">
                      {/* Tenant select with search */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Tenant</label>
                          <input
                            type="text"
                            placeholder="Search tenant..."
                            value={tenantSearch}
                            onChange={(e) => setTenantSearch(e.target.value)}
                            className="form-control mb-1"
                          />
                          <select
                            className="form-control"
                            value={form.tenantId}
                            onChange={(e) => handleTenantSelect(e.target.value)}
                          >
                            <option value="">Select tenant</option>
                            {filteredTenants.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* BusinessEntityId */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Business Entity ID</label>
                          <input
                            type="text"
                            name="businessEntityId"
                            className="form-control"
                            value={form.businessEntityId}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Other fields */}
                      {["code", "name", "address", "phone", "email"].map((field) => (
                        <div className="col-lg-6" key={field}>
                          <div className="input-blocks">
                            <label>{field}</label>
                            <input
                              type={field === "email" ? "email" : "text"}
                              name={field}
                              className="form-control"
                              value={(form as any)[field]}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      ))}

                      {/* Type select */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Type</label>
                          <select
                            name="type"
                            className="form-control"
                            value={form.type}
                            onChange={handleChange}
                          >
                            {STORE_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Status</label>
                          <select
                            name="status"
                            className="form-control"
                            value={form.status}
                            onChange={handleChange}
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </div>
                      </div>

                      {/* isMain */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Main Store</label>
                          <input
                            type="checkbox"
                            name="isMain"
                            checked={form.isMain}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer-btn mt-3">
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
                        Add Store
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;