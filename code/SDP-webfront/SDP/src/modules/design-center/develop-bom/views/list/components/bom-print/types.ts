import { PrintState } from '../../hooks/use-print-order';

export type IListItem = PrintState['data'][0] & {
  categoryThree: string;
  categoryFour: string;
  description: {};
  codeUrl: string;
};
