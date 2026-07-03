import React from "react";

const ViewVariantModal = ({ variant }: { variant: any }) => {
  return (
    <div
      className="modal fade"
      id="variant-view-modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Variant Details</h4>
            <button
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            {!variant ? (
              <div className="text-center text-muted py-5">
                Select a variant to view details
              </div>
            ) : (
              <>
                {/* Image */}
                {variant.imageUrl && (
                  <div className="text-center mb-4">
                    <img
                      src={variant.imageUrl}
                      alt={variant.name}
                      style={{ maxHeight: 200 }}
                      className="img-fluid rounded"
                    />
                  </div>
                )}

                <div className="row g-3">
                  <Detail label="Variant ID" value={variant.id} />
                  <Detail label="Name" value={variant.name} />
                  <Detail label="SKU" value={variant.sku} />
                  <Detail label="Cost Price" value={variant.costPrice} />
                  <Detail label="Unit Price" value={variant.unitPrice} />
                  <Detail label="Stock" value={variant.stock} />
                  <Detail label="Packaging" value={variant.packaging ?? "N/A"} />

                  <Detail
                    label="Created At"
                    value={new Date(variant.createdAt).toLocaleString()}
                  />
                  <Detail
                    label="Updated At"
                    value={new Date(variant.updatedAt).toLocaleString()}
                  />
                </div>

                {variant.product && (
                  <>
                    <hr />
                    <h5 className="mb-3">Product Information</h5>
                    <div className="row g-3">
                      <Detail label="Product Name" value={variant.product.name} />
                      <Detail label="Product SKU" value={variant.product.sku} />
                      <Detail
                        label="Category ID"
                        value={variant.product.globalCategoryId}
                      />
                      <Detail
                        label="Brand ID"
                        value={variant.product.brandId}
                      />
                      <Detail
                        label="Is Variable"
                        value={variant.product.isVariable ? "Yes" : "No"}
                      />
                      <Detail
                        label="Prescription"
                        value={
                          variant.product.isPrescription ? "Yes" : "No"
                        }
                      />
                      <Detail
                        label="Active"
                        value={variant.product.isActive ? "Yes" : "No"}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="modal-footer">
            <button
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

const Detail = ({ label, value }: any) => (
  <div className="col-md-6">
    <div className="border rounded p-2">
      <small className="text-muted">{label}</small>
      <div className="fw-semibold">{value ?? "N/A"}</div>
    </div>
  </div>
);

export default ViewVariantModal;
