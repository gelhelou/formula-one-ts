export const getAge = (dateOfBirth: Date): number =>
  Math.floor(
    (Date.now() - new Date(dateOfBirth).getTime()) / 1000 / 3600 / 24 / 365
  );

export const isObjectEmpty = (object: object): boolean => {
  if (!object) {
    return true;
  }
  return Object.keys(object).length === 0;
};
