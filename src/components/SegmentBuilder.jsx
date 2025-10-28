import React, { useState, useCallback } from "react";
import { Button, Container, Box, Typography } from "@mui/material";
import { Save, Database } from "lucide-react";
import Sidebar from "./Sidebar";
import SegmentsTable from "./SegmentsTable";
import Toast from "./Toast";
import { SCHEMA_OPTIONS } from "../constants/schemaOptions";
import { sendSegmentToWebhook } from "../utils/api";

const SegmentBuilder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [currentSelection, setCurrentSelection] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [savedSegments, setSavedSegments] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = useCallback((message, severity = "success") => {
    setToast({ open: true, message, severity });
  }, []);

  const getAvailableOptions = useCallback(() => {
    const selectedValues = selectedSchemas.map((s) => s.value);
    return SCHEMA_OPTIONS.filter((opt) => !selectedValues.includes(opt.value));
  }, [selectedSchemas]);

  // Auto-add schema when dropdown selection changes
  const handleSelectionChange = useCallback((newValue) => {
    setCurrentSelection(newValue);

    if (newValue) {
      const selectedOption = SCHEMA_OPTIONS.find(
        (opt) => opt.value === newValue
      );
      setSelectedSchemas((prev) => [...prev, selectedOption]);
      // Reset dropdown after adding
      setTimeout(() => setCurrentSelection(""), 100);
    }
  }, []);

  const handleSchemaChange = useCallback((index, newValue) => {
    const selectedOption = SCHEMA_OPTIONS.find((opt) => opt.value === newValue);
    setSelectedSchemas((prev) => {
      const updated = [...prev];
      updated[index] = selectedOption;
      return updated;
    });
  }, []);

  const handleRemoveSchema = useCallback((index) => {
    setSelectedSchemas((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const getOptionsForDropdown = useCallback(
    (currentIndex) => {
      const otherSelectedValues = selectedSchemas
        .filter((_, i) => i !== currentIndex)
        .map((s) => s.value);
      return SCHEMA_OPTIONS.filter(
        (opt) => !otherSelectedValues.includes(opt.value)
      );
    },
    [selectedSchemas]
  );

  const handleSaveSegment = useCallback(async () => {
    if (!segmentName.trim()) {
      showToast("Please enter a segment name", "error");
      return;
    }

    if (selectedSchemas.length === 0) {
      showToast("Please add at least one schema", "error");
      return;
    }

    setIsSaving(true);

    const segmentData = {
      segment_name: segmentName.trim(),
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    try {
      await sendSegmentToWebhook(segmentData);

      const newSegment = {
        id: Date.now(),
        name: segmentName.trim(),
        schemas: [...selectedSchemas],
        createdAt: new Date().toLocaleString(),
      };

      setSavedSegments((prev) => [newSegment, ...prev]);
      setSegmentName("");
      setSelectedSchemas([]);
      setIsSidebarOpen(false);
      showToast("Segment saved successfully!", "success");

      console.log("Segment saved:", segmentData);
    } catch (error) {
      console.error("Error saving segment:", error);
      showToast("Failed to save segment", "error");
    } finally {
      setIsSaving(false);
    }
  }, [segmentName, selectedSchemas, showToast]);

  const handleDeleteSegment = useCallback(
    (id) => {
      setSavedSegments((prev) => prev.filter((seg) => seg.id !== id));
      showToast("Segment deleted successfully", "success");
    },
    [showToast]
  );

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    setSegmentName("");
    setSelectedSchemas([]);
    setCurrentSelection("");
  }, []);

  return (
    <div className="app-container">
      <Container maxWidth="xl" className="main-container">
        {/* Header */}
        <Box className="header">
          <Box className="header__left">
            <Database className="header__icon" size={32} />
            <Box>
              <Typography variant="h4" className="header__title">
                View Audience
              </Typography>
              <Typography variant="body2" className="header__subtitle">
                Create and manage customer segments
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Save size={20} />}
            onClick={() => setIsSidebarOpen(true)}
            className="save-segment-btn"
          >
            Save segment
          </Button>
        </Box>

        {/* Segments Table */}
        {savedSegments.length > 0 ? (
          <Box className="table-container">
            <Typography variant="h6" className="table-title">
              Saved Segments ({savedSegments.length})
            </Typography>
            <SegmentsTable
              segments={savedSegments}
              onDelete={handleDeleteSegment}
            />
          </Box>
        ) : (
          <Box className="empty-state">
            <Database size={64} className="empty-state__icon" />
            <Typography variant="h6" className="empty-state__title">
              No segments yet
            </Typography>
            <Typography variant="body2" className="empty-state__subtitle">
              Click "Save segment" to create your first audience segment
            </Typography>
          </Box>
        )}
      </Container>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        segmentName={segmentName}
        setSegmentName={setSegmentName}
        currentSelection={currentSelection}
        setCurrentSelection={handleSelectionChange}
        selectedSchemas={selectedSchemas}
        onSchemaChange={handleSchemaChange}
        onRemoveSchema={handleRemoveSchema}
        onSave={handleSaveSegment}
        isSaving={isSaving}
        getAvailableOptions={getAvailableOptions}
        getOptionsForDropdown={getOptionsForDropdown}
      />

      {/* Toast */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default SegmentBuilder;
