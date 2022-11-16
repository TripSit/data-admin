export type DrugNameType = 'COMMON' | 'SUBSTITUTIVE' | 'SYSTEMATIC' | 'BRAND';

export interface DrugName {
  id: string;
  name: string;
  type: DrugNameType;
  isDefault: boolean;
}
