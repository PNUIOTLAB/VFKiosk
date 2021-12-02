// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
import moment, { months } from 'moment';
import React,{useEffect,useState} from 'react';
import axios from 'axios';


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
          legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.5 ] ] }}
      
  />
)


// function MyResponsiveBar ( props /* see data tab */ ){
//     <ResponsiveBar
//         aline="center"
//         data = {props.data}
//         keys={`${Object.keys(data[0])[0]}`}
//         indexBy={`${Object.keys(data[0])[1]}`}//{`${Object.keys(data[0])[0]}`}
//         margin={{ top: 30, right: 50, bottom: 50, left: 70 }}
//         padding={0.35}
//         valueScale={{ type: 'linear' }}
//         indexScale={{ type: 'band', round: true }}
//         valueFormat={{ format: '', enabled: false }}
//         colors={{ scheme: 'nivo' }}
//         colorBy='indexValue'
//         borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             tickSize: 3,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: '요일',
//             legendPosition: 'middle',
//             legendOffset: 32
//         }}
//         axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: '가격',
//             legendPosition: 'middle',
//             legendOffset: -40
//         }}
//         labelSkipWidth={12}
//         labelSkipHeight={12}
//         labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.5 ] ] }}
        
//     />};

// function dayData(d){
//   var i = 0 ;
//   let list=[];
//   let day;
//   let sun=0,mon=0,tue=0,wed=0,thu=0,fri=0,sat=0;
//   console.log("gg"+d)
//   while (i < d.length){
//     day= moment(d[i].Time).format('E')
//     switch(day){
//       case 0:
//         sun=sun+d[i].Cost; break;
//       case 1:
//         mon=mon+d[i].Cost; break;
//       case 2:
//         tue=tue+d[i].Cost; break;
//       case 3:
//         wed=wed+d[i].Cost; break;
//       case 4:
//         thu=thu+d[i].Cost; break;
//       case 5:
//         fri=fri+d[i].Cost; break;
//       case 6:
//         sat=sat+d[i].Cost; break;
//     }
//     i=i+1;
//   }
//   let tmp=[sun,mon,tue,wed,thu,fri,sat];
//   var z = 0 ;
//   var obj = {};
//   while (z<tmp.length){
//     switch(z){
//       case 0:
//         obj["day"]="sun"; break;
//       case 1:
//         obj["day"]="mon"; break;
//       case 2:
//         obj["day"]="tue"; break;
//       case 3:
//         obj["day"]="wed"; break;
//       case 4:
//         obj["day"]="thu"; break;
//       case 5:
//         obj["day"]="fri"; break;
//       case 6:
//         obj["day"]="sat"; break;
//     }
//     obj["price"]=tmp[z];
//     list.push(obj)
//     z=z+1;
//   }
//   console.log("리스트:"+ list);
//   return list;
// };

function Barchart(props) {
  // const [pureData, setpureData] = useState([]);

  // useEffect(async() => {
  //   try{
  //       const res = await axios.get('http://localhost:7000/api/all');
  //       setpureData(res.data);
  //       console.log(pureData);
  //       // console.log("정보  "+pureData[7].Time+","+ typeof(pureData[7].Time));
  //       // console.log("요일:"+ moment(pureData[7].Time).format('GG'))
        
  //       console.log(pureData.length);
  //   } catch(e) {
  //       console.error(e.message)
  //   }
  // },[])

  //console.log(props.data[0].Age);
  return (
      <div style={{ height: 300, width: 400 }}>
        <MyResponsiveBar data={props.data} />
        {/* {pureData?<MyResponsiveBar data={pureData} />:<p>로딩중중</p>} */}
      </div>
    );
}

export default Barchart;