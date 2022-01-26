import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import Button from '@material-ui/core/Button';

function Home(){




    return (
        <div className="center">
            <img src="/images/coffee_main.jpg" alt="main_img" width="50%"></img>
            <h1>Coffee Place</h1>
            <div>
                <Link to={"/menu"}>
                    <Button style={{width:"200px",height:"100px",fontWeight:"800",fontSize:"30px"}} variant="contained" color="secondary">시작하기</Button>
                </Link>
            </div>
            <img src="/images/qr1.png" alt="main_img" style={{marginTop:"5vh"}}></img>
        </div>
    );
  
}

export default Home;