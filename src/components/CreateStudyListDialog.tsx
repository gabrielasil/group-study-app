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

interface CreateStudyListDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateStudyListDialog: React.FC<CreateStudyListDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim());
      onClose();
      setName("");
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
      <DialogTitle>Criar Nova Lista de Estudo</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Dê um nome para a sua nova lista de estudos.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome da Lista"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCreate()}
        />
      </DialogContent>
      <DialogActions sx={{ p: "0 24px 16px" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          disabled={!name.trim()}
        >
          Criar Lista
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStudyListDialog;
