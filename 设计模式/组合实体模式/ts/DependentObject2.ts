export default class DependentObject2 {
  private _data: string = ''
  
  public set data(newData : string) {
    this._data = newData;
  }
  
  public get data() : string {
    return this._data
  }
  
}