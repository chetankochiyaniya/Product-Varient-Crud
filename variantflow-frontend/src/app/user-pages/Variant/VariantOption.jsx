import React, { useEffect, useState } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import ResponseModal from "../../components/modal/ResponseModal";
import "../userpages.css";
import withAuth from "../../components/higher-order/withauth";
import { useTheme } from "../../context/ThemeContext";
import VariantOptionTable from "../../components/table/VariantOptionTable";
import cogoToast from "cogo-toast";
import VariantService from "../../../services/variantService";
import Select from "react-select";
import {
    customStylesForSelect,
    hoverEffectOnSelect,
} from "../../user-pages/ui-helper";
import { mergeStyles } from "react-select/dist/react-select.cjs.prod";

function VariantOption() {
    const [apiResponseModal, setApiResponseModal] = useState({
        show: false,
        msg: "",
    }); // Modal : on API Response

    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [showInputs, setShowInput] = useState(true);
    const initialFormValues = {
        name: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [selectedCategory, setSelectedCategory] = useState({ value: "", label: "" });
    function transToOption(data) {
        return data.map(({ id, name }) => ({ value: id, label: name }));
    }

    const handleSelectCategory = (item) => {
        setSelectedCategory(item);
    };

    // Function to Handle Form Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let CustomData = { variantCategoryId: selectedCategory.value, value: formValues.name }
            const data = await VariantService.createVariantOption(CustomData);
            if (data.id) {
                cogoToast.success(`Option Added Successfully`, data);
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
            const data = await VariantService.getAllOptions();
            setData(data);
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        } finally {
            setIsFetching(false);
        }
    };

    const fetchCategoryData = async () => {
        try {
            setIsFetching(true);
            const data = await VariantService.getAllCategories();
            const categoryData = transToOption(data)
            setCategoryData(categoryData);
            setSelectedCategory(categoryData[0])
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        } finally {
            setIsFetching(false);
        }
    };

    //Fetch Data
    useEffect(() => {
        fetchData();
        fetchCategoryData();
    }, [showInputs]);
    console.log("selectedCategory", selectedCategory)
    const { isDarkTheme } = useTheme();
    return (
        <>
            <div>
                {/* <div className="page-header">
                    <h3 className={`page-title ${isDarkTheme && "dark-page-title"}`}>
                        Variant
                    </h3>
                </div> */}
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className={`card ${isDarkTheme && "dark-theme-card"}`}>
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-between cursor-pointer"
                                // onClick={() => setShowInput(!showInputs)}
                                >
                                    <h4 className={`card-title ${isDarkTheme && "dark-card-title"} mb-1`}> Variant  Option</h4>
                                    {/* <i className="mdi mdi-arrow-down-drop-circle-outline"></i> */}
                                </div>
                                {showInputs ? (
                                    <><Form className="mt-4" onSubmit={handleSubmit}>
                                        <div className="row scroll">

                                            <div className="col-md-4"><Form.Group>
                                                <Select
                                                    classNamePrefix="react-select"
                                                    className={isDarkTheme ? "dark-select" : ""}
                                                    value={selectedCategory}
                                                    onChange={handleSelectCategory}
                                                    options={categoryData}
                                                    isSearchable={true}
                                                    placeholder="Select Category"
                                                    styles={mergeStyles(
                                                        hoverEffectOnSelect,
                                                        customStylesForSelect
                                                    )}
                                                    required
                                                />
                                            </Form.Group>
                                            </div>
                                            <div className="col-md-4"><Form.Group>
                                                <Form.Control
                                                    className={`${isDarkTheme && "dark-form-control"}`}
                                                    type="text"
                                                    placeholder="Variant Option Name"
                                                    name="name"
                                                    value={formValues.name}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                            </div>
                                            <div className="col-md-4 pt-1 mb-3 mb-md-0">
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
                                            <VariantOptionTable data={data} fetchData={fetchData} />
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
            </div>
        </>
    );
}

export default withAuth(VariantOption);