import React, { useState,useEffect } from "react"
import './Menu.css';
import Container from "./Menu-Components/Container";
import Basictable from "./Menu-Components/table"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function Menu(){
    const [Carts, setCarts] = useState([]);
    function addCarts(a){
      setCarts( arr => [...arr, a])
    }
    const [User, setUser] = useState({age:"young",sex:"woman"});
    
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
    var contents=[
      {id:1,name:"아메리카노",price:1500,num:1},
      {id:2,name:"카페라떼",price:2500,num:1},
      {id:3,name:"디카페인 아메리카노",price:2000,num:1},
      {id:4,name:"카라멜마끼아또",price:3300,num:1}, 
      {id:5,name:"카푸치노",price:3800,num:1},
      {id:6,name:"에스프레소",price:1000,num:1},
      {id:7,name:"아이슈페너",price:4500,num:1},
      {id:8,name:"카페모카",price:4000,num:1},
      {id:9,name:"디카페인 콜드 브루",price:3500,num:1},
      {id:10,name:"수박주스",price:3000,num:1},
      {id:11,name:"딸기주스",price:2800,num:1},
      {id:12,name:"녹차라떼",price:2100,num:1},
      {id:13,name:"키위 주스",price:3100,num:1},
      {id:14,name:"망고 플랫치노",price:2200,num:1},
      {id:15,name:"아이스 초콜릿",price:2100,num:1},
      {id:16,name:"민트 초콜릿",price:3800,num:1},
      {id:17,name:"홍시 주스",price:2700,num:1},
      {id:18,name:"흑당 라떼",price:2100,num:1},
      {id:19,name:"프로틴 밀크",price:3100,num:1},
      {id:20,name:"초코 쿠키 쉐이크",price:2700,num:1},
      {id:21,name:"청포도 에이드",price:4600,num:1},
      {id:22,name:"레몬 에이드",price:5900,num:1},
      {id:23,name:"자몽 에이드",price:3900,num:1},
      {id:24,name:"요구르트 플랫치노",price:4900,num:1},
      {id:25,name:"레몬차",price:3900,num:1},
      {id:26,name:"로즈 자스민 티",price:3900,num:1},
      {id:27,name:"생강차",price:3900,num:1},
      {id:28,name:"쌍화차",price:3900,num:1},
      {id:29,name:"어린 잎 녹차",price:4000,num:1},
      {id:30,name:"얼그레이 홍차",price:4500,num:1},
      {id:31,name:"유자차",price:4500,num:1},
      {id:32,name:"자몽차",price:4300,num:1},
      {id:33,name:"페퍼민트티",price:3500,num:1},
      {id:34,name:"버블 크림 밀크티",price:5000,num:1},
      {id:35,name:"베이글",price:3000,num:1},
      {id:36,name:"불고기 샐러드",price:3500,num:1},
      {id:37,name:"아이스크림 와플",price:4000,num:1},
      {id:38,name:"에그베이컨 샌드위치",price:3200,num:1},
      {id:39,name:"초코 마카롱",price:2500,num:1},
      {id:40,name:"쿠키 앤 크림 마카롱",price:3900,num:1},
      {id:41,name:"초콜릿 브라우니",price:3900,num:1},
      {id:42,name:"크루아상",price:3900,num:1},
      {id:43,name:"티라미수",price:3900,num:1},
      {id:44,name:"팥핑수",price:3900,num:1},
      {id:45,name:"햄치즈 샌드위치",price:3900,num:1},
      {id:46,name:"허니브레드",price:3900,num:1},
    ];
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
        if(_Carts[a].id === parseInt(i)){
          _Carts[a].num = _Carts[a].num + 1;
          break;
        }
      };
      if(a===_Carts.length){//for문이끝까지갔다는소리제
        addCarts(contents[i-1]);
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
        if(_Carts[a].id === parseInt(i)){
          _Carts[a].num = _Carts[a].num - 1;
          if(_Carts[a].num===0){
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

        <section>
          <div style={tempStyle} id="coffee" >

            <Container start="1" end="10" age={User.age} data={contents} onAddCarts={function(i){
              Addupdate(i);/*alert(Carts[0].name);*/
              }}></Container>
          </div>  
          <div style={tempStyle1} id="drinks">
            <Container start="10" end="25" data={contents} age={User.age} onAddCarts={function(i){Addupdate(i)}}></Container>
            
          </div>
          <div style={tempStyle2} id="tea">
            <Container start="25" end="35" data={contents} age={User.age} onAddCarts={function(i){Addupdate(i)}}></Container>
            
          </div>
          <div style={tempStyle3} id="dessert">
            <Container start="35" end="46" data={contents} age={User.age} onAddCarts={function(i){Addupdate(i)}}></Container>
          </div>
          {User.age==="old"&&(window.innerWidth>768)&&click?
              <div style={{position:"fixed",top:"15%",left:"2%"}}>
                <img src="/images/arrow.png" alt="main_img" style={{position:"relative",width:"10vw",height:"80vh",zIndex:"999",opacity:"0.93"}}></img>
                <p style={{fontSize:"30px",position:"absolute",top:"50%",transform:"translate(0%,-60%)",left:"0%",zIndex:"999",writingMode:"vertical-rl",color:"white"}}>②위아래로 스크롤하면 메뉴가 보입니다.</p></div>              
            :null}
        </section>
        
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