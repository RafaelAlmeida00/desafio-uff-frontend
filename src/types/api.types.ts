export interface HateoasLink {
  href: string
  method: string
}

export interface HateoasResponse<T> {
  data: T
  _links: Record<string, HateoasLink>
}

export interface ApiErrorResponse {
  message: string
  errors?: string[]
}