/* 
  Utilitaire `getMonth` qui retourne le nom du mois en français à partir d'une date.
  
  Fonctionnalités :
  - Utilise un objet `MONTHS` qui mappe les numéros de mois aux noms correspondants en français.
  - La fonction `getMonth` prend une instance de `Date` et retourne le nom du mois correspondant.
*/


export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth()];
