import { Alert, Snackbar } from "@mui/material";

const Toast = ({ open, message, severity, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          fontWeight: 600,
          borderRadius: "12px",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
