import { IOption } from './IOption'
import { IValidator } from './IValidator'

export interface IElement {
  id?: string;
  label?: string;
  component: string;
  value: string;
  helpText?: string;
  options?: Array<IOption>;
  isRequired?: boolean;
  isValid?: boolean;
  readonly?: boolean,
  visible?: boolean,
  visibleIf?: Array<IOption>,
  cssClass?: string;
  validators?: Array<IValidator>;
}