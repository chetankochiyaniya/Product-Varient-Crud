import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Form, Modal, Button } from "react-bootstrap";
import { getTheme } from "../../user-pages/ui-helper";
import ResponseModal from "../modal/ResponseModal";
import { useTheme } from "../../context/ThemeContext";
import "../../../app/user-pages/userpages.css";
import ProductService from "../../../services/productService";
import cogoToast from "cogo-toast";

export default function VariantOptionTable(props) {
    const [apiResponseModal, setApiResponseModal] = useState({
        show: false,
        res: {},
    }); // Modal : on API Response
    const [rawData, setRawData] = useState([]);
    const [tableDataFormatted, setTableDataFormatted] = useState([]);
    // Modal : on Delete API
    const [showDeletePopup, setShowDeletePopup] = useState({
        status: false,
        obj: null,
    });

    useEffect(() => {
        const jsonArr = props.data;//Make Variable
        if (jsonArr) {
            setRawData(jsonArr);
            setTableData(jsonArr); // function call (to set data into table)
        }
    }, [props.data]);


    function setTableData(tableData) {
        var rowTableData = [];
        tableData.map((obj, index) => {
            rowTableData.push(getRowForVariantOptionTable(index, obj));
        });
        setTableDataFormatted(rowTableData);
    }

    function getRowForVariantOptionTable(ind, obj) {
        return {
            index: ind + 1,
            value: obj.value,
            category_name: obj.category_name,
            delete: (<Button
                variant="danger"
                className="py-1 px-1"
                onClick={() =>
                    setShowDeletePopup({ status: true, obj: obj })
                }
            >
                <i className="mdi mdi-delete-forever m-0"></i>
            </Button>),
            obj: obj,
        };
    }


    const columns = [
        {
            name: "Id",
            selector: (row) => row.index,
            sortable: true,
            maxWidth: "65px",
            minWidth: "65px",
        },
        {
            name: "Option",
            selector: (row) => row.value,
            sortable: true,
        },
        {
            name: "Category Name",
            selector: (row) => row.category_name,
            sortable: true,
        },
        // FUTURE FOR DELET API
        // {
        //     name: "delete",
        //     selector: (row) => row.delete,
        //     sortable: false,
        //     maxWidth: "90px",
        //     minWidth: "90px",
        // },
        { name: "obj", selector: (row) => row.obj, omit: true },
    ];
    const handleSearch = (e) => {
        var search_val = e.target.value;
        const filteredData = rawData.filter((value) => {
            return (
                value.value?.toLowerCase().includes(search_val) ||
                value.category_name?.toLowerCase().includes(search_val)
            );
        });
        setTableDataFormatted(filteredData.map((obj, index) => getRowForVariantOptionTable(index, obj)));
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const data = await ProductService.del(showDeletePopup.obj.id);
            if (data) {
                cogoToast.success(`Category deleted Successfully`);
                setShowDeletePopup({ status: false, obj: null })
                props.fetchData()
            }
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed, Try After Sometime" })
        }
    };

    const { isDarkTheme } = useTheme()
    return (
        <>
            <div className="table-responsive ">
                <div className="d-flex justify-content-end p-0">
                    <div className=" col-lg-3 p-0 mb-2">
                        <Form.Group style={{ width: "100%" }}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className={`${isDarkTheme && "dark-form-control"
                                    } mb-2 searchbox-style`}
                                style={{ width: "100%" }}
                                onChange={handleSearch}
                                required
                            />
                        </Form.Group>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={tableDataFormatted}
                    pagination={true}
                    paginationPerPage={10}
                    highlightOnHover
                    noHeader
                    theme={getTheme()}
                    selectableRowsHighlight
                    selectableRowSelected={(row) => row.selected}
                />
                {apiResponseModal.show && (
                    <ResponseModal
                        res={apiResponseModal.res}
                        setApiResponseModal={setApiResponseModal}
                        msg={apiResponseModal.res.msg}
                    />
                )}
            </div>
            {showDeletePopup.status && (
                <Modal show={true} animation={true} size="md" className={` ${isDarkTheme && "dark-modal"} mt-5`}>
                    <Modal.Header className="text-center py-3">
                        <Modal.Title className="text-center">
                            <h5 className="mb-0">Delete</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-10">
                        Do you want to delete this ?
                    </Modal.Body>
                    <Modal.Footer className="py-1 d-flex justify-content-center">
                        <div>
                            <Button
                                variant="outline-danger"
                                onClick={() => setShowDeletePopup({ status: false, obj: null })}
                            >
                                No
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="outline-primary"
                                className="mx-2 px-3"
                                onClick={handleDelete}
                            >
                                Yes
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
