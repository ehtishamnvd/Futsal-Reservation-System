import React from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GroupsIcon from '@mui/icons-material/Groups';

function Academydisplaypage ()
{
    return (
        <>
            <img id="academyfrontpagemainpic" src='./images/19.jpg' alt="futsal" /> 
            <div id = "academyfrontpagebox">
            <input type="text" placeholder="Search Academy by Name" id= "academysearch" />
                    <li id="academypageli">
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Kings Football Academy </span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Midfield Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Greenfield Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Strikers Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Vibrant Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Zaraj Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Raad Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Raad Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                    </li>
            </div> 
        </>
    );
}
export default Academydisplaypage;