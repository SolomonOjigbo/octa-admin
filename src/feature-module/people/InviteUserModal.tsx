import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch } from "../../core/redux/store";
import { inviteUser } from "../../core/redux/slices/user";

const InviteUserModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    tenantId: "",
    roleId: "",
    email: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.tenantId || !form.roleId || !form.email) {
      Swal.fire("Error", "Tenant, role and email are required", "error");
      return;
    }

    await dispatch(inviteUser(form));
    Swal.fire("Success", "Invite sent successfully", "success");

    setForm({ tenantId: "", roleId: "", email: "", name: "" });
    document.getElementById("invite-user-close")?.click();
  };

  return (
    <div className="modal fade" id="invite-user-modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Invite User</h4>
            <button
              id="invite-user-close"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            {["tenantId", "roleId", "email", "name"].map((f) => (
              <div className="input-blocks" key={f}>
                <label className="text-capitalize">{f}</label>
                <input
                  className="form-control"
                  name={f}
                  value={(form as any)[f]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <button className="btn btn-submit mt-3" onClick={handleSubmit}>
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteUserModal;
