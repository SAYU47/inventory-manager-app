import { useDispatch } from "react-redux";
import {
  updateField,
  setTitleField,
  updateTypeName,
  removeType,
  addField,
} from "../store/typesSlice";
import { MachineType } from "../types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TypeCardProps {
  type: MachineType;
}

export default function TypeCard({ type }: TypeCardProps) {
  const dispatch = useDispatch();

  const handleUpdateTypeName = (name: string) => {
    dispatch(updateTypeName({ id: type.id, name }));
  };

  const handleUpdateField = (field: any, updates: Partial<any>) => {
    dispatch(updateField({
      typeId: type.id,
      field: { ...field, ...updates }
    }));
  };

  const handleAddField = () => {
    dispatch(addField({
      typeId: type.id,
      field: { name: "New field", type: "text" }
    }));
  };

  const handleSetTitleField = (fieldId: string | undefined) => {
    dispatch(setTitleField({ typeId: type.id, fieldId }));
  };

  const handleRemoveType = () => {
    dispatch(removeType(type.id));
  };

  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        {/* Type Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            value={type.name}
            onChange={(event) => handleUpdateTypeName(event.target.value)}
            sx={{ width: 300 }}
          />
          <IconButton 
            onClick={handleRemoveType}
            aria-label={`Delete ${type.name}`}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Fields Section */}
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Fields
        </Typography>

        {type.fields.map((field) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={field.id}
            sx={{ marginTop: 1 }}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Field Name"
                value={field.name}
                onChange={(event) =>
                  handleUpdateField(field, { name: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                label="Field Type"
                value={field.type}
                onChange={(event) =>
                  handleUpdateField(field, { type: event.target.value })
                }
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
              </Select>
            </Grid>
          </Grid>
        ))}

        {/* Actions Section */}
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button
            variant="outlined"
            onClick={handleAddField}
          >
            Add Field
          </Button>
          
          <Select
            value={type.titleFieldId || ""}
            onChange={(event) =>
              handleSetTitleField(event.target.value || undefined)
            }
            displayEmpty
          >
            <MenuItem value="">Select Title Field</MenuItem>
            {type.fields.map((field) => (
              <MenuItem key={field.id} value={field.id}>
                {field.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </CardContent>
    </Card>
  );
}