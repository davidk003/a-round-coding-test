import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { CustomCard } from "../Components/CustomCard.jsx";
import { Skeleton, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch products when the component mounts
    fetchProducts();
  }, []);

  //implement the get products function
  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(true);
      });
  };

  //implement the delete function
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProductList(productList.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <h1>Product List</h1>
      </Box>
      {loading ? (
        <Skeleton
          variant="rounded"
          maxwidth={345}
          height={140}
          sx={{ marginBottom: 2 }}
        />
      ) : (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{
              justifyContent: { xs: "center", sm: "flex-start" }, // Center cards
            }}
          >
            {productList.map((product, index) => (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                md
                key={index}
              >
                <CustomCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
