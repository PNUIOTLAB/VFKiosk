// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
import { months } from 'moment';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

function Linechart(props) {
    console.log("Linechar row Data", props.data);
    var Data=props.data;
    var Menu=props.menu;
    var i =0;
    //
    // console.log("오더리스트확인",JSON.parse(Data[0].Order_List));
    // var Data1 = Data.map(e => { 
    //     e.Order_List = JSON.stringify(e.Order_List); 
    //     e.Order_List = JSON.parse(e.Order_List);
    //     return e;})
    // console.log("데이터1",Data1[0].Order_List);
    //왜 위에 둘이 다르게 상황이 나옴?
    var DataByMonth = {
        "Jan":[],"Feb":[],"Mar":[],"Apr":[],"May":[],"Jun":[],"Jul":[],"Aug":[],"Sep":[],"Oct":[],"Nov":[],"Dec":[]
    };
    var Month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let moment = require('moment');

    while (i<Data.length){//달마다 뭐가 몇개 팔렸는지 정리
        var month = moment(Data[i].Time).month();
        var OrderList = JSON.parse(Data[i].Order_List);
        for(var k = 0 ; k < OrderList.length; k++){
            var index = DataByMonth[Month[month]].findIndex(e =>  e.id === OrderList[k].id);
            (index===-1)?DataByMonth[Month[month]].push(OrderList[k]):(DataByMonth[Month[month]][index].num=DataByMonth[Month[month]][index].num+OrderList[k].num)
        }
        i++;
    }

    for (var n in Month){ //오름차순으로 정렬
        n = Month[n];
        DataByMonth[n].sort(function(a, b) {return b.num - a.num;});
        DataByMonth[n].map(e => e.id = (Menu[e.id-1].Name))
        if (DataByMonth[n].length > 5){
            DataByMonth[n].splice(5);
        }//5개까지 자르기
    }
    console.log("DataByMonth",DataByMonth);
    var Line1=[];

    for (var month in Month){ //그래프 구성에 따라 정리
        month = Month[month];
        for(var k = 0; k < DataByMonth[month].length ;k++){
            var index = Line1.findIndex(e=>e.id === DataByMonth[month][k].id)
            if(index===-1){
                Line1.push({
                    "id": DataByMonth[month][k].id,
                    "data": [
                        
                    ]
                });
                for(var m in Month){
                    m = Month[m];
                    if(m === month){
                        Line1[Line1.length-1].data.push({"x":m,"y":DataByMonth[m][k].num})
                    }else{
                        Line1[Line1.length-1].data.push({"x":m,"y":0});
                    }
                }
            } else{
                // Line1[index].data.push({"x":month,"y":DataByMonth[month][k].num});
                var index2=Line1[index].data.findIndex(e=>e.x===month);
                Line1[index].data[index2].y = DataByMonth[month][k].num;
            }
            
        }
    }
    console.log("Line",Line1);
    Line1.splice(5);

    return (
      <div style={{ height: 300, width: 700 }}>
        <MyResponsiveLine data={Line1} />
      </div>
    );
}

export default Linechart;