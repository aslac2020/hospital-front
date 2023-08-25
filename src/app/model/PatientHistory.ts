import { LocalDate } from "@js-joda/core";
import { Patient } from "./Patient";

export class PatientHistory {
  id!: number;
  prescriton!: string;
  examsPrescribed?: string[] | any;
  medications!: string;
  isCertificate!: boolean;
  resultsExams!: string;
  patient!: Patient;
  dataConsult!: LocalDate
}
