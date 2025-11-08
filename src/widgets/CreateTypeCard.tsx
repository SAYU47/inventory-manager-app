import React from "react";
import { useDispatch } from "react-redux";
import { addType } from "../store/typesSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

interface CreateTypeCardProps {
  newTypeName: string;
  setNewTypeName: (name: string) => void;
}

export default function CreateTypeCard({ 
  newTypeName, 
  setNewTypeName 
}: CreateTypeCardProps) {
  const dispatch = useDispatch();

  const handleAddType = () => {
    if (newTypeName.trim()) {
      dispatch(addType({ name: newTypeName.trim() }));
      setNewTypeName("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleAddType();
  };

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">Create Type</Typography>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <TextField
            label="Type name"
            value={newTypeName}
            onChange={(event) => setNewTypeName(event.target.value)}
            onKeyDown ={handleKeyPress}
          />
          <Button
            variant="contained"
            onClick={handleAddType}
            disabled={!newTypeName.trim()}
          >
            Add Type
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}