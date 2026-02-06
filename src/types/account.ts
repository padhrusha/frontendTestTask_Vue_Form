export interface Account {
  labelInput: string;
  label: { test: string }[];
  entryType: string;
  login: string;
  password: string | null;
  saved: boolean;
}
