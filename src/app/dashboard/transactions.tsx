import { DataGrid } from "@/components/ui";

export default function Transactions() {
  return (
    <DataGrid
      columns={[
        {
          label: "Title",
          field: "title",
        },
        {
          label: "Type",
          field: "type",
        },
        {
          label: "Date",
          field: "date",
        },
        {
          label: "Amount",
          field: "amount",
          className: "text-right",
        },
      ]}
      rows={[]}
    />
  );
}
