import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:6004/api/products').then(response => response.json()).then(data => setProducts(data))
    }, [])

    return (
        <>
            <ProductList products={products} />
        </>
    )
}