export interface Response<DataModel> {
  message: string;
  status: number;
  data: DataModel;
}
