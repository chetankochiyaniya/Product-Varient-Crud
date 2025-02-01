import React, { useEffect, useState } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import ResponseModal from "../../components/modal/ResponseModal";
import "../userpages.css";
import withAuth from "../../components/higher-order/withauth";
import { useTheme } from "../../context/ThemeContext";
import VariantCategoryTable from "../../components/table/VariantCategoryTable";
import cogoToast from "cogo-toast";
import VariantService from "../../../services/variantService";

function VariantCategoryList() {
    const [apiResponseModal, setApiResponseModal] = useState({
        show: false,
        msg: "",
    }); // Modal : on API Response

    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(null);
    const [showInputs, setShowInput] = useState(true);
    const initialFormValues = {
        name: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);

    // Function to Handle Form Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await VariantService.createVariantCategory(formValues);
            if (data.id) {
                cogoToast.success(`Category Added Successfully`, data);
                fetchData()
            }
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    };

    const fetchData = async () => {
        try {
            setIsFetching(true);
            const data = await VariantService.getAllCategories();
            setData(data);
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        } finally {
            setIsFetching(false);
        }
    };

    //Fetch Data
    useEffect(() => {
        fetchData();
    }, []);

    const { isDarkTheme } = useTheme();
    return (
        <>

            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className={`card ${isDarkTheme && "dark-theme-card"}`}>
                        <div className="card-body">
                            <div
                                className="d-flex align-items-center justify-content-between cursor-pointer"
                            // onClick={() => setShowInput(!showInputs)}
                            >
                                <h4 className={`card-title ${isDarkTheme && "dark-card-title"} mb-1`}> Variant  Category</h4>
                                {/* <i className="mdi mdi-arrow-down-drop-circle-outline"></i> */}
                            </div>
                            {showInputs ? (
                                <><Form className="mt-4" onSubmit={handleSubmit}>
                                    <div className="row scroll">
                                        <div className="col-md-4"><Form.Group>
                                            <Form.Control
                                                className={`${isDarkTheme && "dark-form-control"}`}
                                                type="text"
                                                placeholder="Variant Category Name"
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleChange}
                                                required />
                                        </Form.Group>
                                        </div>
                                        <div className="col-md-4 pt-1">
                                            <Button
                                                type="button"
                                                className="btn btn-md btn-danger mr-3"
                                                onClick={() => {
                                                    setFormValues(initialFormValues);
                                                }}
                                            >
                                                Clear
                                            </Button>
                                            <Button type="submit" className="btn btn-md">
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                                    {isFetching ? (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ height: "100%" }}
                                        >
                                            <Spinner
                                                animation="border"
                                                style={{ width: "5rem", height: "5rem" }} />
                                        </div>
                                    ) : (
                                        <VariantCategoryTable data={data} fetchData={fetchData} />
                                    )}
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            {
                apiResponseModal.show && (
                    <ResponseModal
                        setApiResponseModal={setApiResponseModal}
                        msg={apiResponseModal.msg}
                    />
                )
            }
        </>
    );
}

export default withAuth(VariantCategoryList);