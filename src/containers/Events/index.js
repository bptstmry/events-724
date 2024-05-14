import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

/* 
  Ce composant `EventList` affiche une liste d'événements filtrée par catégorie et paginée.
  
  Principaux éléments :
  - `useData`: Utilise le contexte `DataContext` pour accéder aux données des événements (`data`) et à d'éventuelles erreurs (`error`).
  - `useState`: Gère l'état `type` pour filtrer les événements par catégorie, et `currentPage` pour gérer la pagination.
  - `Select`: Composant de sélection permettant de filtrer les événements par catégorie.
  - `EventCard`: Composant pour afficher les détails d'un événement.
  - `Modal` et `ModalEvent`: Composants pour afficher un événement dans une modale.

  Points à retenir :
  - Les événements sont filtrés par catégorie (`type`) et paginés en fonction de `PER_PAGE`.
  - Les événements sont affichés dans une liste avec la possibilité d'ouvrir un détail d'événement dans une modale.
  - Assure-toi que `data` contient les informations sur les événements (`events`) et que `typeList` est correctement extrait pour la sélection des catégories.
  - La pagination est implémentée avec des liens qui permettent de naviguer entre les différentes pages d'événements.
*/


const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEvents = (
    (!type
      ? data?.events
      : // ** CORRECTION AJOUT DE "filter((event) => event.type === type)"
        data?.events.filter((event) => event.type === type)) || []
  ).filter((event, index) => {
    if ((currentPage - 1) * PER_PAGE <= index && PER_PAGE * currentPage > index) {
      return true;
    }
    return false;
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
