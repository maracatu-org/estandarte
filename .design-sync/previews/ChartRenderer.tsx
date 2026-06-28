import { ChartRenderer } from "@maracatu/estandarte";

// BRL-formatted Recharts renderer. Reads the active theme from context
// (ThemeProvider, supplied by the preview wrapper). ResponsiveContainer needs a
// sized parent, so each cell fixes a width on the brand canvas surface.
const frame = (node: React.ReactNode) => (
  <div className="bg-canvas rounded-card p-4" style={{ width: 560 }}>
    {node}
  </div>
);

export const BarMonthly = () =>
  frame(
    <ChartRenderer
      config={{
        type: "bar",
        title: "Gastos por mês",
        xKey: "name",
        yKey: "value",
        data: [
          { name: "Jan", value: 38200 },
          { name: "Fev", value: 41100 },
          { name: "Mar", value: 29750 },
          { name: "Abr", value: 52300 },
          { name: "Mai", value: 44980 },
          { name: "Jun", value: 36120 },
        ],
      }}
    />,
  );

export const PieByCategory = () =>
  frame(
    <ChartRenderer
      config={{
        type: "pie",
        title: "Despesas por categoria",
        xKey: "name",
        yKey: "value",
        data: [
          { name: "Passagens aéreas", value: 184000 },
          { name: "Divulgação", value: 96500 },
          { name: "Combustíveis", value: 73200 },
          { name: "Consultorias", value: 51800 },
        ],
      }}
    />,
  );

export const LineTrend = () =>
  frame(
    <ChartRenderer
      config={{
        type: "line",
        title: "Evolução de contratos (R$)",
        xKey: "name",
        yKey: "value",
        data: [
          { name: "2020", value: 1200000 },
          { name: "2021", value: 1750000 },
          { name: "2022", value: 1430000 },
          { name: "2023", value: 2100000 },
          { name: "2024", value: 2680000 },
        ],
      }}
    />,
  );
