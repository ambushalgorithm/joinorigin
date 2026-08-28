import type { GuideContent } from '../../types';

/**
 * « Comment garder une communauté active » — guide intemporel L1
 * (design §6.1, TASK-326).
 *
 * Traduction française du contenu EN. Recentré sur le modèle numérique
 * connecter→rejoindre→salon : le salon et son activité (qui alimente le fil)
 * sont la surface de rétention — la communauté vit dans le salon entre les
 * rassemblements, et les événements en présentiel sont une conséquence en
 * aval. JoinOrigin ne gère pas les communautés et n'organise pas d'événements.
 * « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'keep-an-origin-active',
  title: 'Comment garder un Origin actif et engagé | JoinOrigin',
  description:
    'Gardez votre Origin actif — qu’il soit nouveau et cherche son rythme ou établi et en train de s’éteindre — utilisez le salon et son fil comme surface de rétention, créez des rituels, partagez la charge d’organisation et ouvrez de petits chemins de contribution. Étapes pratiques de JoinOrigin.',
  intro: [
    'La plupart des communautés ne meurent pas d’un mauvais lancement ; elles meurent du silence — le moment où les gens cessent de se sentir connectés et s’éloignent en douce. Garder une communauté active est donc un problème de mise en relation : les gens restent quand ils se sentent appartenir, et ils se sentent appartenir quand il existe un endroit visible et organisé où la communauté vit. C’est exactement ce qu’est JoinOrigin — et les mêmes mécanismes s’appliquent que la communauté ait quelques semaines et cherche encore son rythme, ou des années et glisse vers le silence.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver, créer et organiser des Origins — et dans son modèle numérique, le salon est la surface de rétention : un salon Matrix contrôlé par le créateur où rituels, mises à jour et contributions restent visibles, et dont l’activité alimente le fil qui garde les membres connectés entre les rassemblements. Les événements en présentiel restent une conséquence en aval d’une communauté formée, jamais le cœur — le salon et son fil sont ce qui maintient la communauté vivante au quotidien. JoinOrigin ne gère pas les communautés et n’organise pas d’événements — la plateforme garde les communautés connectées entre les rassemblements, et l’organisation vous appartient.',
    'Ce guide couvre les mécaniques pratiques d’une communauté saine et active — des premières semaines après le lancement à une communauté qui fonctionne depuis des années : établir des rituels qui transforment la participation en habitude, créer des artefacts partagés dans le salon, répartir la charge d’organisation pour qu’aucune personne ne s’épuise, ouvrir de petits chemins de contribution pour que chaque membre puisse ajouter de la valeur, et mesurer les signaux qui vous disent si la communauté est réellement vivante. Chaque étape correspond à la façon dont JoinOrigin aide.',
  ],
  dataPoints: [
    'Les rituels récurrents — un rythme de salon fixe, un format régulier, un artefact partagé — transforment l’intérêt en habitude.',
    'L’activité du salon entre les rassemblements est ce qui garde les membres connectés ; le silence est ce qui les éloigne.',
    'Les petits chemins de contribution (une note épinglée, un hôte tournant, un coup de projecteur sur un membre) donnent aux membres le sentiment d’être propriétaires.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver, créer et organiser des Origins ; il ne gère pas les communautés et n’organise pas d’événements.',
  ],
  faq: [
    {
      question: 'À quelle fréquence une communauté active devrait-elle se réunir ?',
      answer:
        'Mensuel est la base la plus durable pour les rassemblements en présentiel ; le salon devrait être actif chaque semaine — points, mises à jour et petites conversations. La régularité compte plus que la fréquence : un rythme de salon hebdomadaire fiable bat un rythme sporadique.',
    },
    {
      question: 'Que faire quand l’engagement baisse ?',
      answer:
        'Ne paniquez pas et ne lancez pas une grande campagne. Demandez directement aux membres ce dont ils ont besoin, publiez une question simple dans le salon, organisez un rassemblement plus petit et plus simple, et déléguez un rôle à un membre. De petits changements réactifs ravivent l’engagement plus vite que le volume.',
    },
    {
      question: 'Comment garder les membres engagés entre les rassemblements ?',
      answer:
        'Créez des points de contact à faible effort dans le salon : un document partagé, un coup de projecteur sur un membre, un fil de point régulier ou une mise à jour « qui travaille sur quoi ». L’objectif est un battement visible dans le salon et son fil, pas des notifications constantes.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à garder mon Origin actif ?',
      answer:
        'Oui. JoinOrigin aide les personnes à trouver, créer et organiser des Origins — un salon et un fil où la communauté reste visible entre les rassemblements. Les pratiques de ce guide — rituels, rôles partagés et petites contributions — fonctionnent sur la plateforme et avec les outils que vous possédez déjà.',
    },
  ],
  sections: [
    'Définissez un rituel central. Choisissez une pratique récurrente sur laquelle tout le monde peut compter : une réunion mensuelle, un point hebdomadaire, une lecture partagée ou une mise à jour de projet. Les rituels créent le battement qui maintient une communauté vivante — et dans une communauté numérique d’abord, le rituel se déroule dans le salon. Sur JoinOrigin, le rythme d’une communauté est visible dans un salon organisé — les membres savent toujours quel est le prochain rituel. Choisissez une pratique récurrente et protégez-la.',
    'Créez un artefact partagé dans le salon. Lancez une note ou un document épinglé qui capture ce que fait la communauté — comptes-rendus de réunion, présentations de membres, mises à jour de projets. Un artefact vivant garde les membres orientés entre les rassemblements. JoinOrigin est le salon partagé où les notes, présentations et mises à jour vivent aux côtés de la communauté — un artefact vivant par conception. Épinglez un simple document partagé dans le salon.',
    'Répartissez la charge d’organisation. Recrutez deux ou trois co-animateurs ou bénévoles et faites tourner les petits rôles : accueil, prise de notes, choix des sujets, contact avec le lieu. La propriété partagée est la meilleure défense contre l’épuisement. JoinOrigin n’organise pas et ne gère pas les communautés — la propriété partagée vous appartient de construire. La plateforme donne aux bénévoles et aux organisateurs un salon pour se coordonner. Recrutez deux ou trois co-animateurs et faites tourner les rôles.',
    'Ouvrez de petits chemins de contribution. Donnez aux membres des moyens d’ajouter de la valeur sans gros engagements : un coup de projecteur sur un membre, un animateur de discussion tournant, une playlist ou une liste de lecture partagée, ou une section « aide recherchée » épinglée dans le salon. Sur JoinOrigin, les membres ont des moyens visibles de contribuer — une communauté où ajouter de la valeur est facile. Les coups de projecteur sur les membres et les animateurs tournants créent la même propriété.',
    'Gardez un rythme de communication prévisible dans le salon. Envoyez une courte mise à jour par semaine ou par mois à horaire fixe, publiée dans le salon et alimentant le fil. La prévisibilité construit la confiance ; le silence construit l’éloignement. JoinOrigin garde le battement de la communauté dans un salon — une mise à jour, à horaire fixe, où tout le monde peut la voir. Une courte mise à jour hebdomadaire construit la confiance.',
    'Surveillez les signaux d’engagement. Suivez l’activité du salon, l’assiduité répétée et le taux de contribution. Une communauté saine fait croître son taux de retour avant sa taille totale — concentrez-vous sur les membres qui reviennent dans le salon. Sur JoinOrigin, les organisateurs peuvent voir comment leur communauté se porte dans un salon et un fil organisés. Suivez l’activité, l’assiduité répétée et le taux de contribution avec une simple feuille de calcul.',
    'Demandez régulièrement des retours dans le salon. Utilisez un simple sondage à une question après chaque rassemblement : qu’avez-vous aimé, que changeriez-vous. Agissez sur les réponses et dites à la communauté ce que vous avez changé. JoinOrigin collecte et conserve les retours avec la communauté à laquelle ils appartiennent — dans le salon. Un sondage à une question après chaque rassemblement fonctionne — puis agissez sur les réponses.',
    'Adaptez le format à mesure que la communauté mûrit. Ce qui a fonctionné pour dix membres peut ne pas convenir à cinquante. Revisitez le format, le lieu et la cadence chaque trimestre, et évoluez délibérément au lieu de vous accrocher par habitude. JoinOrigin aide les communautés à évoluer — un salon où les changements de format et les annonces atteignent tout le monde. Revisitez votre format et votre lieu chaque trimestre, délibérément.',
  ],
  steps: [
    {
      title: 'Définissez un rituel central',
      body: 'Choisissez une pratique récurrente sur laquelle tout le monde peut compter : une réunion mensuelle, un point hebdomadaire, une lecture partagée ou une mise à jour de projet. Les rituels créent le battement qui maintient une communauté vivante — et dans une communauté numérique d’abord, le rituel se déroule dans le salon.',
      joinOriginNote:
        'Sur JoinOrigin, le rythme d’une communauté est visible dans un salon organisé — les membres savent toujours quel est le prochain rituel. Choisissez une pratique récurrente et protégez-la.',
    },
    {
      title: 'Créez un artefact partagé dans le salon',
      body: 'Lancez une note ou un document épinglé qui capture ce que fait la communauté — comptes-rendus de réunion, présentations de membres, mises à jour de projets. Un artefact vivant garde les membres orientés entre les rassemblements.',
      joinOriginNote:
        'JoinOrigin est le salon partagé où les notes, présentations et mises à jour vivent aux côtés de la communauté — un artefact vivant par conception. Épinglez un simple document partagé dans le salon.',
    },
    {
      title: 'Répartissez la charge d’organisation',
      body: 'Recrutez deux ou trois co-animateurs ou bénévoles et faites tourner les petits rôles : accueil, prise de notes, choix des sujets, contact avec le lieu. La propriété partagée est la meilleure défense contre l’épuisement.',
      joinOriginNote:
        'JoinOrigin n’organise pas et ne gère pas les communautés — la propriété partagée vous appartient de construire. La plateforme donne aux bénévoles et aux organisateurs un salon pour se coordonner. Recrutez deux ou trois co-animateurs et faites tourner les rôles.',
    },
    {
      title: 'Ouvrez de petits chemins de contribution',
      body: 'Donnez aux membres des moyens d’ajouter de la valeur sans gros engagements : un coup de projecteur sur un membre, un animateur de discussion tournant, une playlist ou une liste de lecture partagée, ou une section « aide recherchée » épinglée dans le salon.',
      joinOriginNote:
        'Sur JoinOrigin, les membres ont des moyens visibles de contribuer — une communauté où ajouter de la valeur est facile. Les coups de projecteur sur les membres et les animateurs tournants créent la même propriété.',
    },
    {
      title: 'Gardez un rythme de communication prévisible dans le salon',
      body: 'Envoyez une courte mise à jour par semaine ou par mois à horaire fixe, publiée dans le salon et alimentant le fil. La prévisibilité construit la confiance ; le silence construit l’éloignement.',
      joinOriginNote:
        'JoinOrigin garde le battement de la communauté dans un salon — une mise à jour, à horaire fixe, où tout le monde peut la voir. Une courte mise à jour hebdomadaire construit la confiance.',
    },
    {
      title: 'Surveillez les signaux d’engagement',
      body: 'Suivez l’activité du salon, l’assiduité répétée et le taux de contribution. Une communauté saine fait croître son taux de retour avant sa taille totale — concentrez-vous sur les membres qui reviennent dans le salon.',
      joinOriginNote:
        'Sur JoinOrigin, les organisateurs peuvent voir comment leur communauté se porte dans un salon et un fil organisés. Suivez l’activité, l’assiduité répétée et le taux de contribution avec une simple feuille de calcul.',
    },
    {
      title: 'Demandez régulièrement des retours dans le salon',
      body: 'Utilisez un simple sondage à une question après chaque rassemblement : qu’avez-vous aimé, que changeriez-vous. Agissez sur les réponses et dites à la communauté ce que vous avez changé.',
      joinOriginNote:
        'JoinOrigin collecte et conserve les retours avec la communauté à laquelle ils appartiennent — dans le salon. Un sondage à une question après chaque rassemblement fonctionne — puis agissez sur les réponses.',
    },
    {
      title: 'Adaptez le format à mesure que la communauté mûrit',
      body: 'Ce qui a fonctionné pour dix membres peut ne pas convenir à cinquante. Revisitez le format, le lieu et la cadence chaque trimestre, et évoluez délibérément au lieu de vous accrocher par habitude.',
      joinOriginNote:
        'JoinOrigin aide les communautés à évoluer — un salon où les changements de format et les annonces atteignent tout le monde. Revisitez votre format et votre lieu chaque trimestre, délibérément.',
    },
  ],
};

export default content;
