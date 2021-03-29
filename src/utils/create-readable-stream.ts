import { Readable } from 'stream'

export const createReadableStream = (buffer: Buffer): Readable => {
  const readable = new Readable()
  readable._read = () => null // _read is required but you can noop it
  readable.push(buffer)
  readable.push(null)
  return readable
}
