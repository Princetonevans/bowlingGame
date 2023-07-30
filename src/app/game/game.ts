export interface Frame {
  frame: number;
  mark: string | undefined;
  firstRollTotal: number;
  secondRollTotal: number;
  total: any;
  spare?: boolean;
  strike?: boolean;
}
