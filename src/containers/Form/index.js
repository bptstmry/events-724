import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

/* 
  Ce composant `Form` représente un formulaire de contact dans l'application.
  
  Principaux éléments :
  - `useState` et `useCallback` sont utilisés pour gérer l'état de l'envoi du formulaire (`sending`) et pour définir la fonction `sendContact` qui gère la soumission du formulaire.
  - `mockContactApi` simule un appel asynchrone à une API de contact (dans cet exemple, une simple promesse avec un délai).
  - Le formulaire comporte des champs (`Field`) pour le nom, prénom, type de contact, email, message, ainsi qu'un bouton d'envoi (`Button`).
  - L'état `sending` est utilisé pour désactiver le bouton d'envoi pendant l'envoi du formulaire.
  
  Points à retenir :
  - Lorsque le formulaire est soumis, `sendContact` est appelé pour déclencher l'appel simulé à l'API.
  - `onSuccess` et `onError` sont des fonctions optionnelles pour gérer les cas de succès ou d'erreur lors de l'envoi du formulaire.
  
  Propriétés :
  - `onError`: Fonction appelée en cas d'erreur lors de l'envoi du formulaire (par défaut, une fonction vide).
  - `onSuccess`: Fonction appelée en cas de succès lors de l'envoi du formulaire (par défaut, une fonction vide).
*/


const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
