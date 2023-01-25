import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage() {
    //const { basket, setBasket, removeItem } = useStoreContext();
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    if (!basket) return <Typography variant="h3">Your Basket is empty</Typography>

    return (
        <>
            <BasketTable items={basket.items} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}