import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, IonicPage, NavController, NavParams } from "ionic-angular";
import { ClientService } from "../../services/domain/client.service";

@IonicPage()
@Component({
  selector: "page-forgot",
  templateUrl: "forgot.html",
})
export class ForgotPage {
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public alertCtrl: AlertController,
  ) {
    this.formGroup = formBuilder.group({
      email: ["jhondoe@email.com", [Validators.required, Validators.email]],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgotPage");
  }

  handleSubmit(){
    this.clientService.forgot(this.formGroup.controls.email.value).subscribe(response => {
      let alert = this.alertCtrl.create({
        title: "Great!",
        message: "Now check the new password in your message box.",
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
    })
  }

  backPage() {
    this.navCtrl.pop();
  }
}
