import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { User, Topic } from "../types";

interface CreateTopicDialogProps {
  open: boolean;
  users: User[];
  onClose: () => void;
  onCreate: (topicData: {
    title: string;
    priority: Topic["priority"];
    responsibleId?: string;
  }) => void;
}

const CreateTopicDialog: React.FC<CreateTopicDialogProps> = ({
  open,
  users,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Topic["priority"]>("Média");
  const [responsibleId, setResponsibleId] = useState<string | undefined>(
    undefined
  );

  const handleCreate = () => {
    if (title.trim()) {
      onCreate({ title: title.trim(), priority, responsibleId });
      onClose();
      // Reset form
      setTitle("");
      setPriority("Média");
      setResponsibleId(undefined);
    }
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as Topic["priority"]);
  };

  const handleResponsibleChange = (event: SelectChangeEvent) => {
    setResponsibleId(event.target.value as string);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: "12px" } }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Adicionar Novo Tópico</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Título do Tópico"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="priority-label">Prioridade</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            label="Prioridade"
            onChange={handlePriorityChange}
          >
            <MenuItem value="Alta">Alta</MenuItem>
            <MenuItem value="Média">Média</MenuItem>
            <MenuItem value="Baixa">Baixa</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="responsible-label">Responsável (Opcional)</InputLabel>
          <Select
            labelId="responsible-label"
            value={responsibleId || ""}
            label="Responsável (Opcional)"
            onChange={handleResponsibleChange}
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={user.avatar}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography>{user.name}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: "0 24px 16px" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          disabled={!title.trim()}
        >
          Adicionar Tópico
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTopicDialog;
