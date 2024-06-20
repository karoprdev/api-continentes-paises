// Countries component (Countries.js)

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../Queries";
import { getImages } from "../PixabayApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

function Countries({ searchCountry, onCountryClick }) {
  const {
    loading: loadingCountries,
    error: errorCountries,
    data: dataCountries,
  } = useQuery(GET_COUNTRIES);

  const [imagesCountries, setImagesCountries] = useState({});

  useEffect(() => {
    if (dataCountries) {
      dataCountries.countries.forEach(async (country) => {
        const images = await getImages(country.name, "photo");

        setImagesCountries((prev) => ({
          ...prev,
          [country.code]: images[0],
        }));
      });
    }
  }, [dataCountries]);

  if (loadingCountries) return <p>Cargando...</p>;
  if (errorCountries) return <p>Error: {errorCountries.message}</p>;

  const filteredCountries = dataCountries.countries.filter(country =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {filteredCountries.map((country) => (
          <Grid
            item
            key={country.code}
            xs={12}
            sm={6}
            md={4}
            sx={{
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Card
              sx={{ borderRadius: 4, boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.5)', maxHeight: 400 }}
              onClick={() => onCountryClick(country)} // Call handler on card click
            >
              <CardActionArea>
                {imagesCountries[country.code] && (
                  <CardMedia
                    component="img"
                    image={imagesCountries[country.code].webformatURL}
                    alt={country.name}
                    sx={{ maxHeight: 200 }}
                  />
                )}
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    padding: 0.5,
                    backgroundColor: "#62afe2"
                  }}
                >
                  {imagesCountries[country.code] && (
                    <CardMedia
                      component="img"
                      image={imagesCountries[country.code].webformatURL}
                      alt={country.name}
                      sx={{ width: 80, marginX: 2, marginY: 1, maxHeight: 50 }}
                    />
                  )}
                  <Typography
                    gutterBottom
                    variant="p"
                    component="div"
                    sx={{ textAlign: "left", marginX: 0 }}
                  >
                    <p className="text-xl font-bold  m-0">
                      {country.name}
                    </p>
                    <p className="text-current"> {country.continent.name}</p>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Countries;
