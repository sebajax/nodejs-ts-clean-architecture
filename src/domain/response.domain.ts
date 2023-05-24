// global response domain
export default interface IResponseDomain {
  error: boolean;
  message: string;
  code: number;
  data?: object;
}
