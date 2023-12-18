/**
 * eventBus: 
 * C'est un objet qui agit comme un bus d'événements. Cela signifie qu'il facilite la communication entre différentes parties de votre application en permettant à un composant d'envoyer des événements et à d'autres composants de les écouter.
*/
const eventBus = {
  dispatch(event: string, data?: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
};

export default eventBus;