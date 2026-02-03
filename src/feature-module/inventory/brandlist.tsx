import React, { useState, useEffect } from "react";
import { fetchGlobalBrands, deleteGlobalBrand } from "../../core/redux/slices/globalBrand";
import { AppDispatch, RootState } from "../../core/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom/dist';
import AddBrand from '../../core/modals/inventory/addbrand';
import EditBrand from '../../core/modals/inventory/editbrand';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable'
import Select from 'react-select';
import Sliders from 'feather-icons-react/build/IconComponents/Sliders';
import { ChevronUp, Filter, PlusCircle, RotateCcw, StopCircle, Zap } from 'feather-icons-react/build/IconComponents';
import { DatePicker } from 'antd';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { setToogleHeader } from '../../core/redux/action';
import withReactContent from 'sweetalert2-react-content';
import { GlobalBrand } from "@/core/redux/types/globalBrand";
import { exportBrandsToExcel, exportBrandsToPDF } from "./DataExport/exportBrand";

const BrandList = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { brands, loading } = useSelector((state: RootState) => state.globalBrand);

    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedBrandEdit, setSelectedBrandEdit] = useState<GlobalBrand | null>(null);
    const [isFilterVisible, setIsFilterVisible] = useState(false);


    useEffect(() => {
        dispatch(fetchGlobalBrands());
    }, [dispatch]);

    // Prepare table data
    const tableData = React.useMemo(
        () =>
            brands?.map((brand) => ({
                key: brand.id,
                brandId: brand.id,
                name: brand.name,
                manufacturer: brand.manufacturer || "N/A",
                description: brand.description || "N/A",

                isActive: brand.isActive ? "true" : "false",
                isGlobal: brand.isGlobal ? "true" : "false",
                tenantName: brand.tenant?.name || "N/A",
                // createdAt: new Date(brand.createdAt ?? ""),

                actions: "",
            })) || [],
        [brands]
    );
    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);


    //SEARCH
    useEffect(() => {
        applyFilterAndSearch();
    }, [searchText, selectedBrand, selectedStatus, selectedDate, tableData]);

    const applyFilterAndSearch = () => {
        let data = [...tableData];

        // BRAND filter
        if (selectedBrand) {
            data = data.filter((item) => item.brandId === selectedBrand);
        }

        // SEARCH filter
        if (searchText) {
            const lower = searchText.toLowerCase();
            data = data.filter(
                (item) =>
                    item.name.toLowerCase().includes(lower) ||
                    item.manufacturer.toLowerCase().includes(lower)
            );
        }

        setFilteredData(data);
    };
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };



    const MySwal = withReactContent(Swal);

    const showConfirmationAlert = (id: string) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#00ff00",
            confirmButtonText: "Yes, delete it!",
            cancelButtonColor: "#ff0000",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Delete the brand
                    await dispatch(deleteGlobalBrand(id));

                    // Optimistically update filtered brand table
                    setFilteredData((prev) => prev.filter((item) => item.brandId !== id));

                    // Optional: show success toast
                    MySwal.fire("Deleted!", "Brand has been deleted.", "success");
                } catch (error) {
                    // Optional: show error toast
                    MySwal.fire("Error!", "Failed to delete brand.", "error");
                }
            } else {
                MySwal.close();
            }
        });
    };

    const columns = [

        {
            title: "Brand",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.brand.length - b.brand.length,
        },
        {
            title: "Manufacturer",
            dataIndex: "manufacturer",
            sorter: (a: any, b: any) => a.manufacturer.length - b.manufacturer.length,
        },
        {
            title: "Description",
            dataIndex: "description",
            sorter: (a: any, b: any) => a.description.length - b.description.length,
        },
        {
            title: "Is Active",
            dataIndex: "isActive",
            sorter: (a: any, b: any) => a.isActive.length - b.isActive.length,
        },
        {
            title: "Is Global",
            dataIndex: "isGlobal",

            sorter: (a: any, b: any) => a.isGlobal.length - b.isGlobal.length,
        },
        {
            title: "Tenant Name",
            dataIndex: "tenantName",
            sorter: (a: any, b: any) => a.tenantName.length - b.tenantName.length,
        },
        // {
        //     title: "Logo",
        //     dataIndex: "logo",
        //     render: (text, record) => (
        //         <span className="productimgname">
        //             <Link to="#" className="product-img stock-img">
        //                 <ImageWithBasePath alt="" src={record.logo} />
        //             </Link>
        //         </span>
        //     ),
        //     sorter: (a, b) => a.logo.length - b.logo.length,
        //     width: "5%"
        // },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_: any, record: any) => (
                <td className="action-table-data">
                    <div className="edit-delete-action">

                        {/* EDIT BRAND */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-brand"
                            onClick={() => {
                                const found = brands.find((b) => b.id === record.brandId);
                                setSelectedBrandEdit(found || null);
                            }}
                        >
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>

                        {/* DELETE BRAND */}
                        <Link
                            className="confirm-text p-2"
                            to="#"
                        >
                            <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={() => showConfirmationAlert(record.brandId)}
                            // onClick={() => showConfirmationAlert(record.brandId)}
                            ></i>
                        </Link>
                    </div>
                </td>
            )
        },

    ]

    const exportData = brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        manufacturer: brand.manufacturer || "N/A",
        description: brand.description || "N/A",
        isActive: brand.isActive,
        isGlobal: brand.isGlobal,

        tenant: brand.tenant?.name || "N/A",

    }));

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Brand</h4>
                                <h6>Manage your brands</h6>
                            </div>
                        </div>
                        <ul className="table-top-head">
                            <li>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                                    <Link to="#" onClick={() => exportBrandsToPDF(exportData)}>
                                        <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                                    <Link to="#" onClick={() => exportBrandsToExcel(exportData)}>
                                        <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Printer</Tooltip>}>
                                    <Link to="#" onClick={() => window.print()}>
                                        <i data-feather="printer" className="feather-printer" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Refresh</Tooltip>}>
                                    <Link to="#" onClick={() => dispatch(fetchGlobalBrands())}>
                                        <RotateCcw />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                        </ul>
                        <div className="page-btn">
                            <Link
                                to="#"
                                className="btn btn-added"
                                data-bs-toggle="modal"
                                data-bs-target="#add-brand"
                            >
                                <PlusCircle className="me-2" />
                                Add New Brand
                            </Link>
                        </div>
                    </div>
                    {/* /product list */}
                    <div className="card table-list-card">
                        <div className="card-body">
                            <div className="table-top">
                                <div className="search-set">
                                    <div className="search-input">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            className="form-control form-control-sm formsearch"
                                        />
                                        <Link to="#" className="btn btn-searchset">
                                            <i data-feather="search" className="feather-search" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="search-path">
                                    <Link to="#" className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
                                        <Filter
                                            className="filter-icon"
                                            onClick={toggleFilterVisibility}
                                        />
                                        <span onClick={toggleFilterVisibility}>
                                            <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                        </span>
                                    </Link>
                                </div>
                                <div className="form-sort">
                                    <Sliders className="info-img" />
                                    <Select
                                        className="select"
                                        //  options={oldandlatestvalue}
                                        placeholder="Newest"
                                    />
                                </div>
                            </div>
                            {/* /Filter */}

                            <div
                                className={`card${isFilterVisible ? ' visible' : ''}`}
                                id="filter_inputs"
                                style={{ display: isFilterVisible ? 'block' : 'none' }}
                            >
                                <div className="card-body pb-0">
                                    <div className="row">


                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <Select
                                                className="select"
                                                placeholder="Filter by Brand"
                                                onChange={(opt: any) => setSelectedBrand(opt?.value ?? "")}
                                                options={[
                                                    { value: "", label: "All Brands" },
                                                    ...brands.map((b) => ({
                                                        value: b.id,
                                                        label: b.name,
                                                    })),
                                                ]}
                                            />
                                        </div>





                                        <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                                            <div className="input-blocks">
                                                <Link to="#" className="btn btn-filters ms-auto">
                                                    {" "}
                                                    <i data-feather="search" className="feather-search" />{" "}
                                                    Search{" "}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* /Filter */}
                            {/* <div className="table-responsive">
                                <Table props={{}} columns={columns} dataSource={filteredData} />

                            </div> */}
                            <div className="table-responsive">
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Table props={{}} columns={columns} dataSource={filteredData} />
                                )}
                            </div>

                        </div>
                        {/* /product list */}
                    </div>
                </div>
            </div>
            <AddBrand />
            <EditBrand selectedBrandEdit={selectedBrandEdit} />
        </div>
    )
}

export default BrandList;
