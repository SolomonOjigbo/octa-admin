import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateGlobalUser } from "../../core/redux/slices/user";
import { User } from "@/core/redux/types/user";
import { AppDispatch } from "@/core/redux/store";

interface UserEditModalProps {
  selectedUserEdit: User | null;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ selectedUserEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const MySwal = withReactContent(Swal);
  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (selectedUserEdit) {
      setForm({ ...selectedUserEdit });
    }
  }, [selectedUserEdit]);


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
    if (!selectedUserEdit) return;
    try {
      await dispatch(updateGlobalUser(selectedUserEdit.id, form));
      MySwal.fire("Updated!", "User has been updated.", "success");
      document.getElementById("user-edit-close-btn")?.click();
    } catch (err: any) {
      MySwal.fire("Error!", err.message || "Failed to update user.", "error");
    }
  };

  return (
    <div className="modal fade" id="user-edit-modal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="modal-header border-0 custom-modal-header">
            <h4>Edit User</h4>
            <button
              id="user-edit-close-btn"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body custom-modal-body">
            <form>
              <div className="row">
                {[
                  "tenantId",
                  "firstName",
                  "lastName",
                  "email",
                  "phone",
                  "address",
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

export default UserEditModal;
