import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from ".";

export function DataGrid({
  columns,
  rows,
}: {
  columns: { label: string; field: string; className?: string }[];
  rows: Record<string, string>[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} scope="col" className={column.className}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-gray-50">
            {columns.map((column, colIndex) => (
              <TableCell
                key={colIndex}
                className={`px-6 py-4 whitespace-nowrap ${column.className}`}
              >
                {row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
