import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalCategories, updateGlobalCategory } from "../../redux/slices/globalCategory"; 
import Select from "react-select";
import { RootState } from "@/core/redux/store";
import { AnyObject } from "antd/es/_util/type";

interface Props {
  selectedCategoryEdit: any;
}

const EditCategoryList: React.FC<Props> = ({ selectedCategoryEdit }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.globalCategory);

  const [form, setForm] = useState({
    name: "",
    description: "",
    slug: "",
    status: true,
    parentId: "" as string | null,
  });

  // Populate modal when a category is selected
  useEffect(() => {
    if (selectedCategoryEdit) {
      setForm({
        name: selectedCategoryEdit.name || "",
        description: selectedCategoryEdit.description || "",
        slug: selectedCategoryEdit.name.toLowerCase().replace(/\s+/g, "-"),
        status: selectedCategoryEdit.subcategories?.length ? true : false,
        // Set parentId from selectedCategoryEdit.parent if exists
        parentId: selectedCategoryEdit.parent?.id || null,
      });
    }
  }, [selectedCategoryEdit]);

  // Prepare parent category options for select
  const parentOptions = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  // Handle parent category select
  const handleParentChange = (option: any) => {
    setForm({ ...form, parentId: option?.value || null });
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (!selectedCategoryEdit) return;

    document.getElementById("edit-category-close-btn")?.click();

    const payload = {
      name: form.name,
      description: form.description,
      parentId: form.parentId,
      imageUrl: selectedCategoryEdit.imageUrl,
    };

     // Only update parentId if it was changed
    if (form.parentId !== selectedCategoryEdit.parent?.id) {
      payload.parentId = form.parentId;
    }

    dispatch<any>(updateGlobalCategory(selectedCategoryEdit.id, payload));
    dispatch<any>(fetchGlobalCategories());
  };

  return (
    <div>
      <div className="modal fade" id="edit-category">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit Category</h4>
                  </div>
                  <button
                    id="edit-category-close-btn"
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="modal-body custom-modal-body">
                  <form>
                    {/* Category Name */}
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Category Description */}
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Parent Category */}
                    <div className="mb-3">
                      <label className="form-label">Parent Category</label>
                      <Select
                        options={parentOptions}
                        value={
                          form.parentId
                            ? parentOptions.find((opt) => opt.value === form.parentId) || null
                            : null
                        }
                        onChange={handleParentChange}
                        placeholder="Select Parent Category"
                        isClearable
                      />
                    </div>

                    {/* Category Slug */}
                    <div className="mb-3">
                      <label className="form-label">Category Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                      />
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
    </div>
  );
};

export default EditCategoryList;
