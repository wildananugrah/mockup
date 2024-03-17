export interface _IRoute {
  method: string | "GET" | "POST" | "PUT" | "DELETE";
  headers: any;
  body?: any;
  query?: any;
  dbPool?: any;
}
