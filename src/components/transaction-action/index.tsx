import Link from "next/link";
import {
  Button,
  // DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuTrigger,
} from "../ui";
import { DeleteTransactionModal } from "../modals";
import { Ellipsis } from "lucide-react";

type TransactionActionProps = {
  id: string;
  handleDelete: (id: string) => void;
};

export default function TransactionAction({
  id,
  handleDelete,
}: TransactionActionProps) {
  return (
    <>
      {/* <div className="block lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/transactions/${id}/update`}>Update</Link>
            </DropdownMenuItem>
            <DeleteTransactionModal
              id={id}
              onDelete={() => handleDelete(id)}
              variant="link"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

      <div className="space-x-0 md:space-x-2 space-y-2">
        <Button asChild>
          <Link href={`/transactions/${id}/update`}>Update</Link>
        </Button>
        <DeleteTransactionModal
          id={id}
          onDelete={() => handleDelete(id)}
          variant="destructive"
        />
      </div>
    </>
  );
}
