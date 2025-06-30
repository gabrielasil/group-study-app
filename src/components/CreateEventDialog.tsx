import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

interface CreateEventDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (eventData: {
    name: string;
    location: string;
    dateTime: Date;
  }) => void;
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs());

  const handleCreate = () => {
    if (name.trim() && location.trim() && dateTime) {
      onCreate({
        name: name.trim(),
        location: location.trim(),
        dateTime: dateTime.toDate(),
      });
      onClose();
      // Reset state
      setName("");
      setLocation("");
      setDateTime(dayjs());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Criar Novo Evento de Estudo</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nome do Evento"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Localização"
              type="text"
              fullWidth
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
            <DateTimePicker
              label="Data e Hora"
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
              minDate={dayjs()}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: "100%" }} />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 16px" }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            disabled={!name.trim() || !location.trim() || !dateTime}
          >
            Criar Evento
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CreateEventDialog;
