# Relecture des animations (HyperFrames 0.9.8)

`npx hyperframes check` passe sur les 3 projets. Les avertissements restants sont voulus :
- `line_unread` sur les boucles : il n'y a pas de « dernière ligne », la vidéo repart au début ;
- `audio_none` : toutes les vidéos sont muettes, elles se lisent en silence sur le site ;
- `rotation_pivot_drift` : la paire tourne en sortant du cadre, c'est le mouvement prévu.

Vérifié image par image (`npx hyperframes snapshot`) :
- **hero** : la dernière image (14,35 s) est identique à la première, la boucle se raccorde sans saut. La couronne de pattes tourne de 72° par boucle et compte 10 pattes, ce qui assure un raccord parfait.
- **gamme** : les 6 rendus ont chacun leurs couleurs, leur nom et leur jauge d'adhérence, et le zoom tombe bien sur les picots. Les réglages sont dans `src/lib.mjs`, champ `focus`.
- **film** : textes corail assombris pour un contraste suffisant. La dernière carte reste 2 s à l'écran.

Rendu : `node tools/motion.mjs` (depuis la racine du dépôt).
