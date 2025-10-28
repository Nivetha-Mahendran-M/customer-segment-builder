import React from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const SchemaSelector = ({
  currentSelection,
  setCurrentSelection,
  availableOptions,
}) => {
  return (
    <div className="schema-selector">
      <FormControl fullWidth size="small">
        <InputLabel id="schema-select-label">Add schema to segment</InputLabel>
        <Select
          labelId="schema-select-label"
          id="schema-select"
          value={currentSelection}
          label="Add schema to segment"
          onChange={(e) => setCurrentSelection(e.target.value)}
          className="schema-selector__select"
        >
          <MenuItem value="">
            <em>Select schema</em>
          </MenuItem>
          {availableOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <span className={`schema-dot schema-dot--${option.type}`}></span>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SchemaSelector;
