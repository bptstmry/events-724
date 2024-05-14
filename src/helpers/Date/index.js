/* 
  Utilitaire `getMonth` qui retourne le nom du mois en français à partir d'une date.
  
  Fonctionnalités :
  - Utilise un objet `MONTHS` qui mappe les numéros de mois aux noms correspondants en français.
  - La fonction `getMonth` prend une instance de `Date` et retourne le nom du mois correspondant.
*/


export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth()];
