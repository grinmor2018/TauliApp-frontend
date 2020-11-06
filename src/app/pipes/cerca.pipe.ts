import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cerca",
})
export class CercaPipe implements PipeTransform {

  transform(llista: any, texte: any, tipuscerca: any): any {

    // escriu quan no es buit o té >3 caracters
    if(texte == '' || texte.length < 1 ) return llista;

    const resultats = [];

    console.log('tipuscerca: ', tipuscerca);

    if (tipuscerca === '0'){
      for (const resultat of llista) {
        if (resultat.nif.toLowerCase().includes(texte.toLowerCase()) ) {
          resultats.push(resultat);
        }
      }
    }

    if (tipuscerca === '1'){
      for (const resultat of llista) {
        if (resultat.username.toLowerCase().includes(texte.toLowerCase()) ) {
          resultats.push(resultat);
        }
      }
    }
    if (tipuscerca === '2'){
      for (const resultat of llista) {
        if (resultat.cip.toLowerCase().includes(texte.toLowerCase()) ) {
          resultats.push(resultat);
        }
      }
    }

    if (tipuscerca === '3'){
      for (const resultat of llista) {
        if (resultat.email.toLowerCase().includes(texte.toLowerCase()) ) {
          resultats.push(resultat);
        }
      }
    }

    return resultats;
  }
}
