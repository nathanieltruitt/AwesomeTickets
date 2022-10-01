export interface Entity {
  id: number;
}

export function isEntity<T extends object>(entity: T, property: string) {
  let check = Object.keys(entity).indexOf(property);
  return check !== -1 ? true : false;
}
