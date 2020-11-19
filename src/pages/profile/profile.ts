import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { IClientDTO } from "../../models/client.dto";
import { ClientService } from "../../services/client.service";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  client: IClientDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clientService: ClientService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.client = response;
        },
        (error) => {}
      );
    }
  }

  backPage() {
  }
}
