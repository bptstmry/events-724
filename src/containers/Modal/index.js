import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

/* 
  Ce composant `Modal` est utilisé pour afficher une modale dans l'application.
  
  Principaux éléments :
  - `useState`: Gère l'état `isOpened` pour contrôler l'ouverture ou la fermeture de la modale.
  - `opened`: Propriété optionnelle indiquant si la modale est ouverte par défaut.
  - Le composant accepte `Content` comme contenu à afficher dans la modale.
  - `children`: Fonction enfant qui reçoit `isOpened` et `setIsOpened` pour contrôler l'état de la modale depuis l'extérieur.
  
  Points à retenir :
  - L'état `isOpened` est mis à jour lorsqu'on clique sur le bouton de fermeture ou via d'autres interactions.
  - `Content` peut être n'importe quel élément React (texte, composant, etc.) à afficher dans la modale.
  - Le composant `Icon` est utilisé pour afficher une icône de fermeture dans le bouton.
  
  Propriétés :
  - `opened`: Boolean indiquant si la modale est ouverte par défaut (par défaut `false`).
  - `Content`: Contenu de la modale (obligatoire).
  - `children`: Fonction enfant prenant `isOpened` et `setIsOpened` comme arguments (obligatoire).
*/


const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened);
  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
}

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
}

export default Modal;
