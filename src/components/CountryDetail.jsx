import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../Queries";
import { getImages } from "../PixabayApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

function CountryDetail({ country, onClose }) {
  const {
    loading: loadingCountries,
    error: errorCountries,
    data: dataCountries,
  } = useQuery(GET_COUNTRIES);

  const [imagesCountries, setImagesCountries] = useState({});

  useEffect(() => {
    if (dataCountries) {
      dataCountries.countries.forEach(async (c) => {
        const images = await getImages(c.name, "photo");

        setImagesCountries((prev) => ({
          ...prev,
          [c.code]: images[0],
        }));
      });
    }
  }, [dataCountries]);

  if (loadingCountries) return <p>Cargando...</p>;
  if (errorCountries) return <p>Error: {errorCountries.message}</p>;

  return (
    <>
      <div className="max-w-md mx-auto bg-white inline-block">
        <Card
          sx={{
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
            position: "absolute",
            right: 1,
            top: 100,
            width: {
              xs: 384,
              md: 416,
            },
            padding: 1,
            zIndex: 1000,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon
              color="action"
              onClick={onClose}
            />
          </Box>
          <CardActionArea>
            {imagesCountries[country.code] && (
              <CardMedia
                component="img"
                height="140"
                image={imagesCountries[country.code].webformatURL}
                alt={country.name}
                sx={{ borderRadius: 4, marginX: 2, marginY: 2, width: 350 }}
              />
            )}
            <CardContent
              sx={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                padding: 0.5,
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
                <div>
                  <p className="text-xl font-bold text-blue-500 m-0">
                    {country.name}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {" "}
                    {country.continent.name}
                  </p>
                </div>
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                gutterBottom
                variant="p"
                component="div"
                sx={{ textAlign: "left", marginX: 0 }}
              >
                <div>
                  <p className="text-slate-500 text-base">
                    <span className="text-blue-500 font-semibold">
                      Capital:{" "}
                    </span>{" "}
                    {country.capital}
                  </p>
                  <p className="text-slate-500 text-base">
                    <span className="text-blue-500 font-semibold">
                      Idioma(s):
                    </span>
                    <ul className="pl-8">
                      {country.languages.map((language) => (
                        <li key={language.code}>{language.name}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="text-slate-500 text-base">
                    <span className="text-blue-500 font-semibold">Moneda:</span>{" "}
                    {country.currency}
                  </p>
                  <p className="text-slate-500 text-base">
                    <span className="text-blue-500 font-semibold">
                      Ciudades:
                    </span>
                    {country.states != "" ? (
                      <ul className="pl-8 py-2 shadow-lg border border-inherit max-w-52 ml-7">
                        {country.states?.slice(0, 3).map((state, index) => (
                          <li key={index}>{state.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}

export default CountryDetail;
