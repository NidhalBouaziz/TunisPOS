// Page list and trade-page articles for tools/build.mjs.
// Titles stay under ~65 characters and descriptions under ~160 so search results show them whole.

export const pages = [
  {
    path: '',
    lang: 'fr',
    hreflang: true,
    title: 'Logiciel de caisse Tunisie : café, restaurant, épicerie | TunisPOS',
    ogTitle: 'TunisPOS · La caisse qui compte en millimes',
    description: 'TunisPOS, logiciel de caisse tunisien livré avec le matériel : tables et ticket cuisine pour cafés et restaurants, code-barres et stock pour épiceries.'
  },
  {
    path: 'ar/',
    lang: 'ar',
    hreflang: true,
    title: 'برنامج صندوق في تونس للمقاهي والمطاعم والبقالات | TunisPOS',
    ogTitle: 'TunisPOS · صندوق يحسب حتى المليم',
    description: 'TunisPOS برنامج صندوق تونسي يُسلَّم مع المعدات: طاولات وتذكرة مطبخ للمقاهي والمطاعم، باركود ومخزون للبقالات. يعمل دون إنترنت، بالعربية والفرنسية.'
  },
  {
    path: 'logiciel-caisse-cafe/',
    lang: 'fr',
    trade: 'cafe',
    article: 'cafe',
    crumb: 'Logiciel de caisse café',
    title: 'Logiciel de caisse café en Tunisie : tables, serveurs | TunisPOS',
    description: 'Caisse pour café tunisien : plan de salle et terrasse, serveurs, ticket bar, addition partagée et ventes par serveur. 980 DT, matériel livré, sans internet.',
    h1: 'La caisse du café tunisien, de la terrasse au comptoir.',
    lede: 'Tables et terrasse, serveurs, ticket bar, addition partagée et ventes par serveur. TunisPOS Café est livré avec le matériel, en français et en arabe, et fonctionne sans internet.'
  },
  {
    path: 'logiciel-caisse-restaurant/',
    lang: 'fr',
    trade: 'restaurant',
    article: 'restaurant',
    crumb: 'Logiciel de caisse restaurant',
    title: 'Logiciel de caisse restaurant Tunisie : ticket cuisine | TunisPOS',
    description: 'Caisse pour restaurant en Tunisie : ticket cuisine et ticket bar, carte tunisienne prête de 39 plats, tables et addition partagée. 1 290 DT, matériel livré.',
    h1: 'La caisse de restaurant qui envoie chaque plat en cuisine.',
    lede: 'Ticket cuisine et ticket bar, carte tunisienne prête, tables et addition partagée. TunisPOS Restaurant est livré avec le matériel et fonctionne sans internet, en français et en arabe.'
  },
  {
    path: 'logiciel-caisse-epicerie/',
    lang: 'fr',
    trade: 'epicerie',
    article: 'epicerie',
    crumb: 'Logiciel de caisse épicerie',
    title: 'Logiciel de caisse épicerie et supérette en Tunisie | TunisPOS',
    description: 'Caisse pour épicerie et supérette en Tunisie : 2 934 articles prêts, douchette, vente au kilo, import Excel, étiquettes et stock. 890 DT, matériel livré.',
    h1: "La caisse d'épicerie qui ouvre avec 2 934 articles.",
    lede: 'Douchette, vente au kilo, import Excel, étiquettes et stock. TunisPOS Épicerie est livré avec le matériel, en français et en arabe, et fonctionne sans internet.'
  }
];

const article = (title, body) => `<section class="section seo-copy" aria-labelledby="seo-title">
      <div class="wrap">
        <h2 id="seo-title">${title}</h2>
        <div class="seo-body">
${body}
        </div>
      </div>
    </section>`;

export const articles = {
  cafe: article('Logiciel de caisse pour café en Tunisie', `
          <p>Dans un café tunisien, la caisse doit suivre le rythme : un express au comptoir, trois thés en terrasse, une table qui commande en deux fois. TunisPOS Café est pensé pour ce service, avec un poste de caisse au comptoir et le nom du serveur sur chaque table.</p>
          <h3>Ce que le module café fait pour vous</h3>
          <ul>
            <li>Un plan de salle de T1 à T12 et quatre tables en terrasse, à renommer comme vous voulez : libres en vert, occupées en orange avec le serveur et le montant en cours.</li>
            <li>Un ticket bar à chaque envoi, avec seulement les nouvelles boissons et sans prix.</li>
            <li>L'addition partagée : « Payer une partie » encaisse ce que chacun a pris.</li>
            <li>Les ventes par serveur, jour par jour, dans les rapports.</li>
            <li>Une carte café prête : 25 articles en 6 familles avec photos, et les 12 plus vendus épinglés en haut de la caisse.</li>
          </ul>
          <h3>En dinars, en arabe, sans internet</h3>
          <p>Les prix s'affichent en dinars à trois décimales (1,800 TND), l'interface passe du français à l'arabe en un clic, et la caisse continue de tourner pendant une coupure, puisqu'elle est installée sur le PC du café. Une annulation ou une remise demande le code d'un responsable.</p>
          <h3>Prix</h3>
          <p>TunisPOS Café coûte 980 DT, payés une fois, pour un poste de caisse, avec l'installation, la formation et 12 mois d'assistance. Le pack matériel (écran tactile, imprimante ticket 80 mm, tiroir-caisse) est proposé selon votre configuration.</p>`),

  restaurant: article('Logiciel de caisse pour restaurant en Tunisie', `
          <p>Au restaurant, la caisse ne sert pas qu'à encaisser : elle transmet la commande. Avec TunisPOS Restaurant, le serveur ouvre la table, la caisse envoie les plats en cuisine et les boissons au bar, chacun sur son imprimante, et l'addition se règle en une fois ou en plusieurs.</p>
          <h3>Ce que le module restaurant fait pour vous</h3>
          <ul>
            <li>Un ticket cuisine et un ticket bar à chaque « Envoyer », sans prix, avec la table et le serveur.</li>
            <li>Chaque famille de la carte envoyée au poste de votre choix : bar, cuisine, pizza…</li>
            <li>Une carte tunisienne prête : 39 plats en 6 familles (entrées et soupes, plats tunisiens, grillades et poissons, sandwichs, desserts, boissons) avec images et prix habituels.</li>
            <li>Les prix rapides : toute la carte sur une page pour mettre vos prix à jour en une minute.</li>
            <li>Les tables, les serveurs, l'addition partagée et les ventes par serveur du module café.</li>
          </ul>
          <h3>Des imprimantes trouvées automatiquement</h3>
          <p>TunisPOS recherche les imprimantes de votre réseau, vous laisse imprimer un test, puis envoie chaque ticket au bon poste, en 80 mm ou en 58 mm.</p>
          <h3>Prix</h3>
          <p>TunisPOS Restaurant coûte 1 290 DT, payés une fois, pour un poste de caisse, avec l'installation, la formation et 12 mois d'assistance. Le pack matériel, avec une ou plusieurs imprimantes, est proposé selon votre configuration.</p>`),

  epicerie: article('Logiciel de caisse pour épicerie et supérette en Tunisie', `
          <p>Le plus long, quand on installe une caisse dans une épicerie, c'est de saisir les produits. TunisPOS Épicerie arrive avec des catalogues prêts, dont un catalogue grande surface de 2 934 articles, et les prix habituels de 400 articles courants déjà remplis.</p>
          <h3>Ce que le module épicerie fait pour vous</h3>
          <ul>
            <li>La douchette code-barres, et la vente au kilo calculée au millime (1,500 kg de pommes, par exemple).</li>
            <li>L'import de vos fichiers Excel ou CSV, avec un essai à blanc qui montre chaque erreur avant de créer quoi que ce soit.</li>
            <li>Les étiquettes de rayon EAN-13, sur imprimante d'étiquettes ou planche A4 de 24.</li>
            <li>L'inventaire guidé et les alertes de dates de péremption.</li>
            <li>Les meilleures ventes et les invendus, avec export CSV.</li>
          </ul>
          <h3>Pour le caissier comme pour le propriétaire</h3>
          <p>Le caissier encaisse et voit le montant à rendre. Une annulation ou une remise demande le code d'un responsable, et chaque action sensible est inscrite au journal. La sauvegarde sur clé USB garde quatorze copies.</p>
          <h3>Prix</h3>
          <p>TunisPOS Épicerie coûte 890 DT, payés une fois, pour un poste de caisse, avec l'installation, la formation et 12 mois d'assistance. Le pack matériel, douchette comprise, est proposé selon votre configuration.</p>`)
};
