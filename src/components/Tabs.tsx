import {Box,Tab} from "@mui/material";
import{TabContext,TabList,TabPanel} from "@mui/lab";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import {useState} from "react";

function Tabs(){
    const[value,setValue]=useState("1");
    const handleChange=(event:React.SyntheticEvent,newValue:string)=>{
        setValue(newValue);

    }
    return(
        <Box>
            <TabContext value={value}>
                <Box sx={{borderBottom:1,borderColor:"black"}}>
                    <TabList aria-label="Tabs Ex"
                    onChange={handleChange}>
                        <Tab label="Posts" value="1" icon={<LocalPostOfficeIcon/>}/>
                        <Tab label="Likes" value="2" icon={<FavoriteBorderIcon/>}/>
                        <Tab label="Comments" value="3" icon={<CommentIcon/>}/>
                    </TabList>
                </Box>
                <TabPanel value="1">Post</TabPanel>
                <TabPanel value="2">Likes</TabPanel>
                <TabPanel value="3">Comments</TabPanel> 
            </TabContext>
        </Box>
    )
}

export default Tabs;