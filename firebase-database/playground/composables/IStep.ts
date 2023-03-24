import { IElement } from './IElement'

export interface IStep {
  label: string;
  pageIndex: number;
  inValidItemsCount: number;
  elements?: Array<IElement>;
}
