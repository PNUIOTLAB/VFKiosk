// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
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

function Barchart(props) {
    return (
      <div style={{ height: 300, width: 400 }}>
        <MyResponsiveBar data={props.data} />
      </div>
    );
  }

export default Barchart;