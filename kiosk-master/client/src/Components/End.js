import React from 'react';
import { Link } from "react-router-dom";
import "./End.css";
import Button from '@material-ui/core/Button';




function End(){

    return (
        <div className="center">
            
            <h1>결제가 완료되었습니다.</h1>
            <span>
                <Link to={"/"}>
                    <Button style={{width:"200px",height:"80px",fontWeight:"800",fontSize:"30px"}} variant="contained" color="secondary">돌아가기</Button>
                </Link>
            </span>
        </div>
    );
  
}

export default End;