import { Machine, MachineType } from "../types";
import { useDispatch } from "react-redux";
import { updateValue, removeItem } from "../store/itemsSlice";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ItemCard({ item, type }: { item: Machine; type: MachineType }) {
  const dispatch = useDispatch();

  const getItemTitle = () => {
    if (type.titleFieldId && item.values[type.titleFieldId]) {
      return item.values[type.titleFieldId];
    }
    return "Untitled";
  };

  const handleValueChange = (fieldId: string, value: string) => {
    dispatch(updateValue({ id: item.id, fieldId, value }));
  };

  const handleCheckboxChange = (fieldId: string, checked: boolean) => {
    handleValueChange(fieldId, checked ? "1" : "");
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item.id));
  };

  const getInputType = (fieldType: string) => {
    switch (fieldType) {
      case "number":
        return "number";
      case "date":
        return "date";
      default:
        return "text";
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            {getItemTitle()}
          </Typography>
          <IconButton 
            onClick={handleRemoveItem}
            aria-label={`Delete ${getItemTitle()}`}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {type.fields.map((field) => (
          <Box key={field.id} sx={{ marginBottom: 2 }}>
            {field.type === "checkbox" ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={!!item.values[field.id]}
                  onChange={(event) =>
                    handleCheckboxChange(field.id, event.target.checked)
                  }
                />
                <Typography variant="body2">{field.name}</Typography>
              </Box>
            ) : (
              <TextField
                fullWidth
                type={getInputType(field.type)}
                label={field.name}
                value={item.values[field.id] || ""}
                onChange={(event) =>
                  handleValueChange(field.id, event.target.value)
                }
                InputLabelProps={
                  field.type === "date" ? { shrink: true } : undefined
                }
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}