
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import styles from './_cards.module.scss'
import FocusCard from "./focusCard/FocusCard";
import { TicketData } from "../../../service/models/Ticket";
import { Doughnut } from 'react-chartjs-2';

interface PieChartProps {
  data: {
    labels: string[],
    datasets: {
      data: number[],
      backgroundColor: string[]
    }[]
  }
}

function CardsSection(){

    const cards = useSelector( 
        (state:RootState) =>  state.dashboard.cards
        );

    const ticketsData = useSelector((state:RootState) => state.ticketManagement.rows);

    const getCountOfType = (type:string):number => {
        return ticketsData.filter((ticket:TicketData) => ticket.ticketTypes.includes(type)).length;
    }

    const data = {
      labels: cards.map((card) => card.type),
      datasets: [
        {
          data: cards.map((card) => getCountOfType(card.type)),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#87CBB9', "#577D86"],
        },
      ],
    };

    return(
        <div className={styles.wrapper}>
            {cards.map( c => {
                return (
                    <FocusCard key={c.type} type={c.type} number={getCountOfType(c.type)}  />
                )
            })}
            <PieChart data={data} />
        </div>
    )

}

const PieChart = ({ data }: PieChartProps) => {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CardsSection;
