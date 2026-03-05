import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { all_routes } from "../../../Router/all_routes";
import { DatePicker } from "antd";
import Addunits from "../../../core/modals/inventory/addunits";
import AddCategory from "../../../core/modals/inventory/addcategory";
import AddBrand from "../../../core/modals/addbrand";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Info,
  LifeBuoy,
  List,
  PlusCircle,
  Trash2,
  X,
} from "feather-icons-react/build/IconComponents";
import { RootState, AppDispatch } from "@/core/redux/store";
import {
  fetchGlobalProductById,
  updateGlobalProduct,
  updateSuccess,
} from "../../../core/redux/slices/globalProduct";
import { GlobalProduct, Variant } from "@/core/redux/types/globalProduct";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../core/redux/store";
import { setToogleHeader } from "../../../core/redux/action";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";

const EditProduct = () => {
  const route = all_routes;
  const { id } = useParams<{ id: string }>(); // get product id from route
  //const dispatch = useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //good
  // TS fix for useSelector
  // const selectedProduct = useSelector(
  //   (state: RootState) => state.globalProduct.selectedProduct
  // );
  const { selectedProduct, loading, error } = useAppSelector(
    (state) => state.globalProduct
  );

  // Fetch categories from Redux
const { categories } = useAppSelector((state) => state.globalCategory); // assuming you have a category slice


  // Local state for editing
  const [originalProduct, setOriginalProduct] = useState<GlobalProduct | null>(null);
  const [productData, setProductData] = useState<GlobalProduct | null>(null);
    const [variants, setVariants] = useState<Variant[]>([]);
  // const [name, setName] = useState("");
  // const [sku, setSku] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState<any>(null);
  //  const [brand, setBrand] = useState<any>(null);
  // const [image, setImage] = useState<string | null>(null);
  // const [isPrescription, setIsPrescription] = useState(false);
  // const [sellingType, setSellingType] = useState<any>(null);
  // const [isVariable, setIsVariable] = useState(false);
  // const [sellingPrice, setSellingPrice] = useState(0);
  // const [costPrice, setCostPrice] = useState(0);
  //   const [stock, setStock] = useState(0);



  useEffect(() => {
    if (id) {
      dispatch(fetchGlobalProductById(id));
    }
  }, [id, dispatch]);

  //   useEffect(() => {
  //   if (id) dispatch(fetchGlobalProductById(id));
  // }, [dispatch, id]);

  // When selectedProduct updates in store, update local state
  // useEffect(() => {
  //   if (selectedProduct) {
  //     setProductData(selectedProduct);
  //   }
  // }, [selectedProduct]);

  // Populate form when product is loaded
  // useEffect(() => {
  //   if (selectedProduct) {
  //     setName(selectedProduct.name || "");
  //     setSku(selectedProduct.sku || "");
  //    // setCategory(selectedProduct.category || null);
  //    // setBrand(selectedProduct.brand || null);
  //     setImage(selectedProduct.imageUrl || null);
  //   }
  // }, [selectedProduct]);

  // useEffect(() => {
  //   if (selectedProduct) {
  //     setProductData(selectedProduct);
  //     setName(selectedProduct.name || "");
  //     setSku(selectedProduct.sku || "");  
  //     setImage(selectedProduct.imageUrl || null);
  //     setDescription(selectedProduct.description || "");
  //     setCategory(selectedProduct.category || null);
  //     setBrand(selectedProduct.brand || null);
  //     setIsPrescription(selectedProduct.isPrescription || false);
  //     setSellingType(selectedProduct.sellingType || null);
  //     setIsVariable(selectedProduct.isVariable || false);
  //     setSellingPrice(selectedProduct.unitPrice || 0);
  //     setStock(selectedProduct.reorderQuantity || 0);
  //     setCostPrice(selectedProduct.costPrice || 0);


  //   }
  // }, [selectedProduct]);
    // Populate local state when product is loaded


// When selectedProduct in Redux changes, update local state
useEffect(() => {
  if (selectedProduct) {
    setProductData(selectedProduct);
    setOriginalProduct(selectedProduct); // store untouched version
    setVariants(selectedProduct.variants || []);
  }
}, [selectedProduct]);



  const handleChange = (field: keyof GlobalProduct, value: any) => {
    setProductData((prev) => prev ? { ...prev, [field]: value } : null);
  };

    // Handle product field changes
  const handleProductChange = (field: keyof GlobalProduct, value: any) => {
    setProductData(prev => prev ? { ...prev, [field]: value } : null);
  };

    // Handle variant changes
  const handleVariantChange = (index: number, field: keyof Variant, value: any) => {
    setVariants(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };


//   const handleSaveoo = async () => {
//   if (!productData || !productData.id) return;

//   try {
//     await dispatch(updateGlobalProduct(productData.id, {
//       ...productData,
//       //variants, // send updated variants as well
//     }));
//     alert("Product updated successfully!");
//     navigate("/product-list");
//   } catch (err: any) {
//     alert("Failed to update product: " + err.message);
//   }
// };
// useEffect(() => {
//   const load = async () => {
//     const p = await dispatch(fetchGlobalProductById(id));
//     setProductData(p);
//     setOriginalProduct(p); // store the untouched version
//   };
//   load();
// }, [id]);


const handleSave = async () => {
  if (!productData?.id || !originalProduct) return;

  try {
    const updatedFields: Partial<GlobalProduct> = {};

    (Object.keys(productData) as (keyof GlobalProduct)[]).forEach((key) => {
      if (productData[key] !== originalProduct[key]) {
        updatedFields[key] = productData[key] as any;
      }
    });

    await dispatch(updateGlobalProduct(productData.id, updatedFields));

    alert("Product updated successfully!");
    navigate("/product-list");
  } catch (err: any) {
    alert("Failed to update product: " + err.message);
  }
};




if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading product</div>;
  if (!productData) return <div>No product selected</div>;
  //end good

  //const data = useSelector((state) => state.toggle_header);

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const handleDateChange = (date: any) => {
  //   setSelectedDate(date);
  // };
  // const [selectedDate1, setSelectedDate1] = useState(new Date());
  // const handleDateChange1 = (date: any) => {
  //   setSelectedDate1(date);
  // };
  const renderCollapseTooltip = (props: any) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  // const [isImageVisible, setIsImageVisible] = useState(true);

  // const handleRemoveProduct = () => {
  //   setIsImageVisible(false);
  // };
  // const [isImageVisible1, setIsImageVisible1] = useState(true);

  // const handleRemoveProduct1 = () => {
  //   setIsImageVisible1(false);
  // };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Edit Product</h4>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Link to={route.productlist} className="btn btn-secondary">
                  <ArrowLeft className="me-2" />
                  Back to Product
                </Link>
              </div>
            </li>

          </ul>
        </div>
        {/* /add */}
        <form>
          <div className="card">
            <div className="card-body add-product pb-0">
              <div
                className="accordion-card-one accordion"
                id="accordionExample"
              >
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOne">
                    <div
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-controls="collapseOne"
                    >
                      <div className="addproduct-icon">
                        <h5>
                          <Info className="add-info" />

                          <span>Product Information</span>
                        </h5>
                        <Link to="#">
                          <ChevronDown className="chevron-down-add" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {/* <div className="row">
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">Store</label>
                            <Select
                              className="select"
                              //options={store}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">Warehouse</label>
                            <Select
                              className="select"
                              // options={warehouse}
                              placeholder="Legendary"
                            />
                          </div>
                        </div>
                      </div> */}
                      <div className="row">
                       <div className="col-lg-4 col-sm-6 col-12">
  <div className="mb-3 add-product">
    <label className="form-label">Product Name</label>
    <input
      type="text"
      value={productData?.name || ""}
      onChange={(e) => handleProductChange("name", e.target.value)}
      className="form-control"
    />
  </div>
</div>

                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="input-blocks add-product list">
                            <label>SKU</label>
                            <input
                              type="text"
                              value={productData?.sku || ""}
                                   onChange={(e) => handleProductChange("sku", e.target.value)}
                            //  onChange={(e) => setSku(e.target.value)}
                              className="form-control list"
                              placeholder="Enter SKU"
                            />
                            <Link
                              to={route.addproduct}
                              className="btn btn-primaryadd"
                            >
                              Generate Code
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="addservice-info">
                        <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
  <div className="mb-3 add-product">
    <div className="add-newplus d-flex justify-content-between align-items-center">
      <label className="form-label mb-0">Category</label>
      <Link
        to="#"
        data-bs-toggle="modal"
        data-bs-target="#add-units-category"
        className="d-flex align-items-center"
      >
        <PlusCircle className="plus-down-add me-1" />
        <span>Add New</span>
      </Link>
    </div>

    <Select
      className="select"
      options={categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }))}
      value={
        productData?.category
          ? { value: productData.category.id, label: productData.category.name }
          : null
      }
      onChange={(option: any) =>
        handleProductChange("category", {
          id: option.value,
          name: option.label,
        })
      }
      placeholder="Select Category"
    />
  </div>
</div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <label className="form-label">Sub Category</label>
                              <Select
                                className="select"
                                //options={subcategory}
                                placeholder="Lenovo"
                              />
                            </div>
                          </div>
                       
                        </div>
                      </div>
                      <div className="add-product-new">
                        <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <div className="add-newplus">
                                <label className="form-label">Brand</label>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-units-brand"
                                >
                                  <PlusCircle className="plus-down-add" />
                                  <span>Add New</span>
                                </Link>
                              </div>
                              <Select
                                className="select"
                                //options={brand}
                                placeholder="Nike"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <div className="add-newplus">
                                <label className="form-label">Unit</label>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-unit"
                                >
                                  <PlusCircle className="plus-down-add" />
                                  <span>Add New</span>
                                </Link>
                              </div>
                              <Select
                                className="select"
                                //options={unit}
                                placeholder="Kg"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <label className="form-label">Selling Type</label>
                               <input
      type="text"
      value={productData?.sellingType || ""}
      onChange={(e) => handleProductChange("sellingType", e.target.value)}
      className="form-control"
    />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">
                              Barcode Symbology
                            </label>
                            <Select
                              className="select"
                              //options={barcodesymbol}
                              placeholder="Code34"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12">
                          <div className="input-blocks add-product list">
                            <label>Item Code</label>
                            <input
                              type="text"
                              className="form-control list"
                              placeholder="Please Enter Item Code"
                            />
                            <Link
                              to={route.addproduct}
                              className="btn btn-primaryadd"
                            >
                              Generate Code
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* Editor */}
                      <div className="col-lg-12">
                        <div className="input-blocks summer-description-box transfer mb-3">
                          <label>Description</label>
                          <textarea
                            className="form-control h-100"
                            rows={5}
                            value={productData?.description}
                             onChange={(e) => handleProductChange("description", e.target.value)}
                            //onChange={(e) => setDescription(e.target.value)}
                            defaultValue={""}
                          />
                          <p className="mt-1">Maximum 60 Characters</p>
                        </div>
                      </div>
                      {/* /Editor */}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="accordion-card-one accordion"
                id="accordionExample2"
              >
                <div className="accordion-item">
                  <div className="accordion-header" id="headingTwo">
                    <div
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-controls="collapseTwo"
                    >
                      <div className="text-editor add-list">
                        <div className="addproduct-icon list icon">
                          <h5>
                            <LifeBuoy className="add-info" />
                            <span>Pricing &amp; Stocks</span>
                          </h5>
                          <Link to="#">
                            <ChevronDown className="chevron-down-add" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample2"
                  >
       <div className="accordion-body">
      {/* Product Type */}
      <div className="input-blocks add-products">
        <label className="d-block">Product Type</label>
        <div className="single-pill-product">
          <ul className="nav nav-pills" id="pills-tab1" role="tablist">
            <li className="nav-item" role="presentation">
              <span
                className={`custom_radio me-4 mb-0 ${!productData.isVariable ? "active" : ""}`}
                onClick={() => handleProductChange("isVariable", false)}
              >
                <input type="radio" checked={!productData.isVariable} readOnly />
                <span className="checkmark" /> Single Product
              </span>
            </li>
            <li className="nav-item" role="presentation">
              <span
                className={`custom_radio me-2 mb-0 ${productData.isVariable ? "active" : ""}`}
                onClick={() => handleProductChange("isVariable", true)}
              >
                <input type="radio" checked={productData.isVariable} readOnly />
                <span className="checkmark" /> Variable Product
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Single Product Fields */}
      {!productData.isVariable && (
        <div className="tab-pane fade show active">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="input-blocks add-product">
                <label>SKU</label>
                <input
                  type="text"
                  className="form-control"
                  value={productData.sku || ""}
                  onChange={e => handleProductChange("sku", e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="input-blocks add-product">
                <label>Unit Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={productData.unitPrice || 0}
                  onChange={e => handleProductChange("unitPrice", Number(e.target.value))}
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="input-blocks add-product">
                <label>Cost Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={productData.costPrice || 0}
                  onChange={e => handleProductChange("costPrice", Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variable Product Fields */}
      {productData.isVariable && (
        <div className="tab-pane fade show active">
          {variants.map((variant, index) => (
            <div key={variant.id} className="row mb-2">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="input-blocks add-product">
                  <label>Variant Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={variant.name}
                    onChange={e => handleVariantChange(index, "name", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-sm-6 col-12">
                <div className="input-blocks add-product">
                  <label>SKU</label>
                  <input
                    type="text"
                    className="form-control"
                    value={variant.sku}
                    onChange={e => handleVariantChange(index, "sku", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-sm-6 col-12">
                <div className="input-blocks add-product">
                  <label>Unit Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={variant.unitPrice || 0}
                    onChange={e => handleVariantChange(index, "unitPrice", Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-sm-6 col-12">
                <div className="input-blocks add-product">
                  <label>Cost Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={variant.costPrice || 0}
                    onChange={e => handleVariantChange(index, "costPrice", Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-sm-6 col-12">
                <div className="input-blocks add-product">
                  <label>Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    value={variant.stock || 0}
                    onChange={e => handleVariantChange(index, "stock", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Button */}
      <div className="mt-3">
        <button className="btn btn-primary"
        // onClick={handleSave}
         >
          Save Product
        </button>
      </div>
    </div>
                  </div>
                </div>
              </div>
              <div
                className="accordion-card-one accordion"
                id="accordionExample4"
              >
                <div className="accordion-item">
                  <div className="accordion-header" id="headingFour">
                    <div
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-controls="collapseFour"
                    >
                      <div className="text-editor add-list">
                        <div className="addproduct-icon list">
                          <h5>
                            <List className="add-info" />
                            <span>Custom Fields</span>
                          </h5>
                          <Link to="#">
                            <ChevronDown className="chevron-down-add" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample4"
                  >
                    <div className="accordion-body">
                      <div className="text-editor add-list add">
                        <div className="custom-filed">
                          <div className="input-block add-lists">
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                              Warranties
                            </label>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                              Manufacturer
                            </label>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                              Expiry
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks add-product">
                              <label>Discount Type</label>
                              <Select
                                className="select"
                                //options={discounttype1}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks add-product">
                              <label>Quantity Alert</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks">
                              <label>Manufactured Date</label>
                              <div className="input-groupicon calender-input">
                                <Calendar className="info-img" />
                                <DatePicker
                                  //selected={selectedDate}
                                 // onChange={handleDateChange}
                                  type="date"
                                  className="datetimepicker"
                                  // dateFormat="dd-MM-yyyy"
                                  placeholder="Choose Date"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks">
                              <label>Expiry On</label>
                              <div className="input-groupicon calender-input">
                                <Calendar className="info-img" />
                                <DatePicker
                                  // selected={selectedDate1}
                                 // onChange={handleDateChange1}
                                  type="date"
                                  className="datetimepicker"
                                  //dateFormat="dd-MM-yyyy"
                                  placeholder="Choose Date"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="btn-addproduct mb-4">
              <button type="button" className="btn btn-cancel me-2">
                Cancel
              </button>
                  <button className="btn btn-primary" onClick={handleSave}>
          Save Product
        </button>
              {/* <Link to={route.addproduct} className="btn btn-submit">
                Save Product
              </Link> */}
            </div>
          </div>
        </form>
        {/* /add */}
      </div>
      <Addunits />
      <AddCategory />
      <AddBrand />
    </div>
  );
};

export default EditProduct;
