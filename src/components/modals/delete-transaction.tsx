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
} from "@/components/ui";
import { remove } from "../../app/transactions/actions";

export function DeleteTransactionModal(props: { id: string }) {
  // Extract the id from the props
  const { id } = props || {};

  // Bind the id to the remove function
  const removeTransaction = remove.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting the transaction cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={removeTransaction}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
