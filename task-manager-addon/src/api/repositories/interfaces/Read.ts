import { Nullable } from '../../../types/templates/Nullable';
import { Dict } from '../../../types/templates/Dict';
import { EntityID } from '../../../types/interfaces/global/EntityID';

/**
 * Read
 */
export interface Read<T> {
  // /**
  //  * Get all items identical as any from provided ones
  //  *
  //  * If we provide many examples then the rule is:
  //  * Get all items identical as any from provided examples
  //  *
  //  * + For example: assuming we have type {a: number, b: string, c: date}
  //  *
  //  * -  getAllByExample({a: 1, b: 'abc', c: '2020-01-01'})
  //  *    should return all elements where [ element.a == 1, element.b == 'abc' and element.c == '2020-01-01' ]
  //  *
  //  * -  getAllByExample({a: 1, c: '2020-01-01'}, {b: 'abc'})
  //  *    should return all elements where [ element.a == 1 and element.c == '2020-01-01' ] OR [ element.b == 'abc']
  //  *
  //  * @param item
  //  */
  // getAllByExample(...item: T[]): Promise<T[]>;
  //
  // /**
  //  * Get first item identical as provided one
  //  *
  //  * @param item
  //  * @see getAllByExample
  //  */
  // getOneByExample(...item: T[]): Promise<T>;

  getOneById(id: EntityID): Promise<Nullable<T>>;
  getAll(): Promise<Dict<T>>;
  countAll(): Promise<number>;
}
