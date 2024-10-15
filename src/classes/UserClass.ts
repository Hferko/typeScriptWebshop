import { nanoid } from "nanoid";


export default class User {
  public readonly userId: string;
  private _name: string;
  private _email: string;  

  constructor(name: string, email: string) {
    this.userId = nanoid();
    this._name = name;
    this._email = email;    
  }

  // *** Get - Set ---->
  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (
      newName &&
      newName.length > 0 &&
      /^[A-zéáőúűöüóíÉÁŐÚŰÖÜÓÍ ,.'-]+$/.test(newName)
    ) {
      this._name = newName;
    } else {
      console.error("Nem ér a neved...");
    }
  }

  get email(): string {
    return this._email;
  }

  set email(newEmail: string) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (newEmail && newEmail.length > 0 && regex.test(newEmail)) {
      this._email = newEmail;
    } else {
      console.error("Helytelen email cím.");
    }
  }
  
  renderUser(): void {
    const user = document.getElementById("user") as HTMLDivElement;    
    user.innerText = `Belépve mint: ${this.name}`; // Kiíratom a user nevét a DOM-ba
    
  }
}