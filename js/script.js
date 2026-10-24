/* ==========================================================================
   SCRIPT.JS — theme engine + content model (window.Site). Used by the live
   preview and by editor.js; the exported site does NOT include this file.
   --------------------------------------------------------------------------
   THEMES is an object: { CategoryKey: { label, c, img?, classic?, v: [variants] } }
   - Add a variant  -> push { file: "Fashion_2", hero, about, cta, gallery:[5] } into that category's v
   - Add a category -> add a new key (needs c + s content, and variants with images)
   - RANDOM mode    -> "classic": true. Your older, non-cover themes: no content swap,
                       no cover hero; just list their css filenames (without .css).
   ========================================================================== */

const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const G = (...ids) => ids.map((i) => U(i));
const TEAM = ["1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330", "1500648767791-00dcc994a43e", "1438761681033-6461ffad8d80"].map((i) => U(i, 500));

const THEMES = {
  Restaurant: {
    label: "Restaurant",
    svc: G("1512621776951-a57141f2eefd", "1473093295043-cdd812d0e601", "1555939594-58d7cb561ad1", "1519708227418-c8fd9a32b7a2", "1551024506-0bccd828d307", "1544145945-f90425340c7e"),   // 6 optional service photos (used by themes that show .card-media)
    c: { brand: "Maison Braise", eyebrow: "Cuisine de saison · Montréal", h1: "Une table pensée pour les longues soirées", lead: "Produits locaux, cuisson au feu de bois et service chaleureux. Réservez votre table et laissez-nous faire le reste.", cta: "Réserver une table", cta2: "Voir la carte", aboutTitle: "Une cuisine généreuse, des producteurs d'ici", servicesNav: "Menu", servicesTitle: "Notre carte", galleryNav: "Ambiance", galleryEyebrow: "Dans l'assiette", galleryTitle: "Un avant-goût de la table", ctaTitle: "Une table vous attend ce soir", ctaText: "Réservations ouvertes du mardi au dimanche. Groupes et événements privés sur demande.", tagline: "Restaurant de quartier, cuisine au feu de bois et produits du terroir.",
      s: [["Entrées à partager", "Légumes rôtis, burrata maison et petites assiettes pour ouvrir l'appétit."], ["Pâtes maison", "Roulées chaque matin et servies avec des sauces mijotées lentement."], ["Cuissons au feu", "Viandes maturées et poissons saisis sur braises de chêne."], ["Poissons du jour", "Arrivages locaux, préparés simplement pour respecter le produit."], ["Desserts signature", "Crèmes, fruits de saison et pâtisseries réalisées sur place."], ["Cave & cocktails", "Vins nature, cocktails d'auteur et sélection de bières artisanales."]] },
    v: [
      { file: "Restaurant_0", hero: U("1517248135467-4c7edcad34c4", 2000), cta: U("1559339352-11d035aa65de", 1800), about: U("1414235077428-338989a2e8c0"), gallery: G("1504674900247-0877df9cc836", "1476224203421-9ac39bcb3327", "1555396273-367ea4eb4db5", "1565299624946-b28f40a0ae38", "1540189549336-e6e99c3679fe") },
      { file: "Restaurant_1", c: { brand: "Café Olive", eyebrow: "Bistro & café · Montréal", h1: "Frais, local et fait avec amour", lead: "Brunchs gourmands, plats du jour et cafés torréfiés à deux pas. Venez comme vous êtes." }, hero: U("1514933651103-005eec06c04b", 2000), cta: U("1424847651672-bf20a4b0982b", 1800), about: U("1550966871-3ed3cdb5ed0c"), gallery: G("1546069901-ba9599a7e63c", "1482049016688-2d3e1b311543", "1493770348161-369560ae357d", "1432139555190-58524dae6a55", "1551782450-a2132b4ba21d") },
      { file: "Restaurant_2", cover: false, c: { brand: "Marché Vert", eyebrow: "Table de marché · Produits locaux", h1: "Des producteurs d'ici, directement dans votre assiette", lead: "Légumes du jour, fromages fermiers et pains au levain : une cuisine qui suit les saisons et les récoltes.", cta: "Réserver une table", cta2: "Voir la carte" }, hero: U("1488459716781-31db52582fe9", 2000), cta: U("1471193945509-9ad0617afabf", 1800), about: U("1542838132-92c53300491e"), gallery: G("1540420773420-3366772f4999", "1506368249639-73a05d6f6488", "1567306226416-28f0efdc88ce", "1610348725531-843dff563e2c", "1498837167922-ddd27525d352") },
      { file: "Restaurant_3", cover: false, c: { brand: "Coffee House", eyebrow: "Torréfacteur artisanal · Montréal", h1: "Le café, au rythme qu'il mérite", lead: "Grains sélectionnés, torréfaction maison et pâtisseries du matin. Une pause lente dans une ville pressée.", cta: "Nous visiter", cta2: "Notre menu", servicesTitle: "Au comptoir", s: [["Espresso & filtre", "Origines uniques, torréfiées chaque semaine."], ["Laits végétaux", "Avoine, amande ou soya : à vous de choisir."], ["Viennoiseries", "Croissants et brioches cuits sur place."], ["Brunch", "Œufs, avocats et toasts du matin au midi."], ["Grains à emporter", "Repartez avec votre café préféré en sac."], ["Ateliers dégustation", "Initiez-vous aux méthodes d'extraction."]] }, hero: U("1495474472287-4d71bcdd2085", 2000), cta: U("1497935586351-b67a49e012bf", 1800), about: U("1447933601403-0c6688de566e"), gallery: G("1442512595331-e89e73853f31", "1511920170033-f8396924c348", "1509042239860-f550ce710b93", "1559925393-8be0ec4767c8", "1453614512568-c4024d13c247") },
    ],
  },
  Fashion: {
    label: "Fashion",
    svc: G("1434389677669-e08b4cac3105", "1507679799987-c73779587ccf", "1611085583191-a3b181a88401", "1584917865442-de89df76afd3", "1521572163474-6864f9cf17ab", "1487222477894-8943e31ef7b2"),   // 6 optional service photos (used by themes that show .card-media)
    c: { brand: "Atelier Soie", eyebrow: "Collection Automne · Hiver", h1: "L'élégance, sans effort", lead: "Des pièces intemporelles, coupées dans des matières nobles et pensées pour durer au-delà des saisons.", cta: "Découvrir la collection", cta2: "Notre univers", aboutTitle: "Des pièces intemporelles, façonnées avec soin", servicesNav: "Collections", servicesTitle: "Nos univers", galleryNav: "Lookbook", galleryEyebrow: "Lookbook", galleryTitle: "La saison en images", ctaTitle: "Habillez votre saison", ctaText: "Livraison offerte dès 150 $ et retours gratuits sous 30 jours.", tagline: "Mode contemporaine, fabrication responsable, créée à Montréal.",
      s: [["Prêt-à-porter", "Des silhouettes épurées à associer et à superposer."], ["Sur mesure", "Une pièce unique, ajustée à votre morphologie."], ["Accessoires", "Foulards, ceintures et bijoux pour finir chaque tenue."], ["Maroquinerie", "Sacs en cuir végétal tanné, cousus à la main."], ["Essentiels", "Les basiques indispensables, réinventés chaque saison."], ["Conseil en style", "Un rendez-vous privé pour composer votre garde-robe."]] },
    v: [
      { file: "Fashion_0", hero: U("1469334031218-e382a71b716b", 2000), cta: U("1496747611176-843222e1e57c", 1800), about: U("1441986300917-64674bd600d8"), gallery: G("1445205170230-053b83016050", "1490481651871-ab68de25d43d", "1515886657613-9f3515b0c78f", "1558769132-cb1aea458c5e", "1483985988355-763728e1935b") },
      { file: "Fashion_1", c: { brand: "Maison Rose", eyebrow: "Nouvelle collection · Printemps", h1: "Osez l'audace du quotidien", lead: "Couleurs douces, coupes franches : une garde-robe qui vous ressemble, du matin jusqu'au soir." }, hero: U("1539109136881-3be0616acf4b", 2000), cta: U("1581044777550-4cfa60707c03", 1800), about: U("1509631179647-0177331693ae"), gallery: G("1524504388940-b1c1722653e1", "1488161628813-04466f872be2", "1529139574466-a303027c1d8b", "1485968579580-b6d095142e6e", "1532453288672-3a27e9be9efd") },
      { file: "Fashion_2", cover: false, c: { brand: "High Fashion", eyebrow: "Nouvelle collection", h1: "Votre style, version audacieuse", lead: "Silhouettes colorées, accessoires forts et pièces qui se remarquent. Habillez-vous comme vous le sentez.", cta: "Magasiner", cta2: "Voir le lookbook" }, hero: U("1503342217505-b0a15ec3261c", 1400), cta: U("1487222477894-8943e31ef7b2", 1800), about: U("1529626455594-4ff0802cfb7e"), gallery: G("1534528741775-53994a69daeb", "1512436991641-6745cdb1723f", "1496217590455-aa63a8350eea", "1475180098004-ca77a66827be", "1523381210434-271e8be1f52b") },
      { file: "Fashion_3", cover: false, c: { brand: "Atelier Aurore", eyebrow: "Haute couture · Robes de mariée", h1: "Votre plus beau jour, sur mesure", lead: "Créations nuptiales dessinées et cousues à la main dans notre atelier, pensées pour sublimer votre histoire.", cta: "Prendre rendez-vous", cta2: "Nos collections", aboutTitle: "L'art de la couture, au service de votre histoire", servicesNav: "Créations", servicesTitle: "Nos créations", galleryNav: "Galerie", galleryEyebrow: "Galerie", galleryTitle: "Instants précieux", ctaTitle: "Rêvons ensemble votre robe", ctaText: "Un premier rendez-vous de conseil est offert, sur réservation.", s: [["Robes de mariée", "Collections exclusives en soies et dentelles."], ["Création sur mesure", "Une robe unique, dessinée pour vous."], ["Cérémonie & invités", "Tenues élégantes pour toute la famille."], ["Retouches", "Ajustements précis par nos couturières."], ["Voiles & accessoires", "Pièces délicates pour parfaire votre allure."], ["Essayages privés", "Un salon rien que pour vous."]] }, hero: U("1519741497674-611481863552", 2000), cta: U("1465495976277-4387d4b0b4c6", 1800), about: U("1537633552985-df8429e8048b"), gallery: G("1511285560929-80b456fea0bc", "1465495976277-4387d4b0b4c6", "1606800052052-a08af7148866", "1519225421980-715cb0215aed", "1532712938310-34cb3982ef74") },
    ],
  },
  Agency: {
    label: "Agency",
    svc: G("1561070791-2526d30994b5", "1547658719-da2b51169166", "1460925895917-afdab827c52f", "1492691527719-9d1e07e534b4", "1611162617213-7d7a39e9b1d7", "1607082348824-0a96f2a4b9da"),   // 6 optional service photos (used by themes that show .card-media)
    c: { brand: "Studio Nova", eyebrow: "Agence créative · Branding & digital", h1: "Des idées audacieuses qui font avancer les marques", lead: "Nous concevons des identités, des sites et des campagnes qui captent l'attention et génèrent des résultats mesurables.", cta: "Lancer un projet", cta2: "Voir nos réalisations", aboutTitle: "Stratèges, designers et bâtisseurs de marques", servicesNav: "Expertises", servicesTitle: "Ce que nous créons", galleryNav: "Projets", galleryEyebrow: "Portfolio", galleryTitle: "Projets récents", ctaTitle: "Votre prochain grand projet commence ici", ctaText: "Racontez-nous votre idée : nous revenons vers vous en moins de 24 heures.", tagline: "Agence créative indépendante : stratégie, design et production.",
      s: [["Identité de marque", "Logo, univers visuel et lignes directrices complètes."], ["Design web", "Sites rapides, accessibles et conçus pour convertir."], ["Stratégie digitale", "Positionnement, parcours client et plan de croissance."], ["Production vidéo", "Films de marque, publicités et contenus sociaux."], ["Réseaux sociaux", "Calendriers éditoriaux, création et gestion de communauté."], ["Packaging", "Emballages distinctifs qui se démarquent en rayon."]] },
    v: [
      { file: "Agency_0", hero: U("1522071820081-009f0129c71c", 2000), cta: U("1542744173-8e7e53415bb0", 1800), about: U("1600880292203-757bb62b4baf"), gallery: G("1559028012-481c04fa702d", "1581291518857-4e27b48ff24e", "1531297484001-80022131f5a1", "1497366216548-37526070297c", "1460925895917-afdab827c52f") },
      { file: "Agency_1", c: { brand: "Pop Studio", eyebrow: "Studio créatif indépendant", h1: "Du design qui a de la personnalité", lead: "Couleurs vives, idées franches et collaboration sans chichi : on donne du relief à votre marque." }, hero: U("1552664730-d307ca884978", 2000), cta: U("1519389950473-47ba0277781c", 1800), about: U("1553877522-43269d4ea984"), gallery: G("1561070791-2526d30994b5", "1572044162444-ad60f128bdea", "1558655146-9f40138edfeb", "1626785774573-4b799315345d", "1633356122544-f134324a6cee") },
      { file: "Agency_2", cover: false, c: { brand: "Creative Studio", eyebrow: "Agence de design", h1: "Creative design agency", lead: "Nous transformons vos idées en identités fortes, en sites efficaces et en campagnes mémorables.", cta: "Parlons-en", cta2: "Nos expertises", servicesTitle: "What we do" }, hero: U("1522202176988-66273c2fd55f", 1600), cta: U("1556155092-490a1ba16284", 1800), about: U("1517245386807-bb43f82c33c4"), gallery: G("1523726491678-bf852e717f6a", "1523240795612-9a054b0db644", "1516321318423-f06f85e504b3", "1504384308090-c894fdcc538d", "1556761175-5973dc0f32e7") },
      { file: "Agency_3", cover: false, c: { brand: "Verbatim", eyebrow: "Rédaction · Stratégie de contenu", h1: "Des mots qui font bouger les choses", lead: "Concept, copywriting et direction éditoriale : nous donnons une voix claire et mémorable à votre marque.", cta: "Obtenir une soumission", cta2: "Voir nos textes", servicesTitle: "Nos spécialités", s: [["Copywriting", "Slogans, pages web et campagnes qui convertissent."], ["Stratégie éditoriale", "Ton de voix, calendrier et lignes directrices."], ["Contenu de marque", "Articles, infolettres et études de cas."], ["Scénarisation", "Scripts vidéo et balados percutants."], ["Naming & signature", "Des noms et slogans qui restent en tête."], ["Révision & coaching", "On polit vos textes et on forme vos équipes."]] }, hero: U("1521737604893-d14cc237f11d", 2000), cta: U("1519389950473-47ba0277781c", 1800), about: U("1521737711867-e3b97375f902"), gallery: G("1573164713988-8665fc963095", "1556761175-4b46a572b786", "1573496359142-b8d87734a5a2", "1587614382346-4ec70e388b28", "1531403009284-440f080d1e12") },
    ],
  },
  Fitness: {
    label: "Fitness",
    svc: G("1534438327276-14e5300c3a48", "1517836357463-d25dfeac3438", "1571019613454-1cb2f99b2d8b", "1518611012118-696072aa579a", "1544367567-0f2fcb009e0b", "1490645935967-10de6ba17061"),   // 6 optional service photos (used by themes that show .card-media)
    c: { brand: "Pulse Studio", eyebrow: "Gym & coaching · Montréal", h1: "Repoussez vos limites", lead: "Coaching personnalisé, équipements de pointe et une communauté qui vous pousse à dépasser vos objectifs.", cta: "Essai gratuit", cta2: "Voir les programmes", aboutTitle: "Un club pensé pour votre progression", servicesNav: "Programmes", servicesTitle: "Nos programmes", galleryNav: "Le club", galleryEyebrow: "Le club", galleryTitle: "Vivez l'énergie du club", ctaTitle: "Votre première séance est offerte", ctaText: "Réservez un essai gratuit et rencontrez nos coachs. Aucun engagement.", tagline: "Club de remise en forme : coaching, cours collectifs et accompagnement.",
      s: [["Musculation guidée", "Des programmes progressifs, encadrés par nos coachs certifiés."], ["Cardio & HIIT", "Séances intenses et variées pour brûler et gagner en endurance."], ["Coaching privé", "Un suivi individuel adapté à vos objectifs et à votre rythme."], ["Cours collectifs", "Une dizaine de cours par jour, pour tous les niveaux."], ["Yoga & mobilité", "Étirements, souplesse et respiration pour mieux récupérer."], ["Nutrition", "Conseils d'habitudes alimentaires simples et durables."]] },
    v: [
      { file: "Fitness_0", hero: U("1534438327276-14e5300c3a48", 2000), cta: U("1517963879433-6ad2b056d712", 1800), about: U("1571019613454-1cb2f99b2d8b"), gallery: G("1517836357463-d25dfeac3438", "1581009146145-b5ef050c2e1e", "1599058917212-d750089bc07e", "1540497077202-7c8a3999166f", "1526506118085-60ce8714f8c5") },
      { file: "Fitness_1", c: { brand: "Studio Souffle", eyebrow: "Yoga & pilates · Montréal", h1: "Bougez avec intention", lead: "Un studio lumineux, des cours à taille humaine et un accompagnement bienveillant pour retrouver équilibre et énergie.", cta: "Réserver un cours", ctaTitle: "Votre premier cours est offert" }, hero: U("1544367567-0f2fcb009e0b", 2000), cta: U("1506126613408-eca07ce68773", 1800), about: U("1518611012118-696072aa579a"), gallery: G("1599901860904-17e6ed7083a0", "1552196563-55cd4e45efb3", "1575052814086-f385e2e2ad1b", "1545205597-3d9d02c29597", "1506126613408-eca07ce68773") },
      { file: "Fitness_2", cover: false, svc: G("1552674605-db6ffd4facb5", "1571008887538-b36bb32f4571", "1502904550040-7534597429ae", "1581009146145-b5ef050c2e1e", "1464822759023-fed622ff2c3b", "1544367567-0f2fcb009e0b"), c: { brand: "Nord Trail Club", eyebrow: "Course en sentier · Plein air", h1: "Explorez. Courez. Recommencez.", lead: "Sorties de groupe, plans d'entraînement et défis en nature pour tous les niveaux, du premier 5 km à l'ultra.", cta: "Rejoindre le club", cta2: "Voir les sorties", aboutTitle: "Une communauté qui court ensemble", servicesNav: "Sorties", servicesTitle: "Nos sorties & programmes", galleryNav: "Aventures", galleryEyebrow: "Aventures", galleryTitle: "La piste vous attend", ctaTitle: "Chaussez-vous, on part samedi", ctaText: "Première sortie gratuite. Prêt de lampe frontale et café au retour.", s: [["Sorties du matin", "Groupes par niveau, parcours variés."], ["Plan 10 km → marathon", "Un entraînement progressif et encadré."], ["Course en sentier", "Technique, descente et gestion de l'effort."], ["Renforcement", "Gainage et force pour prévenir les blessures."], ["Weekends d'aventure", "Escapades en montagne et courses à étapes."], ["Récupération", "Étirements, massage et conseils santé."]] }, hero: U("1552674605-db6ffd4facb5", 2000), cta: U("1517836357463-d25dfeac3438", 1800), about: U("1476480862126-209bfaa8edc8"), gallery: G("1571008887538-b36bb32f4571", "1502904550040-7534597429ae", "1461896836934-ffe607ba8211", "1530549387789-4c1017266635", "1534438327276-14e5300c3a48") },
      { file: "Fitness_3", cover: false, c: { brand: "Studio Flow", eyebrow: "Yoga · Méditation · Mobilité", h1: "Respirez. Étirez-vous. Revivez.", lead: "Des cours doux ou dynamiques, pour tous les niveaux, dans une ambiance lumineuse et bienveillante.", cta: "Essayer un cours", cta2: "Voir l'horaire", aboutTitle: "Un espace pour retrouver votre équilibre", ctaTitle: "Votre premier cours est offert", ctaText: "Réservez en ligne et venez découvrir le studio. Tapis fournis." }, hero: U("1506629082955-511b1aa562c8", 1400), cta: U("1545205597-3d9d02c29597", 1800), about: U("1545389336-cf090694435e"), gallery: G("1593811167562-9cef47bfc4d7", "1588286840104-8957b019727f", "1599447421416-3414500d18a5", "1519823551278-64ac92734fb1", "1506126613408-eca07ce68773") },
    ],
  },
  RealEstate: {
    label: "Real Estate",
    svc: G("1564013799919-ab600027ffc6", "1560518883-ce09059eeffa", "1522708323590-d24dbb6b0267", "1554224155-6726b3ff858f", "1460317442991-0ec209397118", "1618221195710-dd6b41faaea6"),   // 6 optional service photos (used by themes that show .card-media)
    c: { brand: "Habitat Nova", eyebrow: "Courtage immobilier · Montréal", h1: "Trouvez l'endroit où votre vie commence", lead: "Achat, vente et location : un accompagnement humain et des experts du marché local à chaque étape.", cta: "Estimer ma propriété", cta2: "Voir les propriétés", aboutTitle: "Un courtier qui connaît votre quartier", servicesNav: "Services", servicesTitle: "Nos services immobiliers", galleryNav: "Propriétés", galleryEyebrow: "Sélection", galleryTitle: "Propriétés à la une", ctaTitle: "Prêt à vendre ou à acheter?", ctaText: "Obtenez une évaluation gratuite de votre propriété en 48 heures.", tagline: "Courtiers immobiliers : achat, vente, location et investissement.",
      s: [["Achat résidentiel", "Recherche ciblée, visites et négociation à vos côtés."], ["Vente & mise en marché", "Photos, stratégie de prix et diffusion à grande échelle."], ["Location", "Mise en relation avec des locataires ou propriétaires fiables."], ["Évaluation gratuite", "Une estimation précise basée sur les ventes récentes."], ["Investissement locatif", "Analyse de rendement et choix d'immeubles porteurs."], ["Home staging", "Mettez votre propriété en valeur pour la vendre plus vite."]] },
    v: [
      { file: "RealEstate_0", hero: U("1613490493576-7fde63acd811", 2000), cta: U("1480074568708-e7b720bb3f09", 1800), about: U("1600607687939-ce8a6c25118c"), gallery: G("1564013799919-ab600027ffc6", "1600585154340-be6161a56a0c", "1600596542815-ffad4c1539a9", "1512917774080-9991f1c4c750", "1560518883-ce09059eeffa") },
      { file: "RealEstate_1", c: { brand: "Urbanis", eyebrow: "Immobilier urbain · Condos & maisons", h1: "Votre prochain chez-soi, en toute simplicité", lead: "Condos, maisons et plex : trouvez, financez et achetez avec une équipe qui parle votre langue." }, hero: U("1545324418-cc1a3fa10c00", 2000), cta: U("1448630360428-65456885c650", 1800), about: U("1502672260266-1c1ef2d93688"), gallery: G("1600566753190-17f0baa2a6c3", "1600210492486-724fe5c67fb0", "1493809842364-78817add7ffb", "1486406146926-c627a92ad1ab", "1560448204-e02f11c3d0e2") },
      { file: "RealEstate_2", cover: false, c: { brand: "Maisonnet", eyebrow: "Plateforme immobilière · Québec", h1: "Trouvez votre propriété en quelques clics", lead: "Des milliers d'annonces vérifiées, des alertes personnalisées et des courtiers prêts à vous accompagner.", cta: "Rechercher", cta2: "Estimer ma maison" }, hero: U("1480714378408-67cf0d13bc1b", 2000), cta: U("1477959858617-67f85cf4f1df", 1800), about: U("1583608205776-bfd35f0d9f83"), gallery: G("1568605114967-8130f3a36994", "1570129477492-45c003edd2be", "1518780664697-55e3ad937233", "1502672023488-70e25813eb80", "1449824913935-59a10b8d2000") },
      { file: "RealEstate_3", cover: false, c: { brand: "Atelier Habitat", eyebrow: "Architecture & courtage · Montréal", h1: "Des lieux de vie pensés avec soin", lead: "Nous sélectionnons, rénovons et vendons des propriétés au caractère unique, avec un regard d'architecte.", cta: "Planifier une visite", cta2: "Nos projets", aboutTitle: "Un regard d'architecte sur chaque propriété", servicesTitle: "Notre approche" }, hero: U("1600585154340-be6161a56a0c", 2000), cta: U("1605276374104-dee2a0ed3ce6", 1800), about: U("1600566752355-35792bedcfea"), gallery: G("1600585154084-4e5fe7c39198", "1600573472550-8090b5e0745e", "1597047084897-51e81819a499", "1523217582562-09d0def993a6", "1600047509807-ba8f99d2cdde") },
    ],
  },
  /* RANDOM: your older themes. List their css filenames (no .css). They keep their own
     layout/hero, so the cover mode and per-industry copy are skipped; neutral photos are used. */
  Random: {
    label: "Random",
    classic: true,
    c: {},
    img: { hero: U("1522071820081-009f0129c71c", 1200), about: U("1600880292203-757bb62b4baf"), cta: U("1542744173-8e7e53415bb0", 1800), gallery: G("1559028012-481c04fa702d", "1581291518857-4e27b48ff24e", "1531297484001-80022131f5a1", "1497366216548-37526070297c", "1460925895917-afdab827c52f") },
    v: ["nature", "sporty", "modern-minimal", "cinematic-immersive", "editorial-heritage", "friendly-local", "industrial-trades", "scrapbook", "glassmorphism", "swiss-design", "luxury-typography", "conceptual-sketch", "bento-grid", "doodle", "neobrutalism", "retro", "dark-lofi", "art-deco"].map((file) => ({ file })),
  },
};

const STORE_KEY = "gen-theme";
let current = { cat: Object.keys(THEMES)[0], idx: 0 };
let defaultTitle = "";
let themeCopy = {};   // active theme's default text   (key -> string)
let themeSlots = {};  // active theme's default images (slot -> url)

/* CONTENT MODEL — everything the form can change lives here.
   text:   key  -> string   (keys = every [data-c] in index.html)
   images: slot -> url / data-URL (slots = hero, cta, about, gallery1-5, team1-4, service1-6)
   logo:   data-URL | null
   counts: listId -> number of items (unset = the template default, see LISTS)
   opts:   svc (service photos on/off; unset = theme default), showName (brand text beside logo), heroStats (false = hide hero stats but keep their space), hidden (section ids to hide)
   Anything not set here falls back to the theme's default, then to the HTML's own text. */
const state = { text: {}, images: {}, logo: null, counts: {}, opts: { showName: true, hidden: [] } };   // opts.svc: undefined = theme default (on for built-in themes, off for Random)
let tplMode = false;   // "empty template" view: every field shows its own key, every image a labelled placeholder
let svcDefault = true;
const SECTIONS = { about: "#about", services: "#services", features: ".features", team: "#team", gallery: "#gallery", testimonials: "#testimonials", faq: "#faq", cta: ".cta-section", contact: "#contact" };


/* LISTS — every repeated block. The HTML ships `def` items; the editor can go from `min` to `max`.
   Extra items are cloned from item #`tpl` and renumbered (s1t -> s7t, gallery2 -> gallery6 ...).
   JS stamps data-count / --n / --cols on the container so themes can adapt (see base.css). */
const LISTS = {
  services:     { label: "Services",      sel: ".services .grid-3",      item: ".card",        tpl: 1, min: 2, max: 12, def: 6 },
  features:     { label: "Avantages",     sel: ".features .grid-2",      item: ".feature",     tpl: 1, min: 2, max: 8,  def: 4 },
  team:         { label: "Membres",       sel: ".team .grid-4",          item: ".team-member", tpl: 1, min: 1, max: 8,  def: 4 },
  gallery:      { label: "Photos",        sel: ".gallery-grid",          item: ".img-frame",   tpl: 2, min: 3, max: 12, def: 5 },
  testimonials: { label: "Avis",          sel: ".testimonials .grid-3",  item: ".testimonial", tpl: 1, min: 1, max: 6,  def: 3 },
  faq:          { label: "Questions",     sel: ".faq-list",              item: ".faq-item",    tpl: 1, min: 1, max: 12, def: 5 },
  heroStats:    { label: "Statistiques",  sel: ".hero-meta",             item: "div",          tpl: 1, min: 1, max: 3,  def: 3 },
  aboutStats:   { label: "Statistiques",  sel: ".about-stats",           item: "div",          tpl: 1, min: 1, max: 3,  def: 3 },
};
const NEWDEF = [   // default text of items added beyond the template's own
  [/^s\d+t$/, "Nouveau service"], [/^s\d+d$/, "Décrivez ce service en une phrase."],
  [/^f\d+t$/, "Nouvel avantage"], [/^f\d+d$/, "Expliquez ce point fort en une phrase."],
  [/^t\d+n$/, "Prénom Nom"], [/^t\d+r$/, "Rôle"], [/^t\d+d$/, "Courte présentation."],
  [/^r\d+q$/, "Un avis client à remplacer."], [/^r\d+n$/, "Nom du client"], [/^r\d+r$/, "Précision"],
  [/^q\d+q$/, "Nouvelle question?"], [/^q\d+a$/, "Votre réponse ici."],
];
const newDefault = (k) => NEWDEF.find(([re]) => re.test(k))?.[1];
const clampN = (id, n) => Math.max(LISTS[id].min, Math.min(LISTS[id].max, n));
const countOf = (id) => clampN(id, state.counts[id] ?? LISTS[id].def);

function makeItem(L, n) {
  const el = L.tplNode.cloneNode(true), from = String(L.tpl);
  el.querySelectorAll("[data-c],[data-img]").forEach((x) => {
    ["data-c", "data-img"].forEach((a) => x.hasAttribute(a) && x.setAttribute(a, x.getAttribute(a).replace(from, n)));
    if (x.dataset.c) { const d = newDefault(x.dataset.c); if (d !== undefined) { x.dataset.d = d; x.textContent = d; } }
  });
  el.classList.add("is-visible");                       // new nodes aren't watched by the reveal observer
  el.querySelectorAll(".faq-question").forEach((q) => q.setAttribute("aria-expanded", "false"));
  el.querySelectorAll(".faq-answer").forEach((a) => a.removeAttribute("style"));
  return el;
}

function syncLists() {
  for (const [id, L] of Object.entries(LISTS)) {
    const box = document.querySelector(L.sel);
    if (!box || !L.tplNode) continue;
    const want = countOf(id);
    let items = [...box.children].filter((c) => c.matches(L.item));
    while (items.length > want) items.pop().remove();
    while (items.length < want) { const el = makeItem(L, items.length + 1); box.append(el); items.push(el); }
    box.dataset.count = want;
    box.style.setProperty("--n", want);
    box.style.setProperty("--cols", Math.min(want, 6));
    if (id === "gallery") box.classList.toggle("is-uniform", want !== L.def);   // special 5-photo layouts only at 5
  }
}

/* default photo for any slot; extra team/gallery/service slots reuse the theme's photos in rotation */
function slotFor(k) {
  if (themeSlots[k] !== undefined) return themeSlots[k];
  const m = k.match(/^(gallery|team|service)(\d+)$/);
  if (!m) return undefined;
  let n = 0; while (themeSlots[m[1] + (n + 1)]) n++;
  return n ? themeSlots[m[1] + (((+m[2] - 1) % n) + 1)] : undefined;
}

document.addEventListener("DOMContentLoaded", initThemes);

function findTheme(name) {
  for (const cat in THEMES) {
    const idx = THEMES[cat].v.findIndex((t) => t.file === name);
    if (idx >= 0) return { cat, idx };
  }
  return null;
}

function initThemes() {
  defaultTitle = document.title;
  document.querySelectorAll("[data-c]").forEach((el) => (el.dataset.d = el.textContent)); // HTML's own text = last-resort default
  document.querySelectorAll("[data-url]").forEach((el) => (el.dataset.d = el.getAttribute("href")));
  for (const L of Object.values(LISTS)) {   // remember one pristine item per list to clone from
    const box = document.querySelector(L.sel);
    const items = box ? [...box.children].filter((c) => c.matches(L.item)) : [];
    if (items[L.tpl - 1]) L.tplNode = items[L.tpl - 1].cloneNode(true);
  }
  let saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
  current = findTheme(new URLSearchParams(location.search).get("theme") || saved) || current;
  buildSwitcher();
  applyTheme(current.cat, current.idx);
}

function applyTheme(cat, idx) {
  const category = THEMES[cat];
  idx = (idx + category.v.length) % category.v.length;
  const v = category.v[idx];
  const t = { svc: category.svc, ...(category.img || {}), ...v };
  current = { cat, idx };
  const root = document.documentElement;

  // 1. stylesheet (new loads first, old removed on load = no flash)
  const old = document.getElementById("theme-link");
  if (!old.getAttribute("href").endsWith(`/${t.file}.css`)) {
    const next = old.cloneNode();
    next.removeAttribute("id");
    next.href = `css/${t.file}.css`;
    next.onload = () => { old.remove(); next.id = "theme-link"; emit(); };
    next.onerror = () => console.warn(`Theme file not found: css/${t.file}.css`);
    old.after(next);
  }
  root.dataset.theme = t.file;
  svcDefault = !category.classic;                       // built-in themes ship a service-photo layout; Random themes get the generic one, opt-in
  if (category.classic) root.dataset.svcfx = "generic"; else root.removeAttribute("data-svcfx");
  if (category.classic || t.cover === false) root.removeAttribute("data-hero"); else root.dataset.hero = "cover";

  // 2. this theme's defaults (copy + images)
  themeCopy = { ...category.c, ...(v.c || {}) };
  (themeCopy.s || []).forEach(([title, desc], i) => { themeCopy[`s${i + 1}t`] = title; themeCopy[`s${i + 1}d`] = desc; });
  themeSlots = { hero: t.hero, cta: t.cta, about: t.about };
  (t.gallery || []).forEach((src, i) => (themeSlots["gallery" + (i + 1)] = src));
  TEAM.forEach((src, i) => (themeSlots["team" + (i + 1)] = src));
  (t.svc || []).forEach((src, i) => (themeSlots["service" + (i + 1)] = src));

  render();
  try { localStorage.setItem(STORE_KEY, t.file); } catch (e) {}
  history.replaceState(null, "", `?theme=${t.file}${location.hash}`);
  updateSwitcher(t.file);
  emit();
}

/* Paints state + theme defaults into the page. Cheap; call after any state change. */
function placeholder(name) {
  return "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"><rect width="800" height="600" fill="#dfe3e8"/><path d="M0 0 800 600M800 0 0 600" stroke="#bcc3cd" stroke-width="4"/><text x="400" y="318" font-family="monospace" font-size="56" font-weight="700" text-anchor="middle" fill="#2b3340">${name}</text></svg>`);
}
function render() {
  const root = document.documentElement;
  syncLists();
  const img = (k) => (tplMode || state.images[k] === k ? placeholder(k) : state.images[k] ?? slotFor(k));
  ["hero", "cta"].forEach((k) => { const u = img(k); if (u) root.style.setProperty(`--${k}-image`, `url("${u}")`); });
  document.querySelectorAll("img[data-img]").forEach((el) => {
    const src = img(el.dataset.img);
    if (src && el.getAttribute("src") !== src) el.src = src;
  });
  document.querySelectorAll("[data-c]").forEach((el) => {
    const k = el.dataset.c;
    const val = tplMode ? k : state.text[k] ?? themeCopy[k] ?? el.dataset.d;
    if (el.textContent !== val) el.textContent = val;
    if (el.dataset.link === "tel") el.href = "tel:" + val.replace(/[^\d+]/g, "");
    if (el.dataset.link === "mail") el.href = "mailto:" + val.trim();
  });
  // social / external links: empty value hides the button
  document.querySelectorAll("[data-url]").forEach((el) => {
    const k = el.dataset.url;
    let v = tplMode ? "#" : (state.text[k] ?? themeCopy[k] ?? el.dataset.d ?? "#").trim();
    if (v === "" && !tplMode) el.style.setProperty("display", "none", "important"); else el.style.removeProperty("display");
    if (v && !/^(https?:|mailto:|tel:|#|\/)/i.test(v)) v = "https://" + v;
    el.setAttribute("href", v || "#");
  });
  const brand = state.text.brand ?? themeCopy.brand;
  document.title = brand ? `${brand}${(themeCopy.eyebrow || state.text.eyebrow) ? " — " + (state.text.eyebrow ?? themeCopy.eyebrow) : ""}` : defaultTitle;
  // logo
  const logo = tplMode || state.logo === "logo" ? placeholder("logo") : state.logo;
  document.querySelectorAll(".logo-img").forEach((el) => {
    el.hidden = !logo;
    if (logo && el.getAttribute("src") !== logo) el.src = logo;
    el.closest(".nav-logo")?.classList.toggle("logo-only", !!logo && !state.opts.showName);
  });
  // hero stats: hidden = invisible but still occupying space (layout doesn't jump)
  const hm = document.querySelector(".hero-meta");
  if (hm) { if (state.opts.heroStats === false) hm.style.setProperty("visibility", "hidden"); else hm.style.removeProperty("visibility"); }
  // options
  root.dataset.svc = (state.opts.svc ?? svcDefault) ? "on" : "off";
  Object.entries(SECTIONS).forEach(([id, sel]) => {
    const hide = state.opts.hidden.includes(id);
    document.querySelectorAll(sel).forEach((sec) => (hide ? sec.style.setProperty("display", "none", "important") : sec.style.removeProperty("display")));
    if (/^#/.test(sel)) document.querySelectorAll(`li > a[href="${sel}"]`).forEach((a) => (a.parentElement.hidden = hide));
  });
}

function emit() { document.dispatchEvent(new CustomEvent("site:theme")); }
const defaultText = (k) => themeCopy[k] ?? document.querySelector(`[data-c="${k}"],[data-url="${k}"]`)?.dataset.d ?? newDefault(k) ?? "";
const imageFor = (k) => state.images[k] ?? slotFor(k) ?? "";
window.Site = { THEMES, state, SECTIONS, LISTS, count: countOf, setCount(id, n) { state.counts[id] = clampN(id, n); render(); }, render, applyTheme, findTheme, defaultText, imageFor, setTemplate(on) { tplMode = !!on; render(); }, get template() { return tplMode; }, get svcOn() { return state.opts.svc ?? svcDefault; }, get current() { return current; }, get themeFile() { return THEMES[current.cat].v[current.idx].file; } };

function buildSwitcher() {
  const ts = document.createElement("div");
  ts.className = "ts";
  ts.setAttribute("role", "toolbar");
  ts.setAttribute("aria-label", "Changer de thème");
  ts.innerHTML = Object.entries(THEMES).map(([k, cat]) => `<button data-cat="${k}">${cat.label}</button>`).join("") +
    `<div class="ts-var" hidden><button data-step="-1" aria-label="Thème précédent">‹</button><span></span><button data-step="1" aria-label="Thème suivant">›</button></div>` +
    `<button data-cookie-preview aria-label="Aperçu de la bannière de témoins" title="Aperçu témoins">🍪</button>`;
  ts.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-cookie-preview")) return showCookies(true);
    if (b.dataset.cat) applyTheme(b.dataset.cat, b.dataset.cat === current.cat ? current.idx : 0);
    else if (b.dataset.step) applyTheme(current.cat, current.idx + Number(b.dataset.step));
  });
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input,textarea,select")) return;
    if (e.key === "ArrowRight") applyTheme(current.cat, current.idx + 1);
    if (e.key === "ArrowLeft") applyTheme(current.cat, current.idx - 1);
  });
  document.body.appendChild(ts);
  const syncH = () => document.documentElement.style.setProperty("--ts-h", ts.offsetHeight + 14 + "px");
  syncH(); window.addEventListener("resize", syncH);
}

function updateSwitcher(file) {
  const ts = document.querySelector(".ts");
  if (!ts) return;
  ts.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === current.cat)));
  const list = THEMES[current.cat].v;
  const v = ts.querySelector(".ts-var");
  v.hidden = list.length < 2;
  v.querySelector("span").textContent = THEMES[current.cat].classic ? `${file} ${current.idx + 1}/${list.length}` : `${current.idx + 1}/${list.length}`;
}
