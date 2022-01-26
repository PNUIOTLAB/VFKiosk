import React, { useState,useEffect } from "react"
import './Menu.css';
import Container from "./Menu-Components/Container";
import Basictable from "./Menu-Components/table"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

function Menu(){
    const [Carts, setCarts] = useState([]);
    function addCarts(a){
      setCarts( arr => [...arr, a])
    }
    const [User, setUser] = useState({age:"young",sex:"woman"});
    const [Menu, setMenu] = useState(null);
    const [click,nextclick]=useState(true)
    const [clickMenu,setclickMenu]=useState(0)
    var hideBar =()=>{nextclick(false)}
    useEffect(() => {
      window.addEventListener("click", hideBar);
      window.addEventListener('scroll', hideBar);
      console.log(window.innerWidth)//768px
      return () => {
        window.removeEventListener("click", hideBar);
        window.removeEventListener('scroll', hideBar);
      };
    }, []);
    useEffect(async() => {
      try{
          const res = await axios.get('http://localhost:7000/api/menu');
          var Data=res.data;
          Data.map(e=>e.Num=1);
          console.log("메뉴",Data);
          setMenu(Data);
      } catch(e) {
          console.error(e.message)
      }
    },[])

    const tempStyle={
      background:"#A66658",
    };
    const tempStyle1={
      background:"#F2CA50",
    };
    const tempStyle2={
      background:"#e9ecb8",
    };
    const tempStyle3={
      background:"#ff8060",
    };
    
    const navStyle=(x)=>{
      if(x==="old"){
        return {fontSize:"6vmin"}
      }
    };

    function Addupdate(i){
      var _Carts = Array.from(Carts)
      var a;
      for(a = 0; a<_Carts.length; a++){
        if(_Carts[a].Id === parseInt(i)){
          _Carts[a].Num = _Carts[a].Num + 1;
          break;
        }
      };
      if(a===_Carts.length){//for문이끝까지갔다는소리제
        addCarts(Menu[i-1]);
        setclickMenu(clickMenu+1);
      }else{
        setCarts(_Carts);
        setclickMenu(clickMenu+1);
      };
    };
    function Deleteupdate(i){
      var _Carts = Array.from(Carts)
      var a;
      for(a = 0; a<_Carts.length; a++){
        if(_Carts[a].Id === parseInt(i)){
          _Carts[a].Num = _Carts[a].Num - 1;
          if(_Carts[a].Num===0){
            _Carts.splice(a,1);
          }
          break;
        }
      };
      setCarts(_Carts);
      setclickMenu(clickMenu+1);
    };
    return (  
      <div className="Menu">
        {Menu?<section>
          <div style={tempStyle} id="coffee" >
            <Container start="1" end="10" age={User.age} data={Menu} onAddCarts={function(i){
              Addupdate(i);/*alert(Carts[0].name);*/
              }}></Container>
          </div>  
          <div style={tempStyle1} id="drinks">
            <Container start="10" end="25" data={Menu} age={User.age} onAddCarts={function(i){Addupdate(i)}}></Container>
            
          </div>
          <div style={tempStyle2} id="tea">
            <Container start="25" end="35" data={Menu} age={User.age} onAddCarts={function(i){Addupdate(i)}}></Container>
            
          </div>
          <div style={tempStyle3} id="dessert">
            <Container start="35" end="46" data={Menu} age={User.age} onAddCarts={function(i){Addupdate(i)}}></Container>
          </div>
          {User.age==="old"&&(window.innerWidth>768)&&click?
              <div style={{position:"fixed",top:"15%",left:"2%"}}>
                <img src="/images/arrow.png" alt="main_img" style={{position:"relative",width:"10vw",height:"80vh",zIndex:"999",opacity:"0.93"}}></img>
                <p style={{fontSize:"30px",position:"absolute",top:"50%",transform:"translate(0%,-60%)",left:"0%",zIndex:"999",writingMode:"vertical-rl",color:"white"}}>②위아래로 스크롤하면 메뉴가 보입니다.</p></div>              
            :null}
        </section>
        :<p>로딩중.......</p>}

        <nav>
         {/* <SnackbarContent message={'▲▲  ① 상단 메뉴설정하시오'} style ={{position:"fixed",top:"15%",left:"50%",transform:"translate(-50%,-50%)",opacity:"0.93",marginLeft:"auto",justifyContent: "center" }} /> */}

          {User.age==="old"&&(window.innerWidth>768)&&click?
            <div>
                <Grid>
                  <Paper  style ={{width:"40vw",height:"7.5vh",textAlign: 'center',fontSize:"4vmin",paddingTop:"11px",color:"white",position:"fixed",zIndex:"999",top:"10%",left:"50%",transform:"translate(-50%,-50%)",opacity:"0.93",marginLeft:"auto",backgroundColor:"#313131"}}>
                    <div>⬆⬆</div>
                    <div>① 상단 메뉴설정하시오</div>
                  </Paper>
                </Grid>
              </div>          
            :null}
            
          <a href="#coffee"><div className="Nav-1" style={navStyle(User.age)} >커피</div></a>
          <a href="#drinks"><div className="Nav-2" style={navStyle(User.age)}>음료</div></a>
          <a href="#tea"><div className="Nav-3"  style={navStyle(User.age)} >차</div></a>
          <a href="#dessert"><div className="Nav-4" style={navStyle(User.age)}>다과</div></a>
        </nav>

        <div className="basket">    
          <div><Basictable carts={Carts} Userdata={User} setUserdata={setUser} onAddCarts={function(i){Addupdate(i)}} onDeleteCarts={function(i){Deleteupdate(i)}}></Basictable></div>
          {User.age==="old"&&(window.innerWidth>768)&&(clickMenu==1)?
              <div>
                <Grid>
                  <Paper  style ={{width:"40vw",height:"7.5vh",textAlign: 'center',fontSize:"4vmin",paddingTop:"11px",color:"white",position:"fixed",zIndex:"999",bottom:"7%",right:"6%",opacity:"0.93",marginLeft:"auto",backgroundColor:"#313131"}}>
                    <div>③결제버튼을   누르시오</div>
                    <div>      ⬇⬇</div>
                  </Paper>
                </Grid>
                {/* <SnackbarContent message={'③ 결제버튼을 누르시오>>'} style ={{position:"fixed",zIndex:"999",bottom:"3%",right:"15%",opacity:"0.93",marginLeft:"auto",justifyContent: "center" }} /> */}
              </div>              
            :null}
        </div>
      </div>
    );
}

export default Menu;