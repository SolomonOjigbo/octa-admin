import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateGlobalCustomer } from "../../../core/redux/slices/customer";
import { Customer } from "@/core/redux/types/customer";
import { AppDispatch, RootState } from "@/core/redux/store";

interface CustomerEditModalProps {
  selectedCustomerEdit: Customer | null;
}

const CustomerEditModal: React.FC<CustomerEditModalProps> = ({ selectedCustomerEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const MySwal = withReactContent(Swal);
 const tenants = useSelector((state: RootState) => state.tenant.tenants);

  const [form, setForm] = useState<Partial<Customer>>({});
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [tenantSearch, setTenantSearch] = useState("");

  useEffect(() => {
    if (selectedCustomerEdit) {
      setForm({ ...selectedCustomerEdit });
    }
  }, [selectedCustomerEdit]);

    const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(tenantSearch.toLowerCase())
  );

  const handleTenantSelect = (tenant: any) => {
    setForm((prev) => ({
      ...prev,
      tenantId: tenant.id,
      tenantName: tenant.name, // optional, to show selected name
    }));
    setShowTenantDropdown(false);
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    // Cast to HTMLInputElement to safely access 'checked'
    const target = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [name]: target.checked }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setForm((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = async () => {
    if (!selectedCustomerEdit) return;
    try {
      const payload = {
  name: form.name,
  email: form.email,
  phone: form.phone,
  address: form.address,
  dateOfBirth: form.dateOfBirth,
  loyaltyNumber: form.loyaltyNumber,
  segment: form.segment,
  defaultPaymentTerm: form.defaultPaymentTerm,
  isActive: form.isActive,
  //tenantId: form.tenantId,
  tags: form.tags,
      }
      //await dispatch(updateGlobalCustomer(selectedCustomerEdit.id, form));
         await dispatch(updateGlobalCustomer(selectedCustomerEdit.id, payload));
      MySwal.fire("Updated!", "Customer has been updated.", "success");
      document.getElementById("customer-edit-close-btn")?.click();
    } catch (err: any) {
      MySwal.fire("Error!", err.message || "Failed to update customer.", "error");
    }
  };

  return (
    <div className="modal fade" id="customer-edit-modal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="modal-header border-0 custom-modal-header">
            <h4>Edit Customer</h4>
            <button
              id="customer-edit-close-btn"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
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
                      value={(form as any).tenantName || ""}
                      onFocus={() => setShowTenantDropdown(true)}
                      onChange={(e) => {
                        setTenantSearch(e.target.value);
                        setForm((prev) => ({ ...prev, tenantName: e.target.value }));
                        setShowTenantDropdown(true);
                      }}
                    />
                    {showTenantDropdown && (
                      <div
                        className="dropdown-menu show w-100"
                        style={{ maxHeight: 200, overflowY: "auto" }}
                      >
                        {filteredTenants.length === 0 && (
                          <div className="dropdown-item text-muted">No tenants found</div>
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
                {[
                 // "tenantId",
                  "name",
                  "email",
                  "phone",
                  "address",
                  "gender",
                  "dateOfBirth",
                  "loyaltyNumber",
                  "segment",
                  "defaultPaymentTerm",
                ].map((field) => (
                  <div className="col-lg-4" key={field}>
                    <div className="input-blocks">
                      <label>{field}</label>
                      <input
                        type={field === "email" ? "email" : "text"}
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
                    <label>Tags (comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      className="form-control"
                      value={form.tags?.join(", ") || ""}
                      onChange={handleTagsChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="input-blocks">
                    <label>Active</label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive || false}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer-btn">
                <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-submit" onClick={handleSubmit}>
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

export default CustomerEditModal;
