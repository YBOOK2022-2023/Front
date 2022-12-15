import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ValidationCodeDialog({open,setOpen,sendVerif,code,setCode,resendCode}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,sendVerif:()=>void,code:string,setCode:React.Dispatch<React.SetStateAction<string>>,resendCode:()=>void}) {
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez en saisir le code de validation
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="verifCode"
            label="code de validation"
            type="string"
            fullWidth
            variant="standard"
            onChange={(e)=>{setCode(e.target.value)}}
            value={code}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={resendCode}>Renvoyer Code</Button>
          <Button variant="outlined" onClick={handleClose}>Fermer</Button>
          <Button variant="contained" onClick={sendVerif}>Envoyer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}