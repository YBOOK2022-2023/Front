import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
export default function ValidationCodeDialog({open,setOpen,sendVerif,code,setCode,resendCode,resendCodeText}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,sendVerif:()=>void,code:string,setCode:React.Dispatch<React.SetStateAction<string>>,resendCode:()=>void,resendCodeText:string}) {
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><MarkEmailReadIcon></MarkEmailReadIcon>  &emsp;Vérification</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Veuillez  saisir le code de validation <br /><small><i>*Le code de vérification est valable 24h </i></small>
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
          <Button variant="contained" onClick={resendCode}>{resendCodeText}</Button>
          
          <Button variant="contained" onClick={sendVerif}>Envoyer</Button>
          <Button variant="outlined" onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}