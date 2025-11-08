import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addItem } from "../store/itemsSlice";
import ItemCard from "../widgets/ItemCard";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function Home() {
  const types = useSelector((state: RootState) => state.types);
  const items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();

  const handleAddItem = (typeId: string) => {
    dispatch(addItem({ typeId }));
  };

  return (
    <Box>
      {types.map((type) => {
        const typeItems = items.filter((item) => item.typeId === type.id);

        return (
          <Box key={type.id} sx={{ marginTop: 2, padding: 1 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {type.name}
            </Typography>
            
            <Box sx={{ marginBottom: 2 }}>
              <Button
                variant="outlined"
                onClick={() => handleAddItem(type.id)}
              >
                Add {type.name}
              </Button>
            </Box>

            <Grid container spacing={2}>
              {typeItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <ItemCard item={item} type={type} />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}