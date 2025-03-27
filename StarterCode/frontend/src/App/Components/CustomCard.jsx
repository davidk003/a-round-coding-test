import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function CustomCard({ id, name, description, price, imageUrl, onDelete }) {
  const [loading, setLoading] = useState(true);

  //Purely optional since images load fast enough and doesnt fail but keeps showing skeleton component on failure
  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setLoading(false);
      };

      img.onerror = () => {
        setLoading(false);
      };
    } else {
      setLoading(false);
    }
  }, [imageUrl]);

  return (
    <Card
      sx={{
        backgroundColor: "white",
        width: "100%",
        minWidth: 280,
        maxWidth: 300,
        height: "auto",
        "&:hover": {
          backgroundColor: "grey.100",
          cursor: "pointer",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {
          loading ? (
            <Skeleton
              variant="rectangular"
              height={140}
              backgroundcolor="black"
              sx={{ animationDuration: "0.8s" }}
            />
          ) : (
            <CardMedia
          component="img"
          height={140}
          image={imageUrl}
          alt={name || "Product Image"}
          sx={{ objectFit: "cover", zIndex: "modal", position: "relative" }}
        />
          )
        }
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "5px",
          }}
        >
          <DeleteIcon
           onClick={() => onDelete(id)}
            sx={{
                color: "error.light",
              position: "relative",
              "&:hover": {
                color: "error.main",
                cursor: "pointer",
              },
              zIndex: "tooltip",
            }}
          />
        </Box>
      </Box>
      <CardContent sx={{ textAlign: "left", paddingTop: 0 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ paddingTop: 1, fontWeight: "bold" }}
        >
          {name || <Skeleton variant="text" width={100} />}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {price !== undefined ? (
            `$${price}`
          ) : (
            <Skeleton variant="text" width={50} />
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description || <Skeleton variant="text" width={200} />}
        </Typography>
      </CardContent>
    </Card>
  );
}
