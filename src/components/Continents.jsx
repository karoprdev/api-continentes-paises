import { GET_CONTINENTS } from "../Queries";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getImages } from "../PixabayApi";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";

function Continents() {
  const {
    loading: loadingContinents,
    error: errorContinents,
    data: dataContinents,
  } = useQuery(GET_CONTINENTS);

  const [imagesContinents, setImagesContinents] = useState({});

  useEffect(() => {
    if (dataContinents) {
      dataContinents.continents.forEach(async (continent) => {
        const images = await getImages(continent.name, "maps");

        setImagesContinents((prev) => ({
          ...prev,
          [continent.code]: images[0],
        }));
      });
    }
  }, [dataContinents]);

  if (loadingContinents) return <p>Cargando...</p>;
  if (errorContinents) return <p>Error: {errorContinents.message}</p>;

  return (
    <>
      <div className=" max-w-sm shadow-sm bg-white p-2">
        <div className="flex justify-between">
          <p className="text-gray-500">Filtrar por continente</p>
          <button className="text-sky-blue font-bold text-blue-600">Limpiar</button>
        </div>
        <Grid container spacing={1} sx={{ marginTop: 1, maxWidth: 360 }}>
          {dataContinents.continents.map((continent) => (
            <Grid
              item
              key={continent.code}
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
                sx={{
                  borderRadius: 2,
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.5)",
                  maxHeight: 120,
                  maxWidth: 90,
                  "&:hover": {
                    border: 2.5,
                    borderColor: "#3274f0",
                  },
                }}
              >
                {imagesContinents[continent.code] && (
                  <CardMedia
                    component="img"
                    image={imagesContinents[continent.code].webformatURL}
                    alt={continent.name}
                    sx={{ maxHeight: 50 }}
                  />
                )}
              </Card>
              <p className="text-sm text-current"> {continent.name}</p>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Continents;
