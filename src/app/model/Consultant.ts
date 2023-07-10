import { ConsultStatus } from './ConsultStatus';
import { Doctor } from './Doctor';
import { Patient } from './Patient';
import { Room } from './Room';
export class Consultant {
  id?: number;
  isPatientToken!: boolean;
  isPatientRoomSorting!: boolean;
  isPatientRoomClinic!: boolean;
  isPatientRoomMedication!: boolean;
  doctor!: Doctor;
  room!: Room;
  patient!: Patient;
  status!: ConsultStatus;

}
