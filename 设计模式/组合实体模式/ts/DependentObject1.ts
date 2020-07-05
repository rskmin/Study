export default class DependentObject1 {
  private _data: string = ''
  
  public set data(newData : string) {
    this._data = newData;
  }
  
  public get data() : string {
    return this._data
  }
  
}