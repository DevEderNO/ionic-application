import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { API_CONFIG } from "../../config/api.config";
import { ICategoryDTO } from "../../models/category.dto";
import { IProductDTO } from "../../models/product.dto";
import { CategoryService } from "../../services/domain/category.service";
import { ProductService } from "../../services/domain/product.service";

@IonicPage()
@Component({
  selector: "page-products",
  templateUrl: "products.html",
})
export class ProductsPage {
  categories: ICategoryDTO[];
  products: IProductDTO[];
  selectedCategory: number = null;
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryServie: CategoryService,
    public productService: ProductService
  ) {}

  ionViewDidLoad() {
    this.categoryServie.findAll().subscribe(
      (response) => {
        this.categories = response;
        this.selectedCategory = Number(response[0].id || 0);
        this.listProducts();
      },
      (error) => {}
    );
  }

  handleSelectedCategory(id: number) {
    if (this.selectedCategory === id) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = id;
      this.listProducts();
    }
  }

  listProducts() {
    this.categoryServie.find(this.selectedCategory).subscribe(
      (response) => {
        this.products = response.products;
      },
      (error) => {}
    );
  }
}
