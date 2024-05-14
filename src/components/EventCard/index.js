import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

/* 
  Ce composant `EventCard` est utilisé pour afficher les détails d'un événement dans une carte.
  
  Principaux éléments :
  - Les `props` utilisées incluent `imageSrc`, `imageAlt`, `date`, `title`, `label`, et `small`.
  - `getMonth` (probablement une fonction utilitaire) est utilisé pour afficher le mois de l'événement.
  
  Points à retenir :
  - `imageSrc` et `imageAlt` sont utilisés pour afficher l'image représentant l'événement.
  - `date` est une instance de `Date` représentant la date de l'événement.
  - `title` est le titre de l'événement affiché dans la carte.
  - `label` est une étiquette associée à l'événement.
  - Le style de la carte peut être ajusté avec la propriété `small`.
  
  Propriétés :
  - `imageSrc`: URL de l'image de l'événement (obligatoire).
  - `imageAlt`: Texte alternatif de l'image (par défaut `"image"`).
  - `date`: Date de l'événement (obligatoire).
  - `title`: Titre de l'événement (obligatoire).
  - `label`: Étiquette de l'événement (obligatoire).
  - `small`: Boolean indiquant si la carte doit être de taille réduite (par défaut `false`).
*/


const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard;
