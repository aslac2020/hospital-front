import { LocalDate } from '@js-joda/core';
export class RoomAvaliate {
  id!: number;
  dataAvaliate!: LocalDate;
  pressureBlood?: number;
  temperature!: number;
  saturation!: number;
  meditionDiabetes?: number;
  observation!: string
  levelGravities?: string;

}
