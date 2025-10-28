import { Drawer, IconButton, Button, TextField, Divider } from "@mui/material";
import { X, Save } from "lucide-react";
import SchemaSelector from "./SchemaSelector";
import SchemaList from "./SchemaList";
import Loader from "./Loader";

const Sidebar = ({
  isOpen,
  onClose,
  segmentName,
  setSegmentName,
  currentSelection,
  setCurrentSelection,
  selectedSchemas,
  onSchemaChange,
  onRemoveSchema,
  onSave,
  isSaving,
  getAvailableOptions,
  getOptionsForDropdown,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className="sidebar-drawer"
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "500px" },
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)",
        },
      }}
    >
      <div className="sidebar">
        {/* Header */}
        <div className="sidebar__header">
          <IconButton onClick={onClose} className="sidebar__close">
            <X size={24} />
          </IconButton>
          <h2 className="sidebar__title">Saving Segment</h2>
        </div>

        <Divider />

        {/* Body */}
        <div className="sidebar__body">
          {isSaving ? (
            <Loader message="Saving segment..." />
          ) : (
            <>
              {/* Segment Name Input */}
              <div className="sidebar__section">
                <label className="sidebar__label">
                  Enter the Name of the Segment
                </label>
                <TextField
                  fullWidth
                  size="small"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  placeholder="Name of the segment"
                  variant="outlined"
                  className="sidebar__input"
                />
                <p className="sidebar__hint">
                  To save your segment, you need to add the schemas to build the
                  query
                </p>
              </div>

              <div className="sidebar__section">
                {/* <label className="sidebar__label">Add schema to segment</label> */}
                <SchemaSelector
                  currentSelection={currentSelection}
                  setCurrentSelection={setCurrentSelection}
                  availableOptions={getAvailableOptions()}
                />
              </div>

              <div className="sidebar__section">
                <SchemaList
                  selectedSchemas={selectedSchemas}
                  onSchemaChange={onSchemaChange}
                  onRemoveSchema={onRemoveSchema}
                  getOptionsForDropdown={getOptionsForDropdown}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sidebar__footer">
          <Button
            variant="contained"
            startIcon={<Save size={18} />}
            onClick={onSave}
            disabled={isSaving}
            className="sidebar__save-btn"
            fullWidth
          >
            {isSaving ? "Saving..." : "Save the Segment"}
          </Button>

          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSaving}
            className="sidebar__cancel-btn"
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
