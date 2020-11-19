import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys_config";
import { ILocalUser } from "../models/local_user";

@Injectable()
export class StorageService {
  getLocalUser(): ILocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (!user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  setLocalUser(user: ILocalUser) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
    }
  }
}
