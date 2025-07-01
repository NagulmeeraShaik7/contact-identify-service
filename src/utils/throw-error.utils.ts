export default function throwError(message: string, status = 400) {
  const err: any = new Error(message);
  err.status = status;
  throw err;
}
