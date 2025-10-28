import React from "react";
import { X, Plus, Save } from "lucide-react";

const SCHEMA_OPTIONS = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const Modal = ({
  isOpen,
  segmentName,
  setSegmentName,
  currentSelection,
  setCurrentSelection,
  selectedSchemas,
  onAddSchema,
  onSchemaChange,
  onRemoveSchema,
  onSave,
  onClose,
  isSaving,
  getAvailableOptions,
  getOptionsForDropdown,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal__header">
          <h2 className="modal__title">Saving Segment</h2>
          <button
            onClick={onClose}
            className="modal__close"
            aria-label="Close modal"
          >
            <X className="icon" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal__body">
          {/* Segment Name Input */}
          <div className="form-group">
            <label htmlFor="segmentName" className="form-group__label">
              Enter the Name of the Segment
            </label>
            <input
              id="segmentName"
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Name of the segment"
              className="form-group__input"
            />
            <p className="form-group__hint">
              To save your segment, you need to add the schemas to build the
              query
            </p>
          </div>

          {/* Add Schema Dropdown */}
          <div className="form-group">
            <label htmlFor="schemaSelect" className="form-group__label">
              Add schema to segment
            </label>
            <div className="schema-selector">
              <select
                id="schemaSelect"
                value={currentSelection}
                onChange={(e) => setCurrentSelection(e.target.value)}
                className="schema-selector__select"
              >
                <option value="">Add schema to segment</option>
                {getAvailableOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add New Schema Link */}
          <button
            onClick={onAddSchema}
            disabled={!currentSelection}
            className="add-schema-link"
          >
            <Plus className="icon" />
            Add new schema
          </button>

          {/* Blue Box - Selected Schemas */}
          {selectedSchemas.length > 0 && (
            <div className="schema-box">
              <div className="schema-box__header">
                <span className="schema-box__badge">
                  {selectedSchemas.length}
                </span>
                <span className="schema-box__title">schemas selected</span>
              </div>
              <div className="schema-box__list">
                {selectedSchemas.map((schema, index) => (
                  <div key={index} className="schema-item">
                    <select
                      value={schema.value}
                      onChange={(e) => onSchemaChange(index, e.target.value)}
                      className="schema-item__select"
                    >
                      {getOptionsForDropdown(index).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => onRemoveSchema(index)}
                      className="schema-item__remove"
                      aria-label="Remove schema"
                    >
                      <X className="icon" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal__footer">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="btn btn--primary"
          >
            <Save className="icon" />
            {isSaving ? "Saving..." : "Save the Segment"}
          </button>
          <button onClick={onClose} className="btn btn--secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
