import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import { API_URL } from "../../utils/constant";

export default function Products() {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
        color: "#000",
        padding: "20px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Products
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/user-new")}
        >
          Add user
        </Button>
      </Stack>

      <ProductsTable rows={products} fetchProducts={fetchProducts} />
    </Box>
  );
}
