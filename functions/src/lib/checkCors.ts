import { Response, Request } from "firebase-functions"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({ origin: true })

export const checkCors = (
  req: Request,
  res: Response
): Response | "OPTIONS" => {
  // preflightが必要な時はokを返す
  // POSTはpreflightが必要
  if (req.method === "OPTIONS") {
    cors(req, res, () => {
      res.status(200).send()
    })
    return "OPTIONS"
  }
  res.set("Access-Control-Allow-Headers", "Content-Type")
  res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL)
  res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST")
  return res
}
