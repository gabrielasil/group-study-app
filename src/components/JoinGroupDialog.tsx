import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface JoinGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

const JoinGroupDialog: React.FC<JoinGroupDialogProps> = ({
  open,
  onClose,
  onJoin,
}) => {
  const [code, setCode] = useState("");

  const handleJoin = () => {
    if (code.trim()) {
      onJoin(code.trim().toUpperCase());
      onClose();
      setCode("");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: "12px" } }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Juntar-se a um Grupo</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Insira o código do grupo para participar.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Código do Grupo"
          type="text"
          fullWidth
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleJoin()}
        />
      </DialogContent>
      <DialogActions sx={{ p: "0 24px 16px" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleJoin}
          variant="contained"
          disabled={!code.trim()}
        >
          Juntar-se
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinGroupDialog;
