import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/redux/store";
import { fetchGlobalProductById } from "../../core/redux/slices/globalProduct";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Descriptions } from "antd";
import { ArrowLeft } from "react-feather";
import { all_routes } from "../../Router/all_routes";

const ProductDetail: React.FC = () => {
    const route = all_routes;
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedProduct, loading, error } = useAppSelector(
    (state) => state.globalProduct
  );

  useEffect(() => {
    if (id) dispatch(fetchGlobalProductById(id));
  }, [id, dispatch]);
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="text-red-600 p-6">{error}</div>;
  if (!selectedProduct) return <div className="p-6">No product found</div>;

  const {
    name,
    sku,
    isActive,
    imageUrl,
    //category,
    //brand,
    description,
    variants,
    costPrice,
    unitPrice,
    dosageForm,
    strength,
    packaging,
    sellingType,
    isVariable,
  } = selectedProduct;
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                      <div className="page-title">
                           <h4>Product Details</h4>
              <h6>Full details of a product</h6>
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
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="bar-code-view">
                    <ImageWithBasePath src="assets/img/barcode/barcode1.png" alt="barcode" />
                    <a className="printimg">
                      <ImageWithBasePath src="assets/img/icons/printer.svg" alt="print" />
                    </a>
                  </div>
                  <div className="productdetails">
                    <ul className="product-bar">
                      <li>
                        <h4>Product</h4>
                        <h6>{name}</h6>
                      </li>
                      <li>
                        <h4>Category</h4>
                        <h6>{selectedProduct?.category?.name || "None"}</h6>
                      </li>
                      <li>
                        <h4>Brand</h4>
                        <h6>{selectedProduct?.brand?.name || "None"}</h6>
                      </li>
                      <li>
                        <h4>Dosage Form</h4>
                        <h6>{dosageForm || "No Dosage Form"}</h6>
                      </li>
                      <li>
                        <h4>Strength</h4>
                        <h6>{strength || "No Strength"}</h6>
                      </li>
                      <li>
                        <h4>Packaging</h4>
                        <h6>{packaging || "No Packaging"}</h6>
                      </li>
                      <li>
                        <h4>Selling Type</h4>
                        <h6>{sellingType || "No Selling Type"}</h6>
                      </li>
                      <li>
                        <h4>Is Variable</h4>
                        <h6>{isVariable ? "Yes" : "No"}</h6>
                      </li>
                      <li>
                        <h4>SKU</h4>
                        <h6>{sku}</h6>
                      </li>

                      <li>
                        <h4>Cost  Price</h4>
                        <h6>{costPrice}</h6>
                      </li>
                      <li>
                        <h4>Unit Price</h4>
                        <h6>{unitPrice}</h6>
                      </li>
                      <li>
                        <h4>Status</h4>
                        <h6>{isActive ? "Yes" : "No"}</h6>
                      </li>
                      <li>
                        <h4>Description</h4>
                        <h6>{description || "No Description"}</h6>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="slider-product-details">
                    <div className="owl-carousel owl-theme product-slide">
                      <div className="slider-product">
                        <ImageWithBasePath
                          src={selectedProduct.imageUrl || "assets/img/products/product69.png"}
                          alt={selectedProduct.name}
                        />

                        <h4>macbookpro.jpg</h4>
                        <h6>581kb</h6>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /add */}
        </div>
      </div>


    </div>
  )
}

export default ProductDetail
