import React from "react";
import { FormControl, Select, MenuItem, IconButton } from "@mui/material";
import { X } from "lucide-react";

const SchemaList = ({
  selectedSchemas,
  onSchemaChange,
  onRemoveSchema,
  getOptionsForDropdown,
}) => {
  if (selectedSchemas.length === 0) return null;

  return (
    <div className="schema-list">
      <div className="schema-list__header">
        <div className="schema-list__badge">{selectedSchemas.length}</div>
        <span className="schema-list__title">Schemas Selected</span>
      </div>

      <div className="schema-list__items">
        {selectedSchemas.map((schema, index) => (
          <div key={index} className="schema-item">
            <div className="schema-item__content">
              <span className={`schema-dot schema-dot--${schema.type}`}></span>
              <FormControl fullWidth size="small">
                <Select
                  value={schema.value}
                  onChange={(e) => onSchemaChange(index, e.target.value)}
                  className="schema-item__select"
                >
                  {getOptionsForDropdown(index).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <IconButton
              onClick={() => onRemoveSchema(index)}
              className="schema-item__remove"
              size="small"
            >
              <X size={18} />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemaList;
