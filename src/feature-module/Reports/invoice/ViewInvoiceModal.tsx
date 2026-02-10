import React from "react";

interface Props {
  invoice: any;
}

const ViewInvoiceModal: React.FC<Props> = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div
      className="modal fade"
      id="invoice-view-modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Invoice Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body">
            <p>
              <strong>Invoice No:</strong> {invoice.invoiceNo}
            </p>
            <p>
              <strong>Customer:</strong> {invoice.customer}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Amount:</strong> {invoice.amount}
            </p>
            <p>
              <strong>Paid:</strong> {invoice.paid}
            </p>
            <p>
              <strong>Amount Due:</strong> {invoice.amountDue}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  invoice.status === "Paid"
                    ? "badge-linesuccess"
                    : invoice.status === "Unpaid"
                    ? "badge-linedanger"
                    : "badges-warning"
                }`}
              >
                {invoice.status}
              </span>
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
