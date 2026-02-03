// src/core/modals/inventory/addcategorylist.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createGlobalCategory, fetchGlobalCategories } from "../../redux/slices/globalCategory";
import Select from "react-select";

const AddCategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector((state: RootState) => state.globalCategory);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: "" as string | null,
  });

  // Fetch categories for parent select
  useEffect(() => {
    dispatch(fetchGlobalCategories());
  }, [dispatch]);

  // Handle input changes
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const target = e.target;
  const { name, value, type } = target;

  // Only HTMLInputElement has checked
  const checked = type === "checkbox" && target instanceof HTMLInputElement ? target.checked : undefined;

  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
};

  // Handle parent category select
  const handleParentChange = (option: any) => {
    setForm({ ...form, parentId: option?.value || null });
  };

  // Handle create/save
  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
      description: form.description,
      parentId: form.parentId,
    };

    await dispatch(createGlobalCategory(payload));
    dispatch(fetchGlobalCategories());

    // Close modal
    document.getElementById("add-category-close-btn")?.click();

    // Reset form
    setForm({ name: "", slug: "", description: "", parentId: null });
  };

  // Prepare parent category options for select
  const parentOptions = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <div>
      <div className="modal fade" id="add-category">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Create Category</h4>
                  </div>
                  <button
                    id="add-category-close-btn"
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
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Parent Category</label>
                      <Select
                        options={parentOptions}
                        value={parentOptions.find((opt) => opt.value === form.parentId) || null}
                        onChange={handleParentChange}
                        placeholder="Select Parent Category"
                        isClearable
                      />
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
                        Create Category
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

export default AddCategoryList;
