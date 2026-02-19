// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../core/redux/store";
// import {
//   importGlobalProductsCsv,
//   resetImportResult,
// } from "../../../core/redux/slices/globalProduct";
// import { downloadSampleCsv } from "../../../utils/downloadCsv";
// import ImageWithBasePath from "../../../core/img/imagewithbasebath";

// const GlobalProductImport = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, importResult, error } = useSelector(
//     (state: RootState) => state.globalProduct
//   );

//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     return () => {
//       dispatch(resetImportResult());
//     };
//   }, [dispatch]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       alert("Please select a CSV file");
//       return;
//     }
//     dispatch(importGlobalProductsCsv(file));
//   };

//   return (
//     <div className="modal fade" id="view-notes">
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-body">
//             <form onSubmit={handleSubmit}>
//               {/* Download */}
//               <div className="mb-3">
//                 <button
//                   type="button"
//                   className="btn btn-submit"
//                   onClick={downloadSampleCsv}
//                 >
//                   Download Sample CSV
//                 </button>
//               </div>

//               {/* Upload */}
//               <div className="input-blocks image-upload-down">
//                 <label>Upload CSV File</label>
//                 <div className="image-upload download">

//                   <input
//                     type="file"
//                     accept=".csv"
//                     onChange={(e) =>
//                       setFile(e.target.files?.[0] || null)
//                     }
//                   />
//                   <div className="image-uploads">
//                     <ImageWithBasePath
//                       src="assets/img/download-img.png"
//                       alt="img"
//                     />
//                     <h4>
//                       Drag and drop a <span>CSV file</span>
//                     </h4>
//                   </div>
//                 </div>
// {importResult && (
//   <div className="alert alert-success mt-3">
//     <strong>Import completed</strong>
//     <br />
//     Imported: {importResult.successCount}
//     <br />
//     Failed: {importResult.failedCount}

//     {importResult.errors.length > 0 && (
//       <ul className="mt-2">
//         {importResult.errors.map((err, idx) => (
//           <li key={idx}>
//             Row {err.row}: {err.message}
//           </li>
//         ))}
//       </ul>
//     )}
//   </div>
// )}


//               </div>

//               {/* Loading */}
//               {loading && <p className="mt-3">Importing...</p>}

//               {/* Success */}
//               {importResult && (
//                 <div className="alert alert-success mt-3">
//                   <strong>Import completed</strong>
//                   <br />
//                   Imported: {importResult.successCount}
//                   <br />
//                   Failed: {importResult.failedCount}

//                   {importResult.errors.length > 0 && (
//                     <ul className="mt-2">
//                       {importResult.errors.map((err, idx) => (
//                         <li key={idx}>
//                           Row {err.row}: {err.message}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}

//               {/* Error */}
//               {error && (
//                 <div className="alert alert-danger mt-3">
//                   {error}
//                 </div>
//               )}

//               <div className="modal-footer-btn mt-3">
//                 <button
//                   type="submit"
//                   className="btn btn-submit"
//                   disabled={loading}
//                 >
//                   Import Products
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GlobalProductImport;



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../../core/redux/store";
import {
    importGlobalProductsCsv,
    resetImportResult,
} from "../../../core/redux/slices/globalProduct";
import { downloadSampleCsv } from "../../../utils/downloadCsv";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { GlobalCategory } from "../../../core/redux/types/globalCategory";
import { Modal } from "react-bootstrap";

const GlobalProductImport = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { loading, importResult, error } = useSelector(
        (state: RootState) => state.globalProduct
    );

    //   const categories = useSelector(
    //     (state: RootState) => state.globalCategory
    //   );
    //   const categories: GlobalCategory[] = useSelector(
    //   (state: RootState) => state.globalCategory
    // );
    const categories = useSelector(
        (state: RootState) => state.globalCategory.categories
    );


    const brands = useSelector(
        (state: RootState) => state.globalBrand.brands
    );

    const [file, setFile] = useState<File | null>(null);
    const [categoryId, setCategoryId] = useState("");
    const [brandId, setBrandId] = useState("");

    useEffect(() => {
        if (importResult && !loading) {
            Swal.fire({
                icon: "success",
                title: "Import Completed",
                html: `
          <strong>${importResult.successCount}</strong> products imported<br/>
          <strong>${importResult.failedCount}</strong> failed
        `,
            }).then(() => {
                // close modal
                //(window as any).$("#view-notes").modal("hide");
//                 const modalEl = document.getElementById("view-notes");

// if (modalEl) {
//   const modalInstance = Modal.getInstance(modalEl);
//   modalInstance?.hide();
// }


                // reset state
                setFile(null);
                setCategoryId("");
                setBrandId("");
                dispatch(resetImportResult());
            });
        }
    }, [importResult, loading, dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            Swal.fire("Missing file", "Please select a CSV file", "warning");
            return;
        }

        if (!categoryId) {
            Swal.fire("Missing category", "Please select a category", "warning");
            return;
        }

        dispatch(importGlobalProductsCsv(file, categoryId, brandId));
    };

    return (
        <div className="modal fade" id="view-notes">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {/* Download */}
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-submit"
                                    disabled={!categoryId}
                                    onClick={() =>
                                        downloadSampleCsv(categoryId, brandId || undefined)
                                    }
                                >
                                    Download Sample CSV
                                </button>

                            </div>

                            {/* Category */}
                            <div className="mb-3">
                                <label>Global Category</label>
                                <select
                                    className="form-control"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Brand */}
                            <div className="mb-3">
                                <label>Global Brand (optional)</label>
                                <select
                                    className="form-control"
                                    value={brandId}
                                    onChange={(e) => setBrandId(e.target.value)}
                                >
                                    <option value="">No brand</option>
                                    {brands.map((b) => (
                                        <option key={b.id} value={b.id}>
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Upload */}
                            <div className="input-blocks image-upload-down">
                                <label>Upload CSV File</label>
                                <div className="image-upload download">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) =>
                                            setFile(e.target.files?.[0] || null)
                                        }
                                    />

                                    <div className="image-uploads">
                                        <ImageWithBasePath
                                            src="assets/img/download-img.png"
                                            alt="img"
                                        />
                                        <h4>
                                            Drag and drop a <span>CSV file</span>
                                        </h4>
                                    </div>
                                </div>

                                {file && (
                                    <p className="text-success mt-2">
                                        Selected file: <strong>{file.name}</strong>
                                    </p>
                                )}
                            </div>

                            {/* Progress */}
                            {loading && (
                                <div className="alert alert-info mt-3">
                                    Importing products, please wait...
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="alert alert-danger mt-3">
                                    {error}
                                </div>
                            )}

                            <div className="modal-footer-btn mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-submit"
                                    disabled={loading}
                                >
                                    {loading ? "Importing..." : "Import Products"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalProductImport;

