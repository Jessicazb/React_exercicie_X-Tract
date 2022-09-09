import { useEffect, useState } from "react";
import moment, {weekdays} from "moment";
import "./Calendar.scss";



export default function Calendar() {
  const [currentYear, setCurrentYear] = useState(2022);
  const [dateSelected, setDateSelected] = useState([]);

  

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  moment.updateLocale("fr", {
    months: [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Jullet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ],
  });
  return (
  <div id="calendar_page">
    <div className="header_page"></div>
    <div className="content">
        {month.map(value =>(
            <MonthCard
            key={value}
            month={value}
            currentYear={currentYear}
            />
        ))}
    </div>
    </div> 
  );
}

function MonthCard(props){
    const [value, setvalue] = useState(
        moment().locale("fr").month(props.month).year(props.currentYear)
    );
    const [calendar,setCalendar] = useState([])

    useEffect(()=>{
        const startDay = value.clone().startOf("month").startOf("week")
        const endDay = value.clone().endOf("month").endOf("week")
        const day = startDay.clone().subtract(1, "day")

        while(day.isBefore(endDay, "day")){
            calendar.push(
                Array(7).fill(0).map(()=> day.add(1,"day").clone())
            );
        }
    },[value])
console.log(calendar);
    return (
        <div id="month_card">
        <div className="header">{value.format("MMMM")}</div>
        <div className="week_days"></div>
        {
            calendar.map((week)=>(
                <div className="week" key={week}>
                {week.map(day=>(
                <DayCard
                 key={day._d.getTime() + props.month}
                 day={day}
                 month={props.month}
                 year={props.currentYear}
                />
                ))}
                </div>
            ))
        }
        </div>
    )
};
function DayCard(props){
    return(
    <p>
    {props.day.format("DD").toString()}</p>
    )}