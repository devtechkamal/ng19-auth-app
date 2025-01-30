export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Position {
  name: string;
}
