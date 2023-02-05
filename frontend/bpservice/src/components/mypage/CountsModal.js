import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CountsDataTable from "./CountsDataTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CountsModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem disablePadding onClick={handleClickOpen}>
        <ListItemButton>
          <ListItemText primary="보증금" />
        </ListItemButton>

        <ListItemIcon sx={{ m: -3 }}>
          <KeyboardArrowRightIcon />
        </ListItemIcon>
      </ListItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <CountsDataTable />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CountsModal;
