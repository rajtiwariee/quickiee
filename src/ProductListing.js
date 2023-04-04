import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import apple from "./assets/images/apple.jpg";
import banana from "./assets/images/banana.jpg";
import orange from "./assets/images/orange.jpg";
import broccoli from "./assets/images/broccoli.jpg";
import carrot from "./assets/images/carrot.jpg";
import tomato from "./assets/images/tomato.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
}));

const products = [
  { category: "Fruits", name: "Apple", image: apple, quantityLeft: 10 },
  { category: "Fruits", name: "Banana", image: banana, quantityLeft: 5 },
  { category: "Fruits", name: "Orange", image: orange, quantityLeft: 7 },
  {
    category: "Vegetables",
    name: "Broccoli",
    image: broccoli,
    quantityLeft: 3,
  },
  { category: "Vegetables", name: "Carrot", image: carrot, quantityLeft: 8 },
  { category: "Vegetables", name: "Tomato", image: tomato, quantityLeft: 6 },
];

export default function ProductListing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <React.Fragment key={product.name}>
            {product.category === "Fruits" && (
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={classes.paper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%" }}
                  />
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">
                    Quantity Left: {product.quantityLeft}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Add to cart
                  </Button>
                </Paper>
              </Grid>
            )}
            {product.category === "Vegetables" && (
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={classes.paper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={classes.image}
                  />
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">
                    Quantity Left: {product.quantityLeft}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Add to cart
                  </Button>
                </Paper>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
}
