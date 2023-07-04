import { ConsultStatus } from './ConsultStatus';
import { Doctor } from './Doctor';
import { Patient } from './Patient';
import { Room } from './Room';
export class Consultant {
  id!: number;
  dateConsult!: Date;
  isPatientToken!: boolean;
  isPatientRoomSorting!: boolean;
  isPatientRoomClinic!: boolean;
  isPatientRoomMedication!: boolean;
  doctor!: Doctor;
  rooms!: Room;
  patient!: Patient;
  status!: ConsultStatus;

}
