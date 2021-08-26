import { ChartComponent, DataLabel, DateTimeCategory, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective } from "@syncfusion/ej2-react-charts"
import { useEffect, useState } from "react"

export default function ProductChart(props: any) {
    
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        let mount = true

        const data = props.transaction.map((tran: any) => {return {date: tran.time, value: tran.quantity}})

        console.log(data)

        setChartData(data)

        return () => {
            mount = false
        }
    }, [props.transaction])
    
    return <>
    {
        chartData.length > 0 &&
        <div style={{textAlign: "center", margin: "5%"}}>
            <ChartComponent width="800" title="Product Transaction"
            primaryXAxis={{valueType:"DateTimeCategory", labelFormat:"dd-MM-yyyy", edgeLabelPlacement:"Shift",
            rangePadding: "Round", title:"transaction time", intervalType:"Days"}}
            >
                <Inject services={[LineSeries, DateTimeCategory, DataLabel]}></Inject>
                <SeriesCollectionDirective>
                    <SeriesDirective
                        type="Line" dataSource={chartData}
                        xName="date" yName="value" marker={{visible:true, dataLabel:{visible: true}}}
                    >
                    </SeriesDirective>
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
    }
    </>
}