import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGlobalSupplier } from "../../../core/redux/slices/globalSupplier";

const SupplierModal = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentTerms: "",
    address: "",
    notes: "",
   leadTime: 0,
    tenantId: "",   
  });

  const handleChange = (e: any) => {
  const { name, value } = e.target;

  if (name === "leadTime") {
    setForm({ ...form, leadTime: Number(value) });
  } else {
    setForm({ ...form, [name]: value });
  }
};


  const handleSubmit = () => {
    document.getElementById("supplier-modal-close-btn")?.click();

    // Payload must match your API DTO
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      paymentTerms: form.paymentTerms,
      address: form.address,
      notes: form.notes,
      leadTime: Number(form.leadTime),
      //leadTime: form.leadTime,
      tenantId: form.tenantId,
      // ❗ NO IMAGE
      // ❗ NO isActive (taken from supplier.tenant.isActive backend side)
    };

    dispatch<any>(createGlobalSupplier(payload));

    // Reset
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      paymentTerms: "",
       leadTime: 0,  
      //leadTime: "",
      tenantId: "",
    });
  };

  return (
    <div>
      <div className="modal fade" id="supplier-modal">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">

                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Supplier</h4>
                  </div>
                  <button
                    id="supplier-modal-close-btn"
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

                      {/* Supplier Name */}
                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Supplier Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={form.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Email */}
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

                      {/* Phone */}
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

                       {/* Address */}
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

                       {/* Lead Time */}
                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Notes</label>
                          <input
                            type="text"
                            name="notes"
                            className="form-control"
                            value={form.notes}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                                  {/* Lead Time */}
                     <div className="col-lg-4">
  <div className="input-blocks">
    <label>Lead Time (days)</label>
    <input
      type="number"
      name="leadTime"
      className="form-control"
      value={form.leadTime}
      onChange={handleChange}
      min={0}
    />
  </div>
</div>


                      {/* Payment Terms */}
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Payment Terms</label>
                          <input
                            type="text"
                            name="paymentTerms"
                            className="form-control"
                            value={form.paymentTerms}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Tenant ID */}
                      <div className="col-lg-6">
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
                        Submit
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

export default SupplierModal;
