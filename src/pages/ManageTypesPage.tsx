import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box } from "@mui/material";
import CreateTypeCard from "../widgets/CreateTypeCard";
import TypeCard from "../widgets/TypeCard";


export default function ManageTypesPage() {
  const types = useSelector((state: RootState) => state.types);
  const [newTypeName, setNewTypeName] = useState("");

  return (
    <Box>
      <CreateTypeCard 
        newTypeName={newTypeName} 
        setNewTypeName={setNewTypeName} 
      />
      
      {types.map((type) => (
        <TypeCard key={type.id} type={type} />
      ))}
    </Box>
  );
}