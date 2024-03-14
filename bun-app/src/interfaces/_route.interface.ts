export interface _IRoute {
  method: string | "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  query?: any;
  dbClient?: any;
}
