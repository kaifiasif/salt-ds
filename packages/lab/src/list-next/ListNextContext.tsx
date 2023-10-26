import { createContext } from "@salt-ds/core";
import { SyntheticEvent, useContext } from "react";
import { ListItemNextType } from "./useList";

export interface ListNextContextValue<Item extends ListItemNextType> {
  disabled?: boolean;
  select: (event: SyntheticEvent<HTMLLIElement>, item: Item) => void;
  highlight: (event: SyntheticEvent<HTMLLIElement>, item: Item) => void;

  /** Item value getter */
  getItemValue: (item: Item) => string;
}

export const ListNextContext = createContext<
  ListNextContextValue<ListItemNextType> | undefined
>("ListNextContext", undefined);

export function useListItem() {
  return useContext(ListNextContext);
}
