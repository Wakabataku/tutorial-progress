// クライアントがログインするときにfunctionsにリクエストを送信するときの型
export interface FuncAccessRequest {
  code: string
}

// LINEユーザ情報の型
export interface UserProfile {
  sub: string
  picture: string
  name: string
}

// クライアントがログインするときにfunctionsから返ってくるレスポンスデータの型
export interface FuncAccessResponse extends UserProfile {
  access_token: string
}

// LINEログインに必要なアクセストークン取得時にLINEから返ってるデータ型
export type LineAccessToken = {
  access_token: string
  expires_in: number
  id_token: string
  refresh_token: string
  scope: string
  token_type: string
  [key: string]: any
}

// ユーザプロフィールをLINEから取得したときにLINE側から返ってくるデータ型
export interface LineUserProfile {
  sub: string
  picture: string
  name: string
  [key: string]: any
}

// 以降は，きちんとエラーハンドリングするときの型
// これらは，まだ理解しなくて大丈夫．実際のアプリにもすべて展開されているわけではない
// 自分も最近勉強した
/* eslint require-jsdoc: 0 */
export class Success<T> {
  readonly value: T

  constructor(value: T) {
    this.value = value
  }
  isSuccess(): this is Success<T> {
    return true
  }
  isFailure(): this is Failure<Error> {
    return false
  }
}

export class Failure<E extends Error> {
  readonly error: E

  constructor(error: E) {
    this.error = error
  }
  isSuccess(): this is Success<unknown> {
    return false
  }
  isFailure(): this is Failure<E> {
    return true
  }
}
export type Result<T, E extends Error> = Success<T> | Failure<E>

export class ErrorResponse extends Error {
  readonly name: string
  readonly message: string
  readonly stack?: string

  constructor(
    readonly functionName: string = "unknown functionName",
    readonly code: number = 500,
    readonly error: Error = new Error("unknown error")
  ) {
    super()
    this.name = error.name
    this.message = error.message
    this.stack = error.stack
  }
}

// 書籍を検索を指示したときにかえってく書籍情報の型
export interface VolumeInfo {
  title: string
  subtitle: string
  description: string
  imageLinks: {
    thumbnail: string
    smallThumbnail: string
  }
}

// 書籍の型
// 書籍にはidがあって，情報がある
export interface BookItem {
  id: string
  volumeInfo: VolumeInfo
}

export interface FuncSetBookRequest {
  book: BookItem
  access_token: string
}

export interface FuncSetBookResponse {
  books: BookItem[]
}

export interface FsBook {
  id: string
  title: string
  subtitle: string
  description: string
  thumbnail: string
  smallThumbnail: string
}
