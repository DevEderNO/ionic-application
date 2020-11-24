import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      email: ["jhondoe@email.com", [Validators.required, Validators.email]],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgotPage");
  }

  backPage() {
    this.navCtrl.pop();
  }
}
