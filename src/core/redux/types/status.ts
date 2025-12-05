export interface StatusResponse {
  message: string;
}

export interface StatusState {
  data: StatusResponse | null;
  loading: boolean;
  error: string | null;
}
