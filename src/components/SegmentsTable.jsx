import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Chip, Box } from "@mui/material";
import { Trash2 } from "lucide-react";

const SegmentsTable = ({ segments, onDelete }) => {
  const columns = [
    {
      field: "name",
      headerName: "Segment Name",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 600, color: "#1a202c" }}>{params.value}</Box>
      ),
    },
    {
      field: "schemas",
      headerName: "Schemas",
      flex: 2,
      minWidth: 300,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", py: 1 }}>
          {params.value.map((schema, idx) => (
            <Chip
              key={idx}
              label={schema.label}
              size="small"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
            />
          ))}
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ fontSize: "0.875rem", color: "#718096" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => onDelete(params.row.id)}
          sx={{
            color: "#e53e3e",
            "&:hover": {
              background: "#fee",
            },
          }}
        >
          <Trash2 size={18} />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="segments-table">
      <DataGrid
        rows={segments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8, page: 0 },
          },
        }}
        pageSizeOptions={[8, 10, 25]}
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        disableColumnSelector
        getRowHeight={() => "auto"}
        sx={{
          height: 600,
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f7fafc",
            borderBottom: "2px solid #000",
            minHeight: "56px !important",
            maxHeight: "56px !important",
            lineHeight: "56px !important",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f7fafc",
            "&:focus": {
              outline: "none",
            },
            "&:focus-within": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#2d3748",
            fontWeight: 700,
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid #000",
            "&:hover": {
              backgroundColor: "#f7fafc",
            },
            "&:last-child": {
              borderBottom: "1px solid #000",
            },
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            padding: "12px 16px",
            "&:focus": {
              outline: "none",
            },
            "&:focus-within": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "2px solid #e2e8f0",
            backgroundColor: "#f7fafc",
          },
          "& .MuiTablePagination-root": {
            color: "#4a5568",
          },
        }}
      />
    </div>
  );
};

export default SegmentsTable;
