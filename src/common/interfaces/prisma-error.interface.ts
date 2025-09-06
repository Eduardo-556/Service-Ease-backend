export interface PrismaError {
  code: string;
  meta?: {
    target?: string[];
    [key: string]: any;
  };
  [key: string]: any;
}
