export const addClass = (
  existClassName: string,
  newClassName: string | undefined
): string => {
  return newClassName ? newClassName + " " + existClassName : existClassName
}
