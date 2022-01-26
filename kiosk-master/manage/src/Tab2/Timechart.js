// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/calendar
import { ResponsiveTimeRange } from '@nivo/calendar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveTimeRange = ({ data /* see data tab */ }) => (
    <ResponsiveTimeRange
        data={data}
        from="2018-04-01"
        to="2018-08-12"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        minValue={-26}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 28,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -94,
                translateY: -91,
                symbolSize: 20
            }
        ]}
    />
)
function Timechart(props) {
    return (
      <div style={{ height: 300, width: 700 }}>
        <MyResponsiveTimeRange data={props.data} />
      </div>
    );
}
export default Timechart;