import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface LeaveGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  groupName: string;
}

const LeaveGroupDialog: React.FC<LeaveGroupDialogProps> = ({
  open,
  onClose,
  onConfirm,
  groupName,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Sair do grupo "${groupName}"?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Você tem certeza que deseja sair deste grupo? Esta ação não pode ser
          desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Sair do Grupo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveGroupDialog;
