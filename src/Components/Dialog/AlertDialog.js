import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const AlertDialog = ({
  open,
  title,
  content,
  action,
  actionLabel,
  onClose,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={action} color="primary" autoFocus>
            {actionLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
