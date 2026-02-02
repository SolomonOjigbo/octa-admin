import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateGlobalSupplier } from "../../core/redux/slices/globalSupplier";
import { Supplier, SupplierTenant } from "../../core/redux/types/globalSupplier";

interface Props {
  selectedSupplierEdit: Supplier | null;
}

const SupplierEditModal: React.FC<Props> = ({ selectedSupplierEdit }) => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentTerms: "",
    address: "",
    leadTime: 0,
    notes: "",
  });


  useEffect(() => {
    if (!selectedSupplierEdit) return;

    setForm({
      name: selectedSupplierEdit.name ?? "",
      email: selectedSupplierEdit.email ?? "",
      phone: selectedSupplierEdit.phone ?? "",
      paymentTerms: selectedSupplierEdit.paymentTerms ?? "",
      address: selectedSupplierEdit.address ?? "",
      leadTime: selectedSupplierEdit.leadTime ?? 0,
      notes: selectedSupplierEdit.notes ?? "",
    });
  }, [selectedSupplierEdit]);

  // Generic change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

     setForm({ ...form, [name]: value });

  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!selectedSupplierEdit) return;

    document.getElementById("edit-supplier-close-btn")?.click();

    const payload: Partial<Supplier> = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      paymentTerms: form.paymentTerms,
      address: form.address,
      leadTime: form.leadTime,
      notes: form.notes,

 
    };

    try {
      await dispatch<any>(updateGlobalSupplier(selectedSupplierEdit.id, payload));

      MySwal.fire("Updated!", "Supplier has been updated.", "success");
    } catch (error) {
      MySwal.fire("Error!", "Failed to update supplier.", "error");
    }
  };

  return (
    <div>
      <div className="modal fade" id="edit-supplier">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title"><h4>Edit Supplier</h4></div>
                  <button
                    id="edit-supplier-close-btn"
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

                      {/* Name */}
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

                      {/* Address */}
                      <div className="col-lg-6">
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
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Lead Time</label>
                          <input
                            type="number"
                            name="leadTime"
                            className="form-control"
                            value={form.leadTime}
                            onChange={(e) =>
                              setForm({ ...form, leadTime: Number(e.target.value) })
                            }
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="col-lg-6">
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
        </div>
      </div>
    </div>
  );
};

export default SupplierEditModal;
