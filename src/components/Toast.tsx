import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";


export default function AlertToast({openToast,setOpenToast,errormsg}:{openToast:boolean,setOpenToast:React.Dispatch<React.SetStateAction<boolean>>,errormsg:string}){

    const handleCloseToast = () => {
        setOpenToast(false);
      };

return(
    <div>
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'left' }}  open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
           
            <Alert onClose={handleCloseToast}   sx={{ width: '100%' }} >
                {errormsg}
            </Alert>
        </Snackbar>
            
        </div>
)

}