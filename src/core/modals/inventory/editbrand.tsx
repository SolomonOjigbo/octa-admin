import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGlobalBrands, updateGlobalBrand } from "../../redux/slices/globalBrand";
import { X } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../img/imagewithbasebath";

interface Props {
  selectedBrandEdit: any; // Brand object passed from parent
}

const EditBrand: React.FC<Props> = ({ selectedBrandEdit }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    description: "",
    website: "",
    logoUrl: "",
    isActive: true,
    isGlobal: false,
  });

  const [newImage, setNewImage] = useState<File | null>(null);

  // Populate brand when modal opens
  useEffect(() => {
    if (selectedBrandEdit) {
      setForm({
        name: selectedBrandEdit.name || "",
        manufacturer: selectedBrandEdit.manufacturer || "",
        description: selectedBrandEdit.description || "",
        website: selectedBrandEdit.website || "",
        logoUrl: selectedBrandEdit.logoUrl || "",
        isActive: selectedBrandEdit.isActive ?? true,
        isGlobal: selectedBrandEdit.isGlobal ?? true,
      });
    }
  }, [selectedBrandEdit]);

  // Handle all text inputs
  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    let val = value;

    if (type === "select-one") val = value === "true";

    setForm({ ...form, [name]: val });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setNewImage(file);
  };

  const handleSubmit = async () => {
    document.getElementById("edit-brand-close-btn")?.click();

    const payload: any = {
      name: form.name,
      manufacturer: form.manufacturer,
      description: form.description,
      website: form.website,
      isActive: form.isActive,
      isGlobal: form.isGlobal,
      logoUrl: form.logoUrl,
    };

    // If new image is uploaded convert to base64 (if your API accepts file upload change this)
    if (newImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        payload.logoUrl = reader.result;
        dispatch<any>(updateGlobalBrand(selectedBrandEdit.id, payload));
        // dispatch<any>(fetchGlobalBrands());
      };
      reader.readAsDataURL(newImage);
    } else {
      dispatch<any>(updateGlobalBrand(selectedBrandEdit.id, payload));
      // dispatch<any>(fetchGlobalBrands());
    }
  };

  return (
    <div>
      {/* Edit Brand */}
      <div className="modal fade" id="edit-brand">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit Brand</h4>
                  </div>
                  <button
                    id="edit-brand-close-btn"
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="modal-body custom-modal-body new-employee-field">
                  <form>
                    {/* Brand Name */}
                    <div className="mb-3">
                      <label className="form-label">Brand Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Manufacturer */}
                    <div className="mb-3">
                      <label className="form-label">Manufacturer</label>
                      <input
                        type="text"
                        name="manufacturer"
                        className="form-control"
                        value={form.manufacturer}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Website */}
                    <div className="mb-3">
                      <label className="form-label">Website</label>
                      <input
                        type="text"
                        name="website"
                        className="form-control"
                        value={form.website}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Logo Image */}
                    <label className="form-label">Logo</label>
                    <div className="profile-pic-upload mb-3">
                      <div className="profile-pic brand-pic">
                        <span>
                          <ImageWithBasePath
                            src={newImage ? URL.createObjectURL(newImage) : form.logoUrl}
                            alt="brand-logo"
                          />
                        </span>
                        <button
                          type="button"
                          className="remove-photo"
                          onClick={() => {
                            setNewImage(null);
                            setForm({ ...form, logoUrl: "" });
                          }}
                        >
                          <X className="x-square-add" />
                        </button>
                      </div>

                      <div className="image-upload mb-0">
                        <input type="file" onChange={handleImageChange} />
                        <div className="image-uploads">
                          <h4>Change Image</h4>
                        </div>
                      </div>
                    </div>

                    {/* Status (isActive) */}
                    <div className="mb-3">
                      <label className="form-label">Active Status</label>
                      <select
                        name="isActive"
                        className="form-control"
                        value={form.isActive.toString()}
                        onChange={handleChange}
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>

                    {/* Is Global */}
                    <div className="mb-3">
                      <label className="form-label">Global Brand</label>
                      <select
                        name="isGlobal"
                        className="form-control"
                        value={form.isGlobal.toString()}
                        onChange={handleChange}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    {/* Buttons */}
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
      {/* Edit Brand */}
    </div>
  );
};

export default EditBrand;
