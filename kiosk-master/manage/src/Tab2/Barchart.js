// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
import React from 'react';


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveBar = ({ data /* see data tab */ }) => (
  <ResponsiveBar
      aline="center"
      data={data}
      keys={[ `${Object.keys(data[0])[1]}`]}
      indexBy={`${Object.keys(data[0])[0]}`}
      margin={{ top: 30, right: 50, bottom: 50, left: 70 }}
      padding={0.35}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      valueFormat={{ format: '', enabled: false }}
      colors={{ scheme: 'nivo' }}
      colorBy='indexValue'
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: '요일',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '가격',
          legendPosition: 'middle',
          legendOffset: -60
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.5 ] ] }}
      
  />
)

function Barchart(props) {
  let moment = require('moment');
  console.log("Barchar row Data", props.data);
  var Data=props.data;
  // var kk = JSON.parse(JSON.stringify(Data));
  // kk.map(e => {
  //   e.Time = (new Date(e.Time).getDay());
  //   e.Order_Num =e.Order_Num*2;
  //   return e;
  // });
  // console.log("k",kk);//이유를 알아냄 얕은복사가되서 state를변경시키는게 되었기때문; 
  //안되는이유 몰루 //실험해본결과 값을대입하면다같아짐 이건 나중에확인해볼 필요가있움 ;
  var i =0;
  var sun=0,mon=0,tue=0,wed=0,thu=0,fri=0,sat=0;  
  while (i<Data.length){
    switch(moment(Data[i].Time).isoWeekday()){
      case 1://일
        sun= sun + Data[i].Cost;
        break;
      case 2://월
        mon= mon + Data[i].Cost;
        break;
      case 3://화
        tue= tue + Data[i].Cost;
        break;
      case 4://수
        wed= wed + Data[i].Cost;
        break;
      case 5://목
        thu= thu + Data[i].Cost;
        break;
      case 6://금
        fri= fri + Data[i].Cost;
        break;
      case 7://토
        sat= sat + Data[i].Cost;
        break;
    } 
    i++;
  }
  
  var char1 =[
    {
      "day": "sun",
      "price":sun
    },
    {
      "day": "mon",
      "price":mon
    },
    {
      "day": "tue",
      "price":tue
    },
    {
      "day": "wed",
      "price": wed
    },
    {
      "day": "thu",
      "price":thu
    },
    {
      "day": "fri",
      "price":fri
    },
    {
      "day": "sat",
      "price": sat
    }];
  console.log("char1",char1);

  


  return (
      <div style={{ height: 300, width: 420 }}>
        <MyResponsiveBar data={char1} />
      </div>
    );
}

export default Barchart;