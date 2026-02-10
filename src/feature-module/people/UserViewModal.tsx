import React from "react";

const UserViewModal = ({ user }: { user: any }) => {
  if (!user) return null;

  return (
    <div className="modal fade" id="user-view-modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>User Details</h4>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}</p>
            <p>
              <strong>Created:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;
