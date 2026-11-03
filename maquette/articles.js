window.AGRI_ARTICLES = (function () {
  const CATS = { 'Enfilage': ['#ffe3d6', '#a23a1c'], 'Chatons': ['#ffdbe7', '#b23a6c'], 'Seniors': ['#f5e7d2', '#7a4622'], 'Maison': ['#d9e4f7', '#22407a'], 'Entretien': ['#e6f7bd', '#3f5c00'] };
  const P = x => ({ t: 'p', x }), H = x => ({ t: 'h', x }), UL = items => ({ t: 'ul', items }), TIP = x => ({ t: 'tip', x }), STEPS = items => ({ t: 'steps', items });
  const LIST = [
    { id: 'enfiler', cat: 'Enfilage', read: '5 min', date: '14 octobre 2026', gamme: 'essentielles',
      title: 'Comment enfiler des chaussettes à un chat qui n’est pas d’accord',
      excerpt: 'Le bon moment, la bonne prise, la bonne friandise : notre méthode en douceur, testée sur des chats très têtus.',
      blocks: [
        P('Soyons honnêtes : aucun chat ne s’est jamais réveillé en se disant « tiens, si je mettais des chaussettes ». La première fois, il va secouer les pattes, marcher comme un astronaute sur la Lune et te regarder avec un air de profonde trahison. C’est normal, et ça passe vite.'),
        P('Chez Agripatte, on a enfilé des centaines de paires à nos testeurs, dont certains ont un caractère bien trempé. Voici la méthode qui marche le mieux.'),
        H('Choisis le bon moment'),
        P('Un chat qui vient de jouer ou qui guette un pigeon par la fenêtre n’a aucune envie qu’on lui touche les pattes. Vise plutôt le moment où il est calme, ou franchement mou : après le repas, au réveil d’une sieste, quand il ronronne sur tes genoux.'),
        H('La méthode en 4 étapes'),
        STEPS([
          ['Habitue-le au contact', 'Pendant quelques jours, masse doucement ses pattes quand il est détendu, sans rien enfiler. Une friandise à chaque fois.'],
          ['Une patte à la fois', 'Tiens la patte délicatement au-dessus du poignet. Glisse la chaussette, picots vers le sol, jusqu’à ce que le talon soit bien en place.'],
          ['Vérifie le revers', 'Il doit être à plat, sans pli. Tu dois pouvoir glisser un doigt entre la chaussette et la patte : si ce n’est pas le cas, c’est trop serré.'],
          ['Récompense et distrais', 'Friandise, jouet, petite séance de canne à pêche. Le but : qu’il pense à autre chose qu’à ses pieds.']
        ]),
        TIP('Commence par les deux pattes avant seulement. Ce sont elles qui glissent le plus quand il freine, et il s’y habituera plus vite qu’avec les quatre d’un coup.'),
        H('Combien de temps la première fois ?'),
        P('Cinq minutes suffisent. Retire-les avant qu’il ne commence à s’agacer, pour qu’il garde un bon souvenir. Rallonge un peu chaque jour. En une semaine, la plupart des chats les portent sans même y penser.'),
        H('Et s’il refuse vraiment ?'),
        P('Certains chats ne s’y feront jamais, et ce n’est pas grave. Ne le force pas et ne le tiens pas immobilisé : tu risquerais de le stresser durablement. Réessaie quelques jours plus tard, ou concentre-toi sur les zones de la maison qui glissent le plus avec un tapis.')
      ] },
    { id: 'senior', cat: 'Seniors', read: '4 min', date: '2 octobre 2026', gamme: 'sieste',
      title: 'Mon chat âgé ne saute plus sur le canapé : que faire ?',
      excerpt: 'Un bon appui au sol change beaucoup de choses. Nos astuces pour l’aider à reprendre confiance.',
      blocks: [
        P('Il montait sur le canapé d’un bond, et maintenant il s’assoit devant, regarde, hésite… puis renonce. Si ton chat a plus de dix ans, ce petit moment de doute te dit sûrement quelque chose.'),
        H('Pourquoi il hésite'),
        P('Avec l’âge, les muscles fondent un peu et les articulations deviennent raides. Pour sauter, un chat a besoin de pousser fort sur ses pattes arrière. Si le sol glisse au moment de l’impulsion, il le sent, et il préfère ne pas prendre le risque.'),
        TIP('Si ton chat boite, se lèche une patte en particulier ou change brusquement d’habitudes, parles-en à ton vétérinaire. Une raideur peut se soulager, mais il faut d’abord savoir d’où elle vient.'),
        H('Lui redonner un bon appui'),
        UL([
          'Mets un tapis antidérapant au pied de ses endroits préférés : canapé, lit, rebord de fenêtre.',
          'Installe une marche intermédiaire : un pouf, un coussin ferme ou une petite boîte solide.',
          'Fais-lui porter des chaussettes antidérapantes à revers souple, qui ne serrent pas les pattes.',
          'Garde ses griffes à une longueur raisonnable : trop longues, elles le font glisser sur le parquet.'
        ]),
        H('Le confort compte aussi'),
        P('Les vieux chats ont souvent froid aux pattes, surtout sur du carrelage. Une maille douce, en bambou ou en laine, les garde au chaud sans faire transpirer les coussinets. Et un chat qui a chaud bouge plus volontiers.'),
        P('Avec un peu d’aide, beaucoup de chats âgés retrouvent leur place sur le canapé. Et toi, ta bouillotte à poils.')
      ] },
    { id: 'sols', cat: 'Maison', read: '3 min', date: '23 septembre 2026', gamme: 'moussaillon',
      title: 'Parquet, carrelage, escaliers : les sols qui glissent le plus',
      excerpt: 'On a fait le tour de la maison pour trouver où les pattes dérapent, et comment y remédier.',
      blocks: [
        P('Les coussinets d’un chat sont faits pour accrocher sur la terre, l’herbe ou l’écorce. Sur les sols lisses de nos maisons, ils ont beaucoup moins de prise. Voici, du plus traître au plus gentil, les sols qu’on a testés avec nos chats.'),
        H('1. Le parquet vitrifié ou ciré'),
        P('Le champion toutes catégories. C’est là qu’on voit les fameuses sorties de route dans les virages. Le pire, c’est juste après l’entretien, quand le parquet vient d’être ciré.'),
        H('2. Le carrelage poli'),
        P('Presque aussi glissant, et froid en plus. Les grands carreaux brillants d’une cuisine ou d’une salle de bains sont redoutables, surtout quand il y a un peu d’eau par terre.'),
        H('3. Les escaliers en bois'),
        P('Moins glissants qu’un parquet, mais plus dangereux : une glissade dans une descente peut finir en chute. Méfie-toi surtout des marches avec un nez arrondi.'),
        H('4. Le stratifié et le vinyle'),
        P('Ça dépend beaucoup de la finition. Les modèles imitation bois avec un léger relief accrochent plutôt bien, les modèles lisses beaucoup moins.'),
        TIP('Le test de la chaussette : glisse sur ton sol en chaussettes. Si toi, tu glisses, ton chat aussi.'),
        H('Les solutions'),
        UL(['Des tapis aux endroits stratégiques : sortie de la gamelle, bas des escaliers, couloirs où il court.', 'Des bandes antidérapantes transparentes sur les marches.', 'Des chaussettes à semelle renforcée pour les moments de folie.'])
      ] },
    { id: 'chaton', cat: 'Chatons', read: '3 min', date: '9 septembre 2026', gamme: 'guimauve',
      title: 'À quel âge un chaton peut-il porter des chaussettes ?',
      excerpt: 'Taille, durée, matière : le guide pour les toutes petites pattes.',
      blocks: [
        P('Un chaton, c’est une boule d’énergie qui ne sait pas encore freiner. Il court, glisse, se cogne dans le canapé et recommence aussitôt. Faut-il lui mettre des chaussettes pour autant ? Pas forcément tout de suite.'),
        H('Attends qu’il ait au moins 4 mois'),
        P('Avant cet âge, ses pattes grandissent très vite et il apprend à se servir de ses coussinets. Il a besoin de sentir le sol. À partir de 4 mois, quand il pèse au moins 1,5 kg, tu peux commencer à lui faire essayer.'),
        H('Bien choisir la taille'),
        P('Prends une taille S, faite pour les chats de 1 à 3 kg. Une chaussette trop grande tourne autour de la patte, et les picots finissent sur le dessus : ça ne sert plus à rien.'),
        TIP('Les chatons grandissent vite : revérifie la taille tous les mois. Si la chaussette laisse une marque sur la patte quand tu l’enlèves, c’est qu’elle est devenue trop petite.'),
        H('Des séances très courtes'),
        P('Quelques minutes, pendant une séance de jeu, et c’est tout. Le but est surtout qu’il s’habitue au contact. Ne le laisse jamais seul avec des chaussettes : un chaton curieux peut essayer de les mâchouiller.'),
        H('Et s’il les mord ?'),
        P('C’est très fréquent au début. Détourne son attention avec un jouet, et retire-les s’il insiste. Il finira par s’en désintéresser.')
      ] },
    { id: 'lavage', cat: 'Entretien', read: '2 min', date: '28 août 2026', gamme: 'neon',
      title: 'Laver ses chaussettes sans abîmer les picots',
      excerpt: 'Température, sens du lavage, séchage : trois gestes pour qu’elles durent longtemps.',
      blocks: [
        P('Les picots en silicone, c’est ce qui fait tout le travail. S’ils s’usent ou se décollent, ta chaussette redevient une simple chaussette. Bonne nouvelle : il suffit de trois gestes pour les garder en forme.'),
        H('Les 3 gestes'),
        STEPS([
          ['Retourne-les', 'Lave toujours les chaussettes à l’envers. Les picots frottent ainsi contre le tissu et pas contre le tambour.'],
          ['30 °C maximum', 'Un cycle délicat à 30 °C suffit largement. Au-delà, le silicone durcit et finit par craqueler.'],
          ['Pas de sèche-linge', 'Laisse-les sécher à plat, à l’air libre. La chaleur du sèche-linge est le pire ennemi des picots.']
        ]),
        TIP('Glisse-les dans un filet de lavage : elles ne se perdront plus au fond de la machine (et ne finiront pas dans ta housse de couette).'),
        H('À quelle fréquence ?'),
        P('Une fois par semaine si ton chat les porte tous les jours, plus souvent s’il a la mauvaise idée de marcher dans sa gamelle. Avoir deux lots qui tournent, c’est le plus pratique.'),
        H('Quand les remplacer ?'),
        P('Quand les picots sont lisses et ne freinent plus, ou quand la maille se détend et que la chaussette ne tient plus. En moyenne, une paire bien entretenue dure plusieurs mois.')
      ] },
    { id: 'erreurs', cat: 'Enfilage', read: '4 min', date: '12 août 2026', gamme: 'essentielles',
      title: 'Les 5 erreurs à éviter les premières fois',
      excerpt: 'On les a toutes faites, pour que tu n’aies pas à les faire.',
      blocks: [
        P('Quand on a reçu nos tout premiers prototypes, on était tellement contents qu’on a enchaîné les gaffes. Moustache s’en souvient encore. Voici ce qu’on a appris.'),
        H('1. Les mettre toutes les quatre d’un coup'),
        P('Quatre pattes inconnues en même temps, c’est trop. Commence par les deux pattes avant, puis ajoute les autres au bout de quelques jours.'),
        H('2. Insister quand il se débat'),
        P('Si ton chat se tortille, gronde ou sort les griffes, arrête tout. Tu réessaieras plus tard. Le forcer, c’est s’assurer qu’il fuira la prochaine fois qu’il verra une chaussette.'),
        H('3. Choisir une taille trop grande'),
        P('« Comme ça, elle ne serrera pas. » Sauf qu’elle tourne, glisse et se retrouve picots vers le plafond. Pèse ton chat, et suis le guide des tailles.'),
        H('4. Les laisser toute la journée'),
        P('Les coussinets ont besoin de respirer, et ton chat a besoin de faire ses griffes. Quelques heures par jour suffisent, et jamais la nuit.'),
        H('5. Oublier la récompense'),
        P('Une friandise après chaque séance, c’est ce qui transforme « l’humain m’embête avec ses chaussettes » en « l’humain sort les chaussettes, il va y avoir du poulet ».'),
        TIP('Garde les chaussettes dans un endroit où ton chat peut les sentir quelques jours avant de les essayer. Un objet familier est beaucoup moins inquiétant.')
      ] },
    { id: 'hiver', cat: 'Maison', read: '3 min', date: '30 juillet 2026', gamme: 'flocon',
      title: 'Sols froids en hiver : garder les pattes au chaud',
      excerpt: 'Tapis, coins douillets, chaussettes en laine : comment aménager la maison quand il fait froid.',
      blocks: [
        P('Les chats adorent la chaleur : il n’y a qu’à voir ton chat suivre la tache de soleil d’une pièce à l’autre. En hiver, le carrelage froid peut le pousser à moins bouger, surtout s’il est âgé ou très mince.'),
        H('Repère les zones froides'),
        P('Cuisine, salle de bains, entrée : ce sont souvent les pièces au carrelage le plus froid. Observe où ton chat évite de s’arrêter, ce sont sûrement ces endroits-là.'),
        H('Aménage des étapes douillettes'),
        UL(['Un tapis épais près de sa gamelle, pour qu’il ne mange pas les pattes sur le froid.', 'Un plaid sur son trajet préféré, entre le canapé et la fenêtre.', 'Un panier surélevé, loin des courants d’air.', 'Une bouillotte tiède sous une couverture, les jours vraiment froids.']),
        H('Et les chaussettes ?'),
        P('Une maille épaisse avec un peu de laine garde les coussinets au chaud et lui permet de traverser la cuisine sans y penser. Choisis-les toujours avec des picots : un sol froid est souvent aussi un sol glissant.'),
        TIP('Ne laisse jamais ton chat dormir avec ses chaussettes près d’un radiateur ou d’une cheminée : il pourrait avoir trop chaud sans pouvoir s’en rendre compte.')
      ] }
  ];
  return { CATS, LIST, byId: id => LIST.find(a => a.id === id) || LIST[0] };
})();
