import Link from "next/link";
import { Button } from "../ui";
import { DeleteTransactionModal } from "../modals";

type TransactionActionProps = {
  id: string;
  handleDelete: () => void;
};

/**
 * Transaction action component for table
 * @param props.id
 * @param props.handleDelete
 * @returns
 */
export default function TransactionAction({
  id,
  handleDelete,
}: TransactionActionProps) {
  return (
    <>
      <div className="space-x-0 md:space-x-2 space-y-2">
        <Button asChild>
          <Link href={`/transactions/${id}/update`}>Update</Link>
        </Button>
        <DeleteTransactionModal
          id={id}
          onDelete={handleDelete}
          variant="destructive"
        />
      </div>
    </>
  );
}
