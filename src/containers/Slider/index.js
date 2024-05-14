import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

/* 
  Ce composant `Slider` est responsable d'afficher un carrousel d'événements en fonction des données fournies par le contexte `DataContext`.
  
  Principaux éléments :
  - `useData`: Utilise le contexte `DataContext` pour accéder aux données des événements (`data`).
  - `useState`: Gère l'état `index` pour suivre l'index de l'événement actuellement affiché dans le carrousel.
  - `useEffect`: Utilisé pour déclencher le changement d'événement toutes les 5 secondes (`5000` ms).
  
  Points à retenir :
  - Assure-toi que `data` contient les informations nécessaires sur les événements, notamment `focus` qui semble être une liste d'événements triés par date.
  - Le carrousel (`Slider`) affiche les événements dans l'ordre décroissant de leur date.
  - Vérifie que `getMonth` (probablement une fonction utilitaire) est correctement utilisée pour afficher le mois de l'événement.
  - Les boutons de pagination (`radio-button`) permettent de sélectionner un événement spécifique dans le carrousel.
  - Veille à ce que le changement automatique d'événement fonctionne comme prévu avec `setTimeout` et `useState`.
*/

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // ** CORRECTION ORDRE DES EVENEMENTS (PLUS ANCIEN AU PLUS RECENT) ">"
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  // ** CORRECTION PAGE BLANCHE "-1"
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* ** CORRECTION "checked={index === radioIdx}" (avant idx) */}
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
