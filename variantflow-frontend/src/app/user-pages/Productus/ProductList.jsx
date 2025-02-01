import React, { useEffect, useState } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import ResponseModal from "../../components/modal/ResponseModal";
import "../userpages.css";
import withAuth from "../../components/higher-order/withauth";
import { useTheme } from "../../context/ThemeContext";
import ProductListTable from "../../components/table/ProductListTable";
import productService from "../../../services/productService";
import cogoToast from "cogo-toast";

function ProductList() {
    const [apiResponseModal, setApiResponseModal] = useState({
        show: false,
        msg: "",
    }); // Modal : on API Response

    const [isFetching, setIsFetching] = useState(false);
    const [productData, setPruductData] = useState(null);
    const [showInputs, setShowInput] = useState(true);
    const initialFormValues = {
        name: "",
        description: "",
        price: ""
    };
    const [formValues, setFormValues] = useState(initialFormValues);

    // Function to Handle Form Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await productService.createProduct(formValues);
            if (data.id) {
                cogoToast.success(`Product Added Successfully`);
                fetchProducts()
            }
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    };

    const fetchProducts = async () => {
        try {
            setIsFetching(true);
            const data = await productService.getAllProducts();
            setPruductData(data);
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        } finally {
            setIsFetching(false);
        }
    };

    //Fetch Data
    useEffect(() => {
        fetchProducts();
    }, []);

    const { isDarkTheme } = useTheme();
    return (
        <>
            <div>
                <div className="page-header">
                    <h3 className={`page-title ${isDarkTheme && "dark-page-title"}`}>
                        Products
                    </h3>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className={`card ${isDarkTheme && "dark-theme-card"}`}>
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-between cursor-pointer"
                                    onClick={() => setShowInput(!showInputs)}
                                >
                                    <h4 className={`card-title ${isDarkTheme && "dark-card-title"} mb-1`}> Add Product</h4>
                                    <i className="mdi mdi-arrow-down-drop-circle-outline"></i>
                                </div>
                                {showInputs ? (
                                    <Form className="mt-4" onSubmit={handleSubmit}>
                                        <div className="row scroll">

                                            <div className="col-md-4"><Form.Group>
                                                <Form.Label className={`${isDarkTheme ? "dark-text" : "text-muted"}`}>Product Name</Form.Label>
                                                <Form.Control
                                                    className={`${isDarkTheme && "dark-form-control"}`}
                                                    type="text"
                                                    placeholder="Product Name"
                                                    name="name"
                                                    value={formValues.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                            </div>
                                            <div className="col-md-12">
                                                <Form.Group>
                                                    <Form.Label
                                                        className={`${isDarkTheme ? "dark-text" : "text-muted"
                                                            }`}
                                                    >
                                                        Product Description
                                                    </Form.Label>
                                                    <Form.Control
                                                        className={`${isDarkTheme && "dark-form-control"}`}
                                                        as="textarea"
                                                        rows={4}
                                                        placeholder="Enter Product Description"
                                                        name="description"
                                                        value={formValues.description}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="row scroll">
                                            <div className="col-md-4 pt-1">
                                                <Button
                                                    type="button"
                                                    className="btn btn-md btn-danger mr-3"
                                                    onClick={() => {
                                                        setFormValues(initialFormValues)
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
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className={`card ${isDarkTheme && "dark-theme-card"}`}>
                            <div className="card-body">
                                {isFetching ? (
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{ height: "100%" }}
                                    >
                                        <Spinner
                                            animation="border"
                                            style={{ width: "5rem", height: "5rem" }}
                                        />
                                    </div>
                                ) : (
                                    <ProductListTable productData={productData} fetchProducts={fetchProducts} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {apiResponseModal.show && (
                    <ResponseModal
                        setApiResponseModal={setApiResponseModal}
                        msg={apiResponseModal.msg}
                    />
                )}
            </div>
        </>
    );
}

export default withAuth(ProductList);