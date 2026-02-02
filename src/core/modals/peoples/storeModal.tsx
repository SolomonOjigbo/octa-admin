import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGlobalStore } from "../../../core/redux/slices/store";

const StoreModal = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    tenantId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    isActive: true,
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;

  if (type === "checkbox" && e.target instanceof HTMLInputElement) {
    setForm({ ...form, [name]: e.target.checked });
  } else {
    setForm({ ...form, [name]: value });
  }
};



  const handleSubmit = () => {
    document.getElementById("store-modal-close-btn")?.click();

    const payload = {
      tenantId: form.tenantId,
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      address: form.address || null,
      isActive: form.isActive,
    };

    dispatch<any>(createGlobalStore(payload));

    // Reset form
    setForm({
      tenantId: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      isActive: true,
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

                      <div className="col-lg-4">
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
