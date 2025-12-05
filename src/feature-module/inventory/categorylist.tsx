import React, { useState, useEffect } from "react";
import { fetchGlobalCategories, deleteGlobalCategory } from "../../core/redux/slices/globalCategory";
import { AppDispatch, RootState } from "../../core/redux/store";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import {
    Filter,
    PlusCircle,
    RotateCcw,
    Sliders,
    StopCircle,
    Zap,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { DatePicker } from "antd";
import AddCategoryList from "../../core/modals/inventory/addcategorylist";
import EditCategoryList from "../../core/modals/inventory/editcategorylist";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import dayjs from "dayjs";
import small from "../../assets/images/logo-small.png";
import { exportCategoriesToExcel, exportCategoriesToPDF } from "./DataExport/exportCategory";
import { GlobalCategory } from "@/core/redux/types/globalCategory";


interface CategoryRow {
  key: string;
  categoryId: string;
  category: string;
  categoryDescription: string;
  parentCategory: string;
  image: string;
  createdon: Date;
  status: string;
  actions: string;
}


const CategoryList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading } = useSelector((state: RootState) => state.globalCategory);

    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedCategoryEdit, setSelectedCategoryEdit] = useState<GlobalCategory | null>(null);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const MySwal = withReactContent(Swal);

    // Fetch categories once on mount
    useEffect(() => {
        dispatch(fetchGlobalCategories());
    }, [dispatch]);

    // Prepare table data
    // const tableData = React.useMemo(
    //     () =>
    //         categories?.map((cat) => ({
    //             key: cat.id,
    //             categoryId: cat.id,
    //             category: cat.name,
    //             categoryDescription: cat.description || "N/A",
    //             parentCategory: cat.parent?.name || "No Parent",
    //             image: cat.imageUrl || small,
    //             // createdon: new Date(cat.createdAt ?? "").toLocaleDateString(),
    //             createdon: new Date(cat.createdAt ?? ""),

    //             status: cat.subcategories?.length ? "Has Subcategories" : "No Subcategories",
    //             actions: "",
    //         })) || [],
    //     [categories]
    // );
    // Remove tableData useMemo
// const tableData = React.useMemo(...);

// Instead, useEffect to update filteredData whenever categories change
useEffect(() => {
    const tableData: CategoryRow[] = categories?.map((cat) => ({
        key: cat.id,
        categoryId: cat.id,
        category: cat.name,
        categoryDescription: cat.description || "N/A",
        parentCategory: cat.parent?.name || "No Parent",
        image: cat.imageUrl || small,
        createdon: cat.createdAt ? new Date(cat.createdAt) : new Date(),
        status: cat.subcategories && cat.subcategories.length > 0 ? "Has Subcategories" : "No Subcategories",
        actions: "",
    })) || [];

    setFilteredData(tableData);
}, [categories]);



    // useEffect(() => {
    //     setFilteredData(tableData);
    // }, [tableData]);

 const handleSearch = (text: string) => {
    setSearchText(text);
    const lowerText = text.toLowerCase();

    const filtered = filteredData.filter((item: CategoryRow) =>
        item.category.toLowerCase().includes(lowerText) ||
        item.parentCategory.toLowerCase().includes(lowerText) ||
        item.status.toLowerCase().includes(lowerText) ||
        item.createdon.toLocaleDateString().includes(text)
    );
    setFilteredData(filtered);
};

const handleFilter = () => {
    let data: CategoryRow[] = categories.map((cat) => ({
        key: cat.id,
        categoryId: cat.id,
        category: cat.name,
        categoryDescription: cat.description || "N/A",
        parentCategory: cat.parent?.name || "No Parent",
        image: cat.imageUrl || small,
        createdon: cat.createdAt ? new Date(cat.createdAt) : new Date(),
        status: cat.subcategories && cat.subcategories.length > 0 ? "Has Subcategories" : "No Subcategories",
        actions: "",
    }));

    if (selectedCategory) {
        data = data.filter((item: CategoryRow) => item.categoryId === selectedCategory);
    }

    if (selectedStatus) {
        data = data.filter((item: CategoryRow) =>
            selectedStatus === "active"
                ? item.status === "Has Subcategories"
                : item.status === "No Subcategories"
        );
    }

    if (selectedDate) {
        data = data.filter((item: CategoryRow) => {
            const itemDate = new Date(item.createdon);
            return (
                itemDate.getFullYear() === selectedDate.getFullYear() &&
                itemDate.getMonth() === selectedDate.getMonth() &&
                itemDate.getDate() === selectedDate.getDate()
            );
        });
    }

    if (searchText) {
        const lowerText = searchText.toLowerCase();
        data = data.filter((item: CategoryRow) =>
            item.category.toLowerCase().includes(lowerText) ||
            item.parentCategory.toLowerCase().includes(lowerText) ||
            item.status.toLowerCase().includes(lowerText) ||
            item.createdon.toLocaleDateString().includes(searchText)
        );
    }

    setFilteredData(data);
};


    // const showDeleteConfirmation = (id: string) => {
    //     MySwal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         showCancelButton: true,
    //         confirmButtonColor: "#00ff00",
    //         confirmButtonText: "Yes, delete it!",
    //         cancelButtonColor: "#ff0000",
    //         cancelButtonText: "Cancel",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             dispatch(deleteGlobalCategory(id));
    //             dispatch(fetchGlobalCategories());
    //         }
    //     });
    // };

    const showDeleteConfirmation = (id: string) => {
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
                // Delete the category
                await dispatch(deleteGlobalCategory(id));

                // Optimistically update filteredData
                setFilteredData((prev) => prev.filter((item) => item.categoryId !== id));

                // Optional: Show success toast
                MySwal.fire("Deleted!", "Category has been deleted.", "success");
            } catch (error) {
                // Optional: Show error toast
                MySwal.fire("Error!", "Failed to delete category.", "error");
            }
        }
    });
};


    const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }));
    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];
    const sortOptions = [
        { label: "Newest", value: "newest" },
        { label: "Oldest", value: "oldest" },
    ];

    const columns = [
        {
            title: "Category",
            dataIndex: "category",
            sorter: (a: any, b: any) => a.category.length - b.category.length,
        },
        {
            title: "Category Description",
            dataIndex: "categoryDescription",
            sorter: (a: any, b: any) => a.categoryDescription.length - b.categoryDescription.length,
        },
        {
            title: "Parent Category",
            dataIndex: "parentCategory",
            sorter: (a: any, b: any) => a.parentCategory.length - b.parentCategory.length,
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (img: string) => (
                <img
                    src={img}
                    alt="Category"
                    style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
                />
            ),
            sorter: (a: any, b: any) => a.image.localeCompare(b.image),
        },
       {
  title: "Created On",
  dataIndex: "createdon",
  render: (date: string | Date) => {
    if (!date) return "-";
    const d = typeof date === "string" ? new Date(date) : date;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months start from 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`; // DD/MM/YYYY
  },
  sorter: (a: any, b: any) => {
    const da = new Date(a.createdon);
    const db = new Date(b.createdon);
    return da.getTime() - db.getTime();
  },
},

        {
            title: "Subcategory",
            dataIndex: "status",
            render: (text: any) => (
                <span className="badge badge-linesuccess">
                    <Link to="#">{text}</Link>
                </span>
            ),
            sorter: (a: any, b: any) => a.status.length - b.status.length,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_: any, record: any) => (
                <td className="action-table-data">
                    <div className="edit-delete-action">
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-category"
                            onClick={() => {
                                const found = categories.find((c) => c.id === record.categoryId);
                                setSelectedCategoryEdit(found || null);
                            }}
                        >
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={() => showDeleteConfirmation(record.categoryId)}
                            ></i>
                        </Link>
                    </div>
                </td>
            ),
        },
    ];

    const exportData = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description ?? null,
        parentName: cat.parent?.name ?? null,
        createdAt: cat.createdAt ?? new Date().toISOString(),
        updatedAt: cat.updatedAt ?? new Date().toISOString(),
    }));

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Category</h4>
                            <h6>Manage your categories</h6>
                        </div>
                    </div>
                    <ul className="table-top-head">
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                                <Link to="#" onClick={() => exportCategoriesToPDF(exportData)}>
                                    <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                                </Link>
                            </OverlayTrigger>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                                <Link to="#" onClick={() => exportCategoriesToExcel(exportData)}>
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
                                <Link to="#" onClick={() => dispatch(fetchGlobalCategories())}>
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
                            data-bs-target="#add-category"
                        >
                            <PlusCircle className="me-2" />
                            Add New Category
                        </Link>
                    </div>
                </div>

                <div className="card table-list-card">
                    <div className="card-body">
                        <div className="table-top">
                            <div className="search-set">
                                <div className="search-input">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="form-control form-control-sm formsearch"
                                        value={searchText}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    <Link to="#" className="btn btn-searchset">
                                        <i data-feather="search" className="feather-search" />
                                    </Link>
                                </div>
                            </div>
                            <div className="search-path">
                                <button
                                    type="button"
                                    className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
                                    id="filter_search"
                                    onClick={() => setIsFilterVisible((prev) => !prev)}
                                    style={{ border: "none", background: "transparent" }}
                                >
                                    <Filter className="filter-icon" />
                                    <span>
                                        <ImageWithBasePath
                                            src="assets/img/icons/closes.svg"
                                            alt="img"
                                        />
                                    </span>
                                </button>
                            </div>

                            <div className="form-sort">
                                <Sliders className="info-img" />
                                <Select
                                    className="select"
                                    options={sortOptions}
                                    placeholder="Newest"
                                />
                            </div>
                        </div>

                        {isFilterVisible && (
                            <div
                                id="filter_inputs"
                                className={`card ${isFilterVisible ? "show" : ""}`}
                                style={{ display: isFilterVisible ? "block" : "none" }}
                            >
                                <div className="card-body pb-0">
                                    <div className="row">
                                        {/* CATEGORY FILTER */}
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <Zap className="info-img" />

                                                <Select
                                                    options={[
                                                        { label: "All Categories", value: "all" },
                                                        ...categoryOptions,
                                                    ]}
                                                    className="select"
                                                    placeholder="Filter by Category"
                                                    value={
                                                        selectedCategory
                                                            ? [{ label: "All Categories", value: "all" }, ...categoryOptions]
                                                                .find((c) => c.value === selectedCategory)
                                                            : { label: "All Categories", value: "all" }
                                                    }
                                                    onChange={(option: any) => {
                                                        if (option?.value === "all") {
                                                            setSelectedCategory(null); // reset filter
                                                        } else {
                                                            setSelectedCategory(option?.value || null);
                                                        }
                                                    }}
                                                    isSearchable
                                                />
                                            </div>
                                        </div>


                                        {/* DATE FILTER */}
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <i data-feather="calendar" className="info-img" />
                                                <div className="input-groupicon">
                                                    <DatePicker
                                                        value={selectedDate ? dayjs(selectedDate) : null}
                                                        onChange={(d) => setSelectedDate(d?.toDate() ?? null)}
                                                        className="filterdatepicker"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* STATUS FILTER */}
                                        {/* <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <StopCircle className="info-img" />
                                                <Select
                                                    options={statusOptions}
                                                    className="select"
                                                    placeholder="Choose Status"
                                                    value={
                                                        statusOptions.find((s) => s.value === selectedStatus) || null
                                                    }
                                                    onChange={(option: any) =>
                                                        setSelectedStatus(option?.value || null)
                                                    }
                                                />
                                            </div>
                                        </div> */}

                                        {/* SEARCH BUTTON */}
                                        <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                                            <div className="input-blocks">
                                                <button
                                                    className="btn btn-filters ms-auto"
                                                    onClick={handleFilter}
                                                    type="button"
                                                >
                                                    <i data-feather="search" className="feather-search" /> Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}

                        <div className="table-responsive">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Loading categories...</p>
                                </div>
                            ) : (
                                <Table props={{}} columns={columns} dataSource={filteredData} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AddCategoryList />
            <EditCategoryList selectedCategoryEdit={selectedCategoryEdit} />
        </div>
    );
};

export default CategoryList;
