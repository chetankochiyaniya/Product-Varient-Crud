import React, { useEffect, useState } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import ResponseModal from "../../components/modal/ResponseModal";
import "../userpages.css";
import withAuth from "../../components/higher-order/withauth";
import { useTheme } from "../../context/ThemeContext";
import VariantProductTable from "../../components/table/VariantProductTable";
import cogoToast from "cogo-toast";
import VariantService from "../../../services/variantService";
import Select from "react-select";
import {
    customStylesForSelect,
    hoverEffectOnSelect,
} from "../../user-pages/ui-helper";
import { mergeStyles } from "react-select/dist/react-select.cjs.prod";
import { useParams } from "react-router-dom";
import ProductService from "../../../services/productService";

function VariantProduct() {
    const [apiResponseModal, setApiResponseModal] = useState({
        show: false,
        msg: "",
    }); // Modal : on API Response

    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(null);
    const [showInputs, setShowInput] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([{ value: "", label: "" }]);
    const [optionData, setOptionData] = useState(null);
    const { id } = useParams()
    const [price, setPrice] = useState(null)
    const [productData, setProductData] = useState(null)

    const handleSelectOption = (item, index) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = item;
        setSelectedOptions(newSelectedOptions);
    };

    const handleAddMore = () => {
        setSelectedOptions([...selectedOptions, { value: "", label: "" }]);
    };

    function transformData(data) {
        console.log("call", data)
        return data.map(item => ({
            value: item.id,
            label: `${item.value} - ${item.category_name}`
        }));
    }

    const fetchOptionData = async () => {
        try {
            setIsFetching(true);
            const data = await VariantService.getAllOptions();
            const optionData = transformData(data)
            setSelectedOptions([optionData[0]])
            setOptionData(optionData);
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        } finally {
            setIsFetching(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setIsFetching(true);
            const data = await ProductService.getByProductId(id);
            setProductData(data);
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const variantOptionIds = selectedOptions.map(option => option.value);
            let CustomData = { productId: id, variantOptionId: variantOptionIds, price: price };
            const data = await VariantService.createProductVariant(CustomData);
            if (data.id) {
                cogoToast.success(`Product Variant Added Successfully`, data);
                fetchData();
            }
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" });
        }
    };

    const fetchData = async () => {
        try {
            setIsFetching(true);
            const data = await VariantService.getAllProductVariant({ productId: id });
            setData(data);
        } catch (error) {
            setApiResponseModal({ show: true, msg: error.message || "Failed to fetch products" })
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchOptionData();
        fetchProducts();
    }, [showInputs]);

    const { isDarkTheme } = useTheme();
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className={`card ${isDarkTheme && "dark-theme-card"}`}>
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-between cursor-pointer"
                                // onClick={() => setShowInput(!showInputs)}
                                >
                                    <h4 className={`card-title ${isDarkTheme && "dark-card-title"} mb-1`}>{productData?.name} Variant</h4>
                                    {/* <i className="mdi mdi-arrow-down-drop-circle-outline"></i> */}
                                </div>
                                {showInputs ? (
                                    <><Form className="mt-4" onSubmit={handleSubmit}>
                                        <div className="row scroll">
                                            <div className="col-md-4"><Form.Group>
                                                <Form.Control
                                                    className={`${isDarkTheme && "dark-form-control"}`}
                                                    type="text"
                                                    placeholder="Product Variant Price"
                                                    name="price"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            </div>
                                            {selectedOptions.map((option, index) => (
                                                <div className="col-md-4" key={index}>
                                                    <Form.Group>
                                                        <Select
                                                            classNamePrefix="react-select"
                                                            className={isDarkTheme ? "dark-select" : ""}
                                                            value={option}
                                                            onChange={(item) => handleSelectOption(item, index)}
                                                            options={optionData}
                                                            isSearchable={true}
                                                            placeholder="Select Option"
                                                            styles={mergeStyles(hoverEffectOnSelect, customStylesForSelect)}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </div>
                                            ))}
                                            <div className="col-md-4 pt-1 mb-3 mb-md-0">
                                                <Button type="button" className="btn btn-md btn-info mr-3" onClick={handleAddMore}>
                                                    Add More
                                                </Button>
                                                <Button
                                                    type="button"
                                                    className="btn btn-md btn-danger mr-3"
                                                    onClick={() => {
                                                        setPrice("")
                                                        setSelectedOptions([{ value: "", label: "" }]);
                                                    }}
                                                >
                                                    Clear
                                                </Button>

                                                <Button type="submit" className="btn btn-md">
                                                    Create
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
                                            <VariantProductTable data={data} fetchData={fetchData} />
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

export default withAuth(VariantProduct);