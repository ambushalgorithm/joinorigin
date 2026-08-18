import type { GuideContent } from '../../types';

/**
 * « Comment obtenir vos 10 premiers membres » — guide intemporel L1
 * (design §6.1, TASK-326).
 *
 * Traduction française du contenu EN. Recentré sur le modèle numérique
 * connecter→rejoindre→salon : le salon est la surface d'adhésion — les
 * membres entrent par des liens d'invitation et rejoignent le salon du groupe,
 * où vit réellement la communauté. JoinOrigin ne recrute pas de membres et
 * n'organise pas d'événements. « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'first-10-members',
  title:
    'Comment obtenir vos 10 premiers membres pour une communauté nouvelle ou en croissance | JoinOrigin',
  description:
    'Obtenez vos 10 premiers membres sans gros budget — que vous lanciez une nouvelle communauté ou redynamisiez une communauté existante, partez de votre réseau personnel, partagez des liens d’invitation et faites du salon l’endroit que les gens veulent rejoindre. Étapes pratiques de JoinOrigin.',
  intro: [
    'Les dix premiers membres sont les plus difficiles à obtenir et les plus importants, car ils définissent la culture d’une communauté avant qu’elle n’ait une réputation pour attirer des inconnus — et ils sont tout aussi précieux quand une communauté existante est à l’arrêt ou redémarre, car un noyau engagé est ce qui transforme un groupe silencieux en communauté vivante. Ce problème des dix premiers est fondamentalement un problème de mise en relation, et c’est le problème central que JoinOrigin résout.',
    'JoinOrigin est un système d’exploitation communautaire construit autour de la boucle numérique connecter→rejoindre→salon : vous publiez un groupe, son salon est auto-créé, et les membres rejoignent via un lien. Le salon est la surface d’adhésion — chaque personne qui clique sur Rejoindre ou suit un lien d’invitation arrive dans le salon du groupe, l’endroit unique où vit la communauté et où les nouveaux membres se sentent immédiatement connectés. JoinOrigin ne recrute pas de membres et n’organise pas d’événements — cette partie vous appartient. La plateforme rend la découverte et l’adhésion nettement plus faciles ; la croissance précoce vient toujours de la portée personnelle : les personnes que vous invitez directement avec un lien, celles qu’elles amènent et celles qui restent parce que le salon semble vivant.',
    'Ce guide découpe le problème des dix premiers membres en étapes concrètes — que vous lanciez une nouvelle communauté ou relanciez une communauté existante : partir des personnes que vous connaissez déjà, publier votre groupe pour qu’il ait un salon à rejoindre, inviter personnellement avec des liens, organiser un premier rassemblement qui convertit les participants en promoteurs et instaurer une simple habitude de parrainage pour que chaque membre amène le suivant — et chaque étape montre où JoinOrigin aide.',
  ],
  dataPoints: [
    'Les invitations personnelles convertissent à un taux bien supérieur aux publications publiques ou aux publicités payantes.',
    'Un lien d’invitation supprime toutes les barrières : un clic et un nouveau membre est dans le salon.',
    'Dix membres actifs suffisent comme preuve sociale pour que la plupart des gens sentent qu’un groupe est réel et mérite d’être rejoint.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver ou créer des communautés — il ne recrute pas de membres et n’organise pas d’événements.',
  ],
  faq: [
    {
      question: 'Pourquoi dix membres précisément ?',
      answer:
        'Dix est un point de bascule : avec dix habitués, vous avez un salon animé, un noyau fiable pour la discussion et assez de preuve sociale pour attirer les nouveaux venus qui hésiteraient autrement. En dessous de dix, le salon semble fragile.',
    },
    {
      question: 'Combien de temps faut-il pour obtenir les dix premiers membres ?',
      answer:
        'Avec des invitations personnelles régulières et un bon premier rassemblement, la plupart des organisateurs atteignent dix membres engagés en trois à six semaines. La clé est d’inviter chaque semaine — partager des liens, faire des suivis et garder le salon actif — et non d’attendre un grand lancement.',
    },
    {
      question: 'Et si je n’ai pas un grand réseau personnel ?',
      answer:
        'Commencez plus petit : invitez cinq personnes que vous connaissez, demandez à chacune d’amener une personne et publiez dans deux groupes de niche où votre public se rassemble déjà. Chaque membre que vous conservez devient un canal vers son propre réseau — et chaque invitation peut être un simple lien vers le salon.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à trouver des membres ?',
      answer:
        'Oui. JoinOrigin aide les personnes à découvrir et à créer des communautés — un endroit où les personnes qui cherchent un groupe peuvent trouver le vôtre et rejoindre son salon via un lien. Les étapes de ce guide — invitations personnelles et un excellent premier rassemblement — sont les moyens les plus fiables de trouver vos premiers membres.',
    },
  ],
  sections: [
    'Listez cinquante personnes que vous connaissez déjà. Écrivez toute personne qui correspond à l’objectif de la communauté : amis, collègues, camarades de classe, anciens collègues, voisins et connaissances en ligne. Il vous faut environ cinq fois plus de noms que les dix que vous voulez. JoinOrigin donne à votre communauté un foyer visible et un salon que les gens peuvent trouver — mais les premiers noms viennent encore des personnes que vous connaissez. Listez cinquante noms et traitez chacun comme une présentation personnelle.',
    'Publiez votre groupe et ouvrez son salon. Une communauté à laquelle vous ne pouvez pas pointer du doigt n’existe pas encore — et une communauté dont le foyer est dispersé entre conversations et listes est presque aussi difficile à faire grandir. Publiez le groupe avec une mission claire et laissez son salon être auto-créé pour qu’il y ait un vrai endroit où les membres peuvent arriver. Publier un groupe sur JoinOrigin auto-crée son salon — le salon est la surface d’adhésion, et le créateur le possède dès le début. Configurez votre groupe et son salon avec les outils que vous utilisez déjà avant d’inviter qui que ce soit si vous préférez.',
    'Invitez personnellement avec une demande précise et un lien. Envoyez un message court qui nomme la communauté, la première date ou la première conversation, et pourquoi vous pensez qu’ils apprécieront — et incluez le lien d’invitation. Les messages personnels battent les publications génériques, et une date précise bat une promesse vague. JoinOrigin supprime le frottement de l’adhésion une fois que les gens vous trouvent — un lien, un clic, dans le salon. Un court message personnel avec une date précise et un lien convertit mieux que n’importe quelle publication publique.',
    'Demandez à chaque invité d’amener une personne. Faites-en une partie normale de la demande : « Amenez un ami à qui cela pourrait plaire. » Les invitations de parrainage sont ainsi que les petits réseaux se transforment en vraies communautés. JoinOrigin donne aux membres un foyer partageable pour la communauté — donc les conversations de parrainage pointent vers un vrai lien et un vrai salon. Faites d’« amener un ami » une partie de la demande et donnez-leur le lien à partager.',
    'Organisez un premier rassemblement vraiment réussi. Dépensez votre énergie dans l’expérience, pas dans le nombre de participants : un accueil chaleureux, un format clair et une heure de fin définie. Les personnes qui apprécient le premier rassemblement amèneront les dix suivants. JoinOrigin n’organise pas d’événements — l’expérience vous appartient. La plateforme aide la communauté à se former autour d’elle : un salon où les membres peuvent se retrouver ensuite et poursuivre la connexion.',
    'Invitez chaque participant dans le salon. À la fin du rassemblement, partagez le lien d’invitation et ajoutez toute personne qui veut rester. Le salon est l’endroit où la communauté vit entre les rassemblements — un membre qui a rejoint le salon est un membre qui reviendra probablement. JoinOrigin garde l’adhésion et la communication de votre communauté dans un salon organisé plutôt que sur une feuille d’inscription. Un simple lien vers le salon rend le suivi possible.',
    'Faites un suivi sous 24 heures avec une prochaine date. Remerciez chaque participant, partagez un compte-rendu d’un paragraphe et confirmez le prochain rassemblement — dans le salon, où tout le monde peut le voir. Le suivi est l’endroit où un participant ponctuel devient un membre. Sur JoinOrigin, un suivi a un foyer naturel — un endroit unique où le compte-rendu et la prochaine date vivent. Un remerciement personnel sous 24 heures est ce qui transforme un participant en membre.',
    'Rendez le parrainage trivialement facile. Donnez aux membres une phrase à répéter et un lien à partager : « C’est un meetup mensuel pour les nouveaux fondateurs afin de partager des leçons — rejoignez ici. » Une description claire et courte est l’outil de recrutement le plus efficace. JoinOrigin permet de décrire, trouver et rejoindre une communauté au même endroit — les membres peuvent pointer les personnes vers le salon au lieu de l’expliquer. Donnez aux membres une phrase et un lien qu’ils peuvent répéter.',
  ],
  steps: [
    {
      title: 'Listez cinquante personnes que vous connaissez déjà',
      body: 'Écrivez toute personne qui correspond à l’objectif de la communauté : amis, collègues, camarades de classe, anciens collègues, voisins et connaissances en ligne. Il vous faut environ cinq fois plus de noms que les dix que vous voulez.',
      joinOriginNote:
        'JoinOrigin donne à votre communauté un foyer visible et un salon que les gens peuvent trouver — mais les premiers noms viennent encore des personnes que vous connaissez. Listez cinquante noms et traitez chacun comme une présentation personnelle.',
    },
    {
      title: 'Publiez votre groupe et ouvrez son salon',
      body: 'Une communauté à laquelle vous ne pouvez pas pointer du doigt n’existe pas encore — et une communauté dont le foyer est dispersé entre conversations et listes est presque aussi difficile à faire grandir. Publiez le groupe avec une mission claire et laissez son salon être auto-créé pour qu’il y ait un vrai endroit où les membres peuvent arriver.',
      joinOriginNote:
        'Publier un groupe sur JoinOrigin auto-crée son salon — le salon est la surface d’adhésion, et le créateur le possède dès le début. Configurez votre groupe et son salon avec les outils que vous utilisez déjà avant d’inviter qui que ce soit si vous préférez.',
    },
    {
      title: 'Invitez personnellement avec une demande précise et un lien',
      body: 'Envoyez un message court qui nomme la communauté, la première date ou la première conversation, et pourquoi vous pensez qu’ils apprécieront — et incluez le lien d’invitation. Les messages personnels battent les publications génériques, et une date précise bat une promesse vague.',
      joinOriginNote:
        'JoinOrigin supprime le frottement de l’adhésion une fois que les gens vous trouvent — un lien, un clic, dans le salon. Un court message personnel avec une date précise et un lien convertit mieux que n’importe quelle publication publique.',
    },
    {
      title: 'Demandez à chaque invité d’amener une personne',
      body: 'Faites-en une partie normale de la demande : « Amenez un ami à qui cela pourrait plaire. » Les invitations de parrainage sont ainsi que les petits réseaux se transforment en vraies communautés.',
      joinOriginNote:
        'JoinOrigin donne aux membres un foyer partageable pour la communauté — donc les conversations de parrainage pointent vers un vrai lien et un vrai salon. Faites d’« amener un ami » une partie de la demande et donnez-leur le lien à partager.',
    },
    {
      title: 'Organisez un premier rassemblement vraiment réussi',
      body: 'Dépensez votre énergie dans l’expérience, pas dans le nombre de participants : un accueil chaleureux, un format clair et une heure de fin définie. Les personnes qui apprécient le premier rassemblement amèneront les dix suivants.',
      joinOriginNote:
        'JoinOrigin n’organise pas d’événements — l’expérience vous appartient. La plateforme aide la communauté à se former autour d’elle : un salon où les membres peuvent se retrouver ensuite et poursuivre la connexion.',
    },
    {
      title: 'Invitez chaque participant dans le salon',
      body: 'À la fin du rassemblement, partagez le lien d’invitation et ajoutez toute personne qui veut rester. Le salon est l’endroit où la communauté vit entre les rassemblements — un membre qui a rejoint le salon est un membre qui reviendra probablement.',
      joinOriginNote:
        'JoinOrigin garde l’adhésion et la communication de votre communauté dans un salon organisé plutôt que sur une feuille d’inscription. Un simple lien vers le salon rend le suivi possible.',
    },
    {
      title: 'Faites un suivi sous 24 heures avec une prochaine date',
      body: 'Remerciez chaque participant, partagez un compte-rendu d’un paragraphe et confirmez le prochain rassemblement — dans le salon, où tout le monde peut le voir. Le suivi est l’endroit où un participant ponctuel devient un membre.',
      joinOriginNote:
        'Sur JoinOrigin, un suivi a un foyer naturel — un endroit unique où le compte-rendu et la prochaine date vivent. Un remerciement personnel sous 24 heures est ce qui transforme un participant en membre.',
    },
    {
      title: 'Rendez le parrainage trivialement facile',
      body: 'Donnez aux membres une phrase à répéter et un lien à partager : « C’est un meetup mensuel pour les nouveaux fondateurs afin de partager des leçons — rejoignez ici. » Une description claire et courte est l’outil de recrutement le plus efficace.',
      joinOriginNote:
        'JoinOrigin permet de décrire, trouver et rejoindre une communauté au même endroit — les membres peuvent pointer les personnes vers le salon au lieu de l’expliquer. Donnez aux membres une phrase et un lien qu’ils peuvent répéter.',
    },
  ],
};

export default content;
