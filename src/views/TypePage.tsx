import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addItem } from "../store/itemsSlice";
import { Box, Typography, Button, Grid } from "@mui/material";
import ItemCard from "../widgets/ItemCard";

export default function TypePage() {
  const { id } = useParams();
  const types = useSelector((state: RootState) => state.types);
  const items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();

  const currentType = types.find((type) => type.id === id);
  const typeItems = items.filter((item) => item.typeId === id);

  const handleAddItem = () => {
    if (currentType) {
      dispatch(addItem({ typeId: currentType.id }));
    }
  };

  if (!currentType) {
    return <Typography>Type not found</Typography>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
          padding: 2
        }}
      >
        <Typography variant="h5">{currentType.name}</Typography>
        <Button variant="contained" onClick={handleAddItem}>
          Add {currentType.name}
        </Button>
      </Box>

      <Grid container spacing={2} sx={{padding: 2}}>
        {typeItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ItemCard item={item} type={currentType} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}