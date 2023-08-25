import { RoomAvaliate } from './RoomAvaliate';
import { LocalDate } from '@js-joda/core';
import { ConsultStatus } from './ConsultStatus';
import { Doctor } from './Doctor';
import { Patient } from './Patient';
import { Room } from './Room';
import { PatientHistory } from './PatientHistory';
export class Consultant {
  id!: number;
  dateConsult!: LocalDate ;
  isPatientToken!: boolean;
  isPatientRoomSorting!: boolean;
  isPatientRoomClinic!: boolean;
  isPatientRoomMedication!: boolean;
  isPatientWaitingClinic!: boolean;

  doctor!: Doctor;
  room!: Room;
  patient!: Patient;
  roomAvaliate!: RoomAvaliate;
  patientHistory!: PatientHistory;
  status!: ConsultStatus;

}
