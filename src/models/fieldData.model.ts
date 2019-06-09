import { HouseType, FieldType, CastleType } from "src/modules/common/infrastructure/consts/goTEnums";

export class FieldData {
  public id: number;
  public name: string;
  public type: FieldType;
  public crownCount: number;
  public barrelCount: number;
  public castleType: CastleType;
  public controlledHouse?: HouseType;

  constructor(name: string) {
    this.name = name;
  }
}