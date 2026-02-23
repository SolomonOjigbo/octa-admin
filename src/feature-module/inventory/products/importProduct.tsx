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

const GlobalProductImport = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { loading, importResult, error, progress } = useSelector(
        (state: RootState) => state.globalProduct
    );


    const [file, setFile] = useState<File | null>(null);

    /* =========================
       HANDLE SUCCESS
    ========================= */
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
                setFile(null);
                dispatch(resetImportResult());
            });
        }
    }, [importResult, loading, dispatch]);

    /* =========================
       HANDLE SUBMIT
    ========================= */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            Swal.fire("Missing file", "Please select a CSV file", "warning");
            return;
        }

        dispatch(importGlobalProductsCsv(file));
    };

    return (
        <div className="modal fade" id="view-notes">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {/* ================= DOWNLOAD SAMPLE ================= */}
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-submit"
                                    onClick={() => downloadSampleCsv()}
                                >
                                    Download Sample CSV
                                </button>
                            </div>

                            {/* ================= UPLOAD FILE ================= */}
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

                            {/* ================= LOADING ================= */}
                            {loading && (
                                <div className="alert alert-info mt-3">
                                    Importing products, please wait...
                                </div>
                            )}
                            {loading && (
                                <div className="mt-3">
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            role="progressbar"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {progress}%
                                        </div>
                                    </div>

                                    <div className="text-center mt-2">
                                        Uploading CSV... {progress}%
                                    </div>
                                </div>
                            )}


                            {/* ================= ERROR ================= */}
                            {error && (
                                <div className="alert alert-danger mt-3">
                                    {error}
                                </div>
                            )}

                            {/* ================= SUBMIT ================= */}
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
