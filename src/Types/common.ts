export interface IDropdownOption {
  id: string;
  name: string;
}

export interface IHandleOpenVars {
  id: string;
}

export interface IActionProps {
  openDialog: (id: string) => void;
}

export interface ITableFilterOption {
  name: string;
  value: string;
}
