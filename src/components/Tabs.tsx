import {Box,SvgIconTypeMap,Tab} from "@mui/material";
import{TabContext,TabList,TabPanel} from "@mui/lab";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import {useState} from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";

function Tabs(props: { title1: string, title2: string, title3: string,icon1:any,icon2:any,icon3:any ,content1:any,content2:any,content3:any}){
    const[value,setValue]=useState("1");

    const handleChange=(event:React.SyntheticEvent,newValue:string)=>{
        setValue(newValue);

    }
    const{title1,title2,title3}=props;
    const{icon1,icon2,icon3}=props;
    const{content1,content2,content3}=props;


    return(
        
            <TabContext  value={value}>
                <Box  sx={{borderBottom:1,borderColor:"black"}}>
                    <TabList variant="fullWidth" aria-label="Tabs Ex"
                    onChange={handleChange}>
                        <Tab  label={title1}value="1" icon={icon1}/>
                        <Tab label={title2} value="2" icon={icon2}/>
                        <Tab label={title3} value="3" icon={icon3}/>
                    </TabList>
                </Box>
                <TabPanel value="1">{content1}</TabPanel>
                <TabPanel value="2">{content2}</TabPanel>
                <TabPanel value="3">{content3}</TabPanel> 
            </TabContext>
    
    )
}

export default Tabs;