import { Component } from "@angular/core";
import { IonicPage, MenuController, NavController } from "ionic-angular";
import { ICredentialsDTO } from "../../models/credentials.dto";
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  creds: ICredentialsDTO = {
    email: "ana@gmail.com",
    password: "123",
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {}

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.auth.authenticete(this.creds).subscribe(
      (response) => {
        this.auth.successfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriesPage");
      },
      (error) => {}
    );
  }
}
