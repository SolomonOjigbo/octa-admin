// src/components/invoice/InvoiceEditModal.tsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../core/redux/store";
import { updateInvoice } from "../../../core/redux/slices/invoice";
import { Invoice } from "../../../core/redux/types/invoice";

interface Props {
  selectedInvoiceEdit: Invoice | null;
}

const InvoiceEditModal: React.FC<Props> = ({ selectedInvoiceEdit }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Only state for fields you want to edit
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [status, setStatus] = useState<Invoice["status"]>("Unpaid");

  // Load current values when modal opens
  useEffect(() => {
    if (selectedInvoiceEdit) {
    //  setTotalAmount(selectedInvoiceEdit.totalAmount || 0);
      setStatus(selectedInvoiceEdit.status);
    }
  }, [selectedInvoiceEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceEdit) return;

    // Only send the fields you want to update
    const updatedInvoice: Partial<Invoice> = {
     // totalAmount,
      status,
    };

    // Dispatch with both id and DTO
    dispatch(updateInvoice(selectedInvoiceEdit.id, updatedInvoice));

    // Close modal
    const modalEl = document.getElementById("invoice-edit-modal");
    if (modalEl) (window as any).bootstrap.Modal.getInstance(modalEl)?.hide();
  };

  return (
    <div
      className="modal fade"
      id="invoice-edit-modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Invoice</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Total Amount</label>
               <input
  type="number"
  className="form-control"
  value={totalAmount}
  onChange={(e) => setTotalAmount(Number(e.target.value) || 0)} // convert to number
  required
/>

              </div>
              <div className="mb-3">
                <label>Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as Invoice["status"])
                  }
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Invoice
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceEditModal;
