import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGlobalCustomer } from "../../../core/redux/slices/customer";
import { RootState } from "@/core/redux/store";

const CustomerModal = () => {
  const dispatch = useDispatch();

    const tenants = useSelector(
    (state: RootState) => state.tenant.tenants
  );
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [tenantSearch, setTenantSearch] = useState("");

  const [form, setForm] = useState({
    tenantId: "",
    tenantName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    isActive: true,
    loyaltyNumber: "",
    segment: "",
    tags: [] as string[],
    defaultPaymentTerm: "",
  });

    const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(tenantSearch.toLowerCase())
  );

  const handleTenantSelect = (tenant: any) => {
    setForm({
      ...form,
      tenantId: tenant.id,     // ✅ save ID
      tenantName: tenant.name, // show name in input
    });
    setShowTenantDropdown(false);
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;

  if (type === "checkbox" && e.target instanceof HTMLInputElement) {
    setForm({ ...form, [name]: e.target.checked });
  } else {
    setForm({ ...form, [name]: value });
  }
};


  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map(tag => tag.trim());
    setForm({ ...form, tags: tagsArray });
  };

  const handleSubmit = () => {
    document.getElementById("customer-modal-close-btn")?.click();

    const payload = {
      tenantId: form.tenantId,
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      address: form.address || null,
      gender: form.gender || null,
      dateOfBirth: form.dateOfBirth || null,
      isActive: form.isActive,
      loyaltyNumber: form.loyaltyNumber || null,
      segment: form.segment || null,
      tags: form.tags.length > 0 ? form.tags : null,
      defaultPaymentTerm: form.defaultPaymentTerm || null,
    };

    dispatch<any>(createGlobalCustomer(payload));

    // Reset form
    setForm({
      tenantId: "",
      tenantName: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      isActive: true,
      loyaltyNumber: "",
      segment: "",
      tags: [],
      defaultPaymentTerm: "",
    });
  };

  return (
    <div>
      <div className="modal fade" id="customer-modal">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">

                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Customer</h4>
                  </div>
                  <button
                    id="customer-modal-close-btn"
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

                       <div className="col-lg-4">
                <div className="input-blocks position-relative">
                  <label>Tenant</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search tenant..."
                    value={form.tenantName}
                    onFocus={() => setShowTenantDropdown(true)}
                    onChange={(e) => {
                      setTenantSearch(e.target.value);
                      setForm({ ...form, tenantName: e.target.value });
                      setShowTenantDropdown(true);
                    }}
                  />

                  {showTenantDropdown && (
                    <div
                      className="dropdown-menu show w-100"
                      style={{ maxHeight: 200, overflowY: "auto" }}
                    >
                      {filteredTenants.length === 0 && (
                        <div className="dropdown-item text-muted">
                          No tenants found
                        </div>
                      )}

                      {filteredTenants.map((tenant) => (
                        <button
                          type="button"
                          key={tenant.id}
                          className="dropdown-item"
                          onClick={() => handleTenantSelect(tenant)}
                        >
                          {tenant.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

                      {/* <div className="col-lg-4">

                        <div className="input-blocks">
                          <label>Tenant ID</label>
                          <input
                            type="text"
                            name="tenantId"
                            className="form-control"
                            value={form.tenantId}
                            onChange={handleChange}
                          />
                        </div>
                      </div> */}

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={form.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={form.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Address</label>
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={form.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Gender</label>
                          <input
                            type="text"
                            name="gender"
                            className="form-control"
                            value={form.gender}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Date of Birth</label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            className="form-control"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Loyalty Number</label>
                          <input
                            type="text"
                            name="loyaltyNumber"
                            className="form-control"
                            value={form.loyaltyNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Segment</label>
                          <input
                            type="text"
                            name="segment"
                            className="form-control"
                            value={form.segment}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Tags (comma separated)</label>
                          <input
                            type="text"
                            name="tags"
                            className="form-control"
                            value={form.tags.join(", ")}
                            onChange={handleTagsChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Default Payment Term</label>
                          <input
                            type="text"
                            name="defaultPaymentTerm"
                            className="form-control"
                            value={form.defaultPaymentTerm}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Active</label>
                          <input
                            type="checkbox"
                            name="isActive"
                            checked={form.isActive}
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
                        Add Customer
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

export default CustomerModal;
