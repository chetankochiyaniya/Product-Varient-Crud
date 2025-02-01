import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";
const VariantOption = lazy(() => import("./user-pages/Variant/VariantOption"));
const VariantCategoryList = lazy(() => import("./user-pages/Variant/VariantCategoryList"));
const VariantProduct = lazy(() => import("./user-pages/Variant/VariantProduct"));
const ProductList = lazy(() => import("./user-pages/Productus/ProductList"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/variant/:id" component={VariantProduct} />
          <Route exact path="/category" component={VariantCategoryList} />
          <Route exact path="/options" component={VariantOption} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
