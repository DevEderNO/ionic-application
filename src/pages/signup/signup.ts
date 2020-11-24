import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
} from "ionic-angular";
import { ICityDTO } from "../../models/city.dto";
import { IClientDTO } from "../../models/client.dto";
import { IStateDTO } from "../../models/state.dto";
import { CityService } from "../../services/domain/city.service";
import { ClientService } from "../../services/domain/client.service";
import { StateService } from "../../services/domain/state.service";
import { ZipCodeService } from "../../services/zipcode.service";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  formGroup: FormGroup;
  states: IStateDTO[];
  cities: ICityDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public zipcodeService: ZipCodeService,
    public clientService: ClientService,
    public alertCtrl: AlertController
  ) {
    this.formGroup = formBuilder.group({
      name: [
        "Jhon Doe",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      email: ["jhondoe@email.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required]],
      type: ["1", [Validators.required]],
      cpfOrCnpj: [
        "30030030030",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      zipCode: ["74785640", [Validators.required]],
      street: ["Av. Rio Verde", [Validators.required]],
      number: ["1250", [Validators.required]],
      complement: ["", []],
      neighborhood: ["Copacabana", [Validators.required]],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      phone1: ["977261827", [Validators.required]],
      phone2: ["", []],
      phone3: ["", []],
    });
  }

  ionViewDidLoad() {
    this.stateService.findAll().subscribe(
      (response) => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      },
      (error) => {}
    );
  }

  updateCities() {
    let state_id = this.formGroup.value.stateId;
    this.cityService.findAll(state_id).subscribe(
      (response) => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      (error) => {}
    );
  }

  handleChangeZipCode() {
    let zipCode = this.formGroup.controls.zipCode.value;
    if (zipCode.length === 8) {
      this.zipcodeService.find(this.formGroup.controls.zipCode.value).subscribe(
        (response) => {
          this.formGroup.controls.zipCode.setValue(response.cep);
          this.formGroup.controls.street.setValue(response.logradouro);
          this.formGroup.controls.complement.setValue(response.complemento);
          this.formGroup.controls.neighborhood.setValue(response.bairro);
          this.formGroup.controls.number.setValue("S/N");
        },
        (error) => {}
      );
    }
  }

  handleSubmit() {
    this.clientService
      .insert(this.formGroup.value as IClientDTO)
      .subscribe((response) => {
        this.showInsertOk();
      });
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Success!",
      message: "Successful registration",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.pop();
          },
        },
      ],
    });
    alert.present();
  }

  goToLogin() {
    this.navCtrl.pop();
  }
}
