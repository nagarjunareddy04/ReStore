import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
    { value: "name", label: "Alphabetical" },
    { value: "priceDesc", label: "Price - High to Low" },
    { value: "price", label: "Price - Low to High" }
];

export default function Catalog() {
    ////const [products, setProducts] = useState<Product[]>([]);
    const products = useAppSelector(productSelectors.selectAll);
    const { productLoaded, status, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    //const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('http://localhost:6004/api/products').then(response => response.json()).then(data => setProducts(data))
    // }, [])

    // useEffect(() => {
    //     agent.Catalog.list().then(products => setProducts(products)).catch(error => console.log(error)).finally(()=> setLoading(false))
    // }, [])

    useEffect(() => {
        if (!productLoaded) {
            dispatch(fetchProductsAsync());
        }
    }, [productLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) {
            dispatch(fetchFilters());
        }
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) return <LoadingComponent message="Loading Products..." />

    return (
        <>
            <Grid container columnSpacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))} />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons items={brands} checked={productParams.brands}
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))} />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons items={types} checked={productParams.types}
                            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))} />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={9} sx={{ mb: 2 }} >
                    {metaData &&
                        <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />}
                </Grid>
            </Grid>
        </>
    )
}