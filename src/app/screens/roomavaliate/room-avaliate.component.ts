import { ElementRef, ViewChild } from '@angular/core';
// import { Avatar, Clip, Offset} from './../../model/Avatar';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AvatarElai, Canvas, Slide, Object, Animation, Avatar } from 'src/app/model/AvatarElai';
import { Consultant } from 'src/app/model/Consultant';
import { Patient } from 'src/app/model/Patient';
import { RoomAvaliate } from 'src/app/model/RoomAvaliate';
import { AvatarService } from 'src/app/services/avatar.service';
import { HospitalService } from 'src/app/services/hospital.service';

export interface Gravities {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Gravities[];
}

@Component({
  selector: 'app-room-avaliate',
  templateUrl: './room-avaliate.component.html',
  styleUrls: ['./room-avaliate.component.css']
})
export class RoomAvaliateComponent {
  formAvaliatePatient!: FormGroup
  formSortingPatient!: FormGroup
  radioValue!: boolean;
  patient!: Patient;
  isVisiblePainel: boolean = false;
  consult!: Consultant;
  selectedValueGravities!: string;
  selectedValueRoomAvaliate!: RoomAvaliate;
  isMinusAge!: boolean;
  isValuePressedBlood!: number;
  isValueMedicationDiabetes = 0.0;
  nivelGravities!: string;
  videoAvatar!: Avatar;
  videoId!: string;
  videoUrl!: string;
  isOpenPanel!: boolean;


  levelGravities: Gravities = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Green', completed: false, color: 'primary' },
      { name: 'Blue', completed: false, color: 'accent' },
      { name: 'Yellow', completed: false, color: 'warn' },
      { name: 'Red', completed: false, color: 'warn' },
    ],
  }

  constructor(
    private _formBuilder: FormBuilder,
    private service: HospitalService,
    private router: Router,
    private snackBar: MatSnackBar,
    private avatarService: AvatarService


  ) {
    this.createFormIsBlankPatient();
    this.createFormSortingBlankPatient();

  }

  ngOnInit(): void {
    this.getAllPatientsFirst();
    this.isValuePressedBlood = 25

  }

  createFormIsBlankPatient() {
    this.formAvaliatePatient = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      cpf: ['', Validators.required],
      isPreferential: ['', Validators.required]
    })
  }

  createFormSortingBlankPatient() {
    this.formSortingPatient = this._formBuilder.group({
      pressureBlood: [''],
      temperature: [''],
      saturation: [''],
      meditionDiabetes: [''],
      observation: [''],
      levelGravities: ['']
    }
    )

  }

  getAllPatientsFirst() {
    this.isMinusAge = false;
    this.isVisiblePainel = false;

    this.service.getOrderConsult().subscribe(
      {
        next: (data: Consultant) => {
          if (data.patient.age < 10) {
            this.isMinusAge = true;
            this.isValuePressedBlood = 0
          }
          this.populateFormsPatient(data);
          data.isPatientToken = true;
          data.isPatientRoomClinic = false;
          data.isPatientRoomMedication = false;
          data.isPatientWaitingClinic = false;
          this.consult = data;
          this.isVisiblePainel = true;
        }
      }
    )
  }

  populateFormsPatient(data: Consultant) {

    this.radioValue = data.patient.isPreferential;

    this.formAvaliatePatient = this._formBuilder.group(
      {
        name: new FormControl({ value: data.patient.name, disabled: true }),
        lastName: new FormControl({ value: data.patient.lastName, disabled: true }),
        age: new FormControl({ value: data.patient.age, disabled: true }),
        cpf: new FormControl({ value: data.patient.cpf, disabled: true }),
        isPreferential: new FormControl({ value: data.patient.isPreferential, disabled: true }),
      }
    )
  }

  getCallPatientOld() {
    this.service.callPatient(this.consult).subscribe(
      {
        next: (data: Consultant) => {
          if (this.isMinusAge == true) {
            this.populateFormsRoomAvaliate();
          }
        }
      }
    )
  }


  getCallPatient() {

    var configVideo = this.configVideoAvatarElai();
    console.log(configVideo)
    this.avatarService.createVideoAvataElai(configVideo).subscribe(
      {
        next: (data: AvatarElai) => {
          var videoId = data._id
          if (videoId != null) {
            this.getRetrieveVideo(videoId)
          }
        }
      }
    )
  }

  getRetrieveVideo(id: string) {
    this.avatarService.getRetrieveVideo(id).subscribe(
      {
        next: (data: AvatarElai) => {
          if (data._id != null) {
            this.videoId = data._id;
            this.getRenderVideo(data._id);
          }
        }
      }
    )
  }

  playVideo(id: string) {
    this.avatarService.getRetrieveVideo(id).subscribe(
      {
        next: (data: AvatarElai) => {
          if (data.status == "ready") {
            this.videoUrl = data.url
          }
        }
      }
    )
  }


  getRenderVideo(id: string) {
    this.avatarService.getRenderVideo(id)
      .subscribe((data: any) => console.log(data))
  }

  // configVideoAvatar(){
  //   const configVideo = new Avatar();
  //   configVideo.background = "#000000";
  //   configVideo.clips = [];

  //   var arrayClip = new Clip;
  //   arrayClip.avatar_id = 'Daisy-inskirt-20220818'
  //   arrayClip.avatar_style = "normal";
  //   arrayClip.input_text = `Paciente ${this.consult.patient.name} ${this.consult.patient.lastName} comparecer a sala de triagem`;

  //   var configOffset = arrayClip.offset = new Offset;
  //   configOffset.x = 0;
  //   configOffset.y = 0

  //   arrayClip.scale = 1;
  //   arrayClip.voice_id = "00988b7d451d0722635ff7b2b9540a7b"
  //   configVideo.clips.push(arrayClip);


  //   configVideo.ratio = "16:9";
  //   configVideo.test = true;
  //   configVideo.version = "v1alpha";

  //   return configVideo;
  // }

  configVideoAvatarElai() {

    const configVideo = new AvatarElai();
    configVideo.name = "Chamada Paciente"

    //Slides
    configVideo.slides = [];
    var slidesConfig = new Slide();

    //Canvas
    var canvasConfig = slidesConfig.canvas = new Canvas();

    //Objects
    canvasConfig.objects = [];
    var objectConfig = new Object();
    objectConfig.type = "avatar";
    objectConfig.version = 2;
    objectConfig.left = 151.5;
    objectConfig.top = 36;
    objectConfig.fill = "#4868FF";
    objectConfig.scaleX = 0.3;
    objectConfig.scaleY = 0.3;
    objectConfig.src = "https://elai-avatars.s3.us-east-2.amazonaws.com/common/gia/casual/gia_casual.png";
    objectConfig.avatarType = "transparent";

    canvasConfig.objects.push(objectConfig);

    canvasConfig.background = "#ffffff";
    canvasConfig.version = "4.4.0";

    //Animations
    var animationsConfig = new Animation();
    animationsConfig.type = null;
    animationsConfig.exitType = null;

    objectConfig.animation = animationsConfig;
    slidesConfig.canvas = canvasConfig;

    //Avatar
    var avatarConfig = new Avatar();
    avatarConfig.id = "gia.casual";
    avatarConfig.version = 4;
    avatarConfig.name = "Gia Casual";
    avatarConfig.gender = "female";
    avatarConfig.canvas = "https://elai-avatars.s3.us-east-2.amazonaws.com/common/gia/casual/gia_casual.png";

    const numberRandom = Math.floor(Math.random() * 10);

    slidesConfig.id = numberRandom;
    slidesConfig.avatar = avatarConfig;
    slidesConfig.animation = "fade_in";
    slidesConfig.language = "Portuguese";
    //slidesConfig.speech = `Paciente ${this.consult.patient.name} ${this.consult.patient.lastName} comparecer a Sala de Triagem`;
    slidesConfig.voice = "pt-BR-BrendaNeural";
    slidesConfig.voiceType = "text";
    slidesConfig.voiceProvider = "azure";

    configVideo.tags = [];
    configVideo.tags.push("teste")

    configVideo.slides.push(slidesConfig);


    return configVideo;
  }

  openPanel() {
    this.isVisiblePainel = !this.isVisiblePainel;
    if (!this.isVisiblePainel == true) {
      this.getCallPatientOld()
    }
    //this.playVideo(this.videoId);
  }

  valueSelectGravities(event: Event | any) {
    this.selectedValueGravities = event.value
  }

  creteAvaliatePatient() {
    this.selectedValueRoomAvaliate = this.formSortingPatient.getRawValue() as RoomAvaliate;
    this.updateConsult(this.consult);
  }

  updateConsult(consult: Consultant) {

    const updateConsult = new Consultant();
    const idConsult = updateConsult.id = consult.id;
    updateConsult.patient = consult.patient;
    updateConsult.doctor = consult.doctor;
    updateConsult.room = consult.room;

    this.selectedValueRoomAvaliate.levelGravities = this.nivelGravities;

    updateConsult.roomAvaliate = this.selectedValueRoomAvaliate;

    updateConsult.isPatientRoomClinic = false;
    updateConsult.isPatientToken = false;
    updateConsult.isPatientRoomMedication = false;
    updateConsult.isPatientRoomSorting = true;

    console.log(updateConsult);

    this.service.updateConsultant(idConsult, updateConsult).subscribe(
      {
        next: (data: Consultant) => {
          this.openSnackBar("Triagem realizada com sucesso");
          this.router.navigate(['']);
        }
      }
    )

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  populateFormsRoomAvaliate() {
    this.formSortingPatient = this._formBuilder.group(
      {
        pressureBlood: [0.0],
        meditionDiabetes: [0.0],
        temperature: [''],
        observation: [''],
        saturation: ['']
      }
    )
  }

  selectedValueService(event: Event | any) {
    this.selectedValueBack(event.value);

  }

  selectedValueBack(gravities: string) {
    switch (gravities) {
      case "Não Urgência":
        this.nivelGravities = 'NOT_URGENT'
        break;
      case "Pouca Urgência":
        this.nivelGravities = 'LITTLE_URGENT'
        break;
      case "Urgência":
        this.nivelGravities = 'URGENT'
        break;
        case "Emergência":
        this.nivelGravities = 'EMERGENCY'
        break;
    }
  }


}
