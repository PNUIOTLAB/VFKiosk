import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import "./style.css"



function Container(props){

    function getID(e){
        props.onAddCarts(e.currentTarget.id)
    }
    const youngStyle={
        width: '12vw',
        minWidth:'130px',
        maxWidth:'180px',
        minHeight:"230px",
        height:"auto",
        
    };
    const oldStyle={
        width: '230px',
        height:"370px",
    };
    //props.age
    const oldfontStyle={
        fontWeight:'800',fontSize:"30px",paddingBottom:"15px"
    };
    const youngfontStyle={
        fontWeight:'700',fontSize:"20px",paddingBottom:"10px"
    };
    var lists=[];
    var i=parseInt(props.start);
    while(i<props.end){
        var contents=props.data[i-1];
        if(props.age ==="old"){
            lists.push(
                <Button key={i} variant="light" id={i} onClick={getID}> 
                    <Card style={oldStyle}>
                        <Card.Img variant="top" src={"/images/"+i+".png"}></Card.Img>
                        <Card.Body>
                            <Card.Title style={oldfontStyle}>{contents.Name}</Card.Title>
                            <Card.Title style={oldfontStyle}>{contents.Price}</Card.Title>
                        </Card.Body>
                    </Card>
                </Button>
            );
            i++;
        }else {
            lists.push(
                <Button key={i} variant="light" id={i} onClick={getID}> 
                    <Card style={youngStyle}>
                        <Card.Img variant="top" src={"/images/"+i+".png"}></Card.Img>
                        <Card.Body>
                            <Card.Title style={youngfontStyle}>{contents.Name}</Card.Title>
                            <Card.Title style={youngfontStyle}>{contents.Price}</Card.Title>
                        </Card.Body>
                    </Card>
                </Button>
            );
            i++;
        }
        
    }

    return( 
        <div>
            {lists}
        </div>

    )
}

export default Container;
