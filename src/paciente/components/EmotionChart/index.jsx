import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { EmotionChartContainer } from "./styles";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: ["Ansiedade", "Angústia", "Depressão", "Ideação Suicida"],
  datasets: [
    {
      label: "Intensidade em %",
      data: [0, 0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

export function EmotionChart({ record }) {
  const { bsi, ham_a, ham_d, k10 } = record;
  data.datasets[0].data = [ham_a, k10, ham_d, bsi];

  return (
    <EmotionChartContainer>
      <Radar data={data} options={options} />
    </EmotionChartContainer>
  );
}

EmotionChart.defaultProps = {
  record: {
    bsi: 0,
    ham_a: 0,
    ham_d: 0,
    k10: 0,
  },
};
