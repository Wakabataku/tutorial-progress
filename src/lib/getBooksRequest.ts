import axios, { AxiosResponse } from "axios"

export const getBooksRequest = async (
  value: string
): Promise<AxiosResponse> => {
  // Google Books APIのURL
  const baseUrl = "https://www.googleapis.com/books/v1/volumes"

  // google books apiには以下の形式で問い合わせする
  const params = {
    q: `intitle:${value}`, // 検索キーワード。intitle:で書籍名が対象に
    Country: "JP", // 国の指定。JPで日本の指定
    maxResults: 40, // 取得する検索件数。10~40件を指定可。デフォルトは10件
    startIndex: 0, // ページングのページ数を指定。0-index
  }

  // axiosはapiなどに問い合わせする際に用いるパッケージ
  // 非同期で得られた結果をそのままreturnしている
  return await axios.get(baseUrl, { params: params })
}
