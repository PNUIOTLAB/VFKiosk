import React, { useState } from "react"
import './Menu.css';
import Container from "./Menu-Components/Container";
import Basictable from "./Menu-Components/table"
import Button from '@material-ui/core/Button';


function Menu(){
    const [Carts, setCarts] = useState([]);
    function addCarts(a){
      setCarts( arr => [...arr, a])
    }
    const [User, setUser] = useState({age:"old",sex:"woman"});
    
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
      {id:29,name:"어린 잎 녹차",price:3900,num:1},
      {id:30,name:"얼그레이 홍차",price:3900,num:1},
      {id:31,name:"유자차",price:3900,num:1},
      {id:32,name:"자몽차",price:3900,num:1},
      {id:33,name:"페퍼민트티",price:3900,num:1},
      {id:34,name:"버블 크림 밀크티",price:3900,num:1},
      {id:35,name:"베이글",price:3900,num:1},
      {id:36,name:"불고기 셀러드",price:3900,num:1},
      {id:37,name:"아이스크림 와플",price:3900,num:1},
      {id:38,name:"에그베이컨 샌드위치",price:3900,num:1},
      {id:39,name:"초코 마카롱",price:3900,num:1},
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
        return {fontSize:"50px"}
      };
    };

    function update(i){
      var _Carts = Array.from(Carts)
      var a;
      for(a = 0; a<_Carts.length; a++){
        if(_Carts[a].id === parseInt(i)){
          _Carts[a].num = _Carts[a].num + 1;
          break;
        }
      };
      if(a===_Carts.length){
        addCarts(contents[i-1]);
        
      }else{
        setCarts(_Carts);
      };
    };
    
    return (  
      <div className="Menu">
        
        <section>
          <div style={tempStyle} id="coffee">
            {/*<button onClick={(e)=>{addCarts(k, e)}}> Do Something!</button>
            <button onClick={(e)=>{addCarts(2, e)}}>Do Something!</button>
    */}     
            <Container start="1" end="10" age={User.age} data={contents} onAddCarts={function(i){
              /*addCarts(contents[i-1]);
              let result = Carts.some(x => {return x.id === parseInt(i)});
              alert(result);*/
              /*var _Carts = Array.from(Carts)
              var a;
              for(a = 0; a<_Carts.length; a++){
                if(Carts[a].id === parseInt(i)){
                  _Carts[a].num = _Carts[a].num + 1;
                  alert(i);
                  break;
                }
              };
              if(a===_Carts.length){
                addCarts(contents[i-1]);
                
              }else{
                setCarts(_Carts);
              };
              */
              update(i);/*alert(Carts[0].name);*/
              }}></Container>
          </div>  
          <div style={tempStyle1} id="drinks">
            <Container start="10" end="25" data={contents} age={User.age} onAddCarts={function(i){update(i)}}></Container>
          </div>
          <div style={tempStyle2} id="tea">
            <Container start="25" end="35" data={contents} age={User.age} onAddCarts={function(i){update(i)}}></Container>
          </div>
          <div style={tempStyle3} id="dessert">
            <Container start="35" end="46" data={contents} age={User.age} onAddCarts={function(i){update(i)}}></Container>
          </div>
        </section>
        
        <nav>
          <a href="#coffee"><div className="Nav-1" style={navStyle(User.age)} >커피</div></a>
          <a href="#drinks"><div className="Nav-2" style={navStyle(User.age)}>음 료</div></a>
          <a href="#tea"><div className="Nav-3"  style={navStyle(User.age)} >차</div></a>
          <a href="#dessert"><div className="Nav-4" style={navStyle(User.age)}>다과</div></a>
        

        </nav>

        <div className="basket">    
          <div><Basictable carts={Carts} age={User.age}></Basictable></div>
        </div>
      </div>
    );
}

export default Menu;