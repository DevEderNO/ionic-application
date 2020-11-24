import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { API_CONFIG } from "../../config/api.config";
import { IClientDTO } from "../../models/client.dto";
import { ClientService } from "../../services/domain/client.service";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  client: IClientDTO;
  adresses: string[] = [];

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
          this.getImageIfExists();
          if (this.client.addresses && this.client.addresses.length > 0) {
            this.client.addresses.map((address) => {
              this.adresses.push(
                `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city.state.name}, CEP: ${address.zipCode}`
              );
            });
          }
        },
        (error) => {
          if (error.status === 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id).subscribe(
      (res) => {
        this.client.image_url = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
      },
      (error) => {}
    );
  }

  backPage() {
    window.history.back();
  }
}
