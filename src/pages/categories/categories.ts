import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ICategoryDTO } from "../../models/category.dto";
import { CategoryService } from "../../services/domain/category.service";
import { API_CONFIG } from "../../config/api.config";

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-categories",
  templateUrl: "categories.html",
})
export class CategoriesPage {
  items: ICategoryDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryServie: CategoryService
  ) {}

  ionViewDidLoad() {
    this.categoryServie.findAll().subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {}
    );
  }
}
