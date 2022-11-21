import { Reponse } from '../model/Reponse.interface';

export default interface Test {
  id: number;
  test_libelle: string;
  test_description: string;
  test_categorie: string;
  test_duree: number;
  test_bareme: number;
  test_type: string;
  choix: Reponse[];
}
