import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
} from "@/components/ui";
import { remove } from "../../app/transactions/actions";

/**
 * Delete transaction modal
 * @param props.id
 * @param props.onDelete
 * @param props.variant
 * @returns
 */
export function DeleteTransactionModal(props: {
  id: string;
  onDelete: () => void;
  variant?: "link" | "destructive";
}) {
  // Extract the id from the props
  const { id } = props || {};

  // Bind the id to the remove function
  const removeTransaction = remove.bind(null, id);

  return (
    <AlertDialog>
      <Button variant={props.variant} asChild>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting the transaction cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          action={async () => {
            await removeTransaction();
            props.onDelete();
          }}
        >
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" asChild>
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
