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

interface CreateGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newGroup: { name: string; description: string }) => void;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    onCreate({ name, description });
    onClose();
    setName("");
    setDescription("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: "12px" } }}
    >
      <DialogTitle>Criar Novo Grupo de Estudo</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Para começar, dê um nome e uma descrição para seu novo grupo.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome do Grupo"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Descrição"
          type="text"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ p: "0 24px 16px" }}>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleCreate} variant="contained" disabled={!name}>
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupDialog;
