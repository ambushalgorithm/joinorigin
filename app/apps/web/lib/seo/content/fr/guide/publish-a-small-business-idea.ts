import type { GuideContent } from '../../types';

/**
 * « Comment publier une idée de petite entreprise » — guide intemporel L1
 * (design §6.1, TASK-353).
 *
 * Traduction française du contenu EN. Écrit sur le flux d'écran produit §2 :
 * publier une idée de petite entreprise → page publique → Rejoindre via lien
 * → salon auto-créé À LA PUBLICATION → le créateur contrôle le salon →
 * croissance fil/invitations. La page d'idée est la promesse de vitrine ; le
 * salon est l'endroit où clients, collaborateurs et premiers croyants se
 * rassemblent autour de l'entreprise. « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'publish-a-small-business-idea',
  title: 'Comment publier une idée de petite entreprise : page d’idée + salon | JoinOrigin',
  description:
    'Publiez une idée de petite entreprise sur JoinOrigin — que vous lanciez une nouvelle entreprise ou qu’une entreprise existante partage ce qu’elle propose — rédigez une page d’idée publique, ouvrez son salon automatiquement et invitez les clients et collaborateurs qui veulent la voir se réaliser. Étapes pratiques de JoinOrigin.',
  intro: [
    'Les petites entreprises commencent souvent de la même façon — quelqu’un remarque un vrai problème dans son quartier, son lieu de travail ou son loisir, et ne peut plus s’arrêter de penser à la solution — mais beaucoup d’autres sont déjà en activité : un magasin qui tourne, un service qui fonctionne, un produit avec des clients. Que votre entreprise soit encore une étincelle ou serve déjà des gens, l’étape suivante est la même : transformer ce que vous avez en quelque chose que les autres peuvent voir, réagir et rejoindre. Une petite entreprise a besoin d’un foyer public, et elle a besoin de monde autour — avant d’avoir besoin d’une vitrine, et longtemps après en avoir une.',
    'La boucle JoinOrigin fonctionne ainsi : vous publiez une idée de petite entreprise, sa page d’idée publique apparaît, et son salon est auto-créé au moment de la publication. Les personnes découvrent la page ou suivent un lien, rejoindre se fait en un clic, et elles arrivent dans le salon — un salon Matrix contrôlé par le créateur où clients, collaborateurs et premiers croyants peuvent poser des questions, partager des retours et s’impliquer. Le créateur possède le salon dès la seconde zéro et décide qui rejoint et ce qui se passe à l’intérieur.',
    'Ce guide parcourt la publication d’une idée de petite entreprise comme on ouvrirait un magasin : nommer le client et le problème, écrire la page d’idée comme une vitrine, la publier et ouvrir le salon, partager la page avec votre réseau local, inviter les premiers clients et collaborateurs, écouter dans le salon, affiner l’offre à partir de retours réels et faire grandir le salon jusqu’à votre première base de clients.',
  ],
  dataPoints: [
    'Les idées de petites entreprises les plus claires partent d’un client nommé et d’un problème précis, pas d’un public général.',
    'Sur JoinOrigin, publier une idée auto-crée son salon — l’entreprise a un endroit pour les clients et collaborateurs dès le début.',
    'Un lien d’invitation est l’invitation la plus simple : un lien, un clic, et une personne intéressée est dans le salon.',
    'JoinOrigin est un système d’exploitation communautaire qui aide les personnes à trouver des idées et les personnes qui les portent — publiez votre idée et son salon s’ouvre immédiatement.',
  ],
  faq: [
    {
      question:
        'En quoi une idée de petite entreprise diffère-t-elle d’une page d’idée classique ?',
      answer:
        'Le format de page est le même, mais la promesse est plus tranchée : un client, un problème et une offre. Là où une idée générale invite des collaborateurs, une page d’idée de petite entreprise invite les premiers clients et les croyants locaux — des personnes qui achèteraient réellement, recommanderaient ou aideraient à démarrer ou à faire grandir ce qui tourne déjà.',
    },
    {
      question: 'Quand le salon est-il créé pour mon idée d’entreprise ?',
      answer:
        'Le salon est auto-créé au moment où vous publiez l’idée. Le créateur possède le salon dès la seconde zéro et peut inviter, retirer et attribuer des rôles dans Element. Vous pouvez aussi ouvrir un salon avec les outils que vous utilisez déjà et inviter les personnes qui se soucient du problème.',
    },
    {
      question: 'Qui devrait rejoindre le salon d’une idée de petite entreprise ?',
      answer:
        'Les premiers clients, les personnes possédant la compétence qui vous manque et les locaux qui peuvent vous recommander. Le salon est l’endroit où vous testez la demande, affinez l’offre et trouvez les premiers croyants — avant de dépenser de l’argent en stocks, en baux ou en marketing.',
    },
    {
      question: 'Que doit promettre la page d’idée ?',
      answer:
        'Un client nommé, un problème et ce que vous prévoyez d’offrir. Soyez honnête sur le stade — « je teste cette idée et je veux parler aux personnes qui ressentent ce problème » est une promesse forte. La page décide si les bonnes personnes cliquent sur Rejoindre.',
    },
    {
      question:
        'JoinOrigin peut-il m’aider à publier une idée de petite entreprise dès aujourd’hui ?',
      answer:
        'Oui. Publier une idée sur JoinOrigin crée sa page et son salon de manière atomique — le salon s’ouvre au moment où vous publiez, et vous le contrôlez dès le début. Publiez l’idée quelque part de public et ouvrez un salon de discussion ; chaque nouveau membre que vous invitez étend votre portée.',
    },
  ],
  sections: [
    'Nommez le client et le problème. Avant d’écrire quoi que ce soit, nommez la personne précise qui ressent ce problème et décrivez le problème dans ses mots. Une petite entreprise réussit quand elle sert bien un vrai besoin. JoinOrigin est conçu autour de pages d’idées découvrables, et les pages les plus claires partent d’un client nommé. Écrivez le client et le problème et testez-les sur trois personnes qui correspondent.',
    'Écrivez la page d’idée comme une vitrine. La page doit montrer ce que vous proposez, à qui cela s’adresse, ce que cela coûte en temps ou en argent et à quel stade en est l’idée. Restez concret — un pop-up, un produit, un service, un magasin. Publier une idée sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Rédigez la page comme un court billet public et affinez-la avec les retours.',
    'Publiez l’idée et ouvrez son salon. Publier est le moment où l’idée d’entreprise devient découvrable. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède. Sur JoinOrigin, la page, le salon et le lien d’invitation sont une seule publication. Publiez l’idée publiquement et ouvrez un salon pour la conversation autour d’elle.',
    'Partagez la page avec votre réseau local. Les petites entreprises grandissent grâce à la portée locale. Partagez la page d’idée avec les voisins, collègues, groupes locaux et toute personne qui connaît le problème de première main. Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre idée suffit.',
    'Invitez les premiers clients et collaborateurs. Invitez les personnes qui achèteraient ou aideraient réellement : clients potentiels, quelqu’un avec une compétence qui vous manque, un mentor ou un organisateur local. JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une idée peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque personne qui rejoint devient un canal vers son propre réseau.',
    'Écoutez dans le salon. Demandez aux personnes qui rejoignent comment elles utiliseraient l’offre, combien elles paieraient et ce qui les arrête. Le salon est l’endroit où la vraie demande se manifeste — ou non. JoinOrigin ne mène pas ces conversations ; le salon vous appartient. La plateforme donne à l’idée d’entreprise un salon où l’intérêt devient retour, et le créateur possède ce salon. Interrogez directement les membres dans le salon.',
    'Affinez l’offre à partir de retours réels. Ajustez le prix, le périmètre, le canal ou la promesse selon ce que disent les personnes qui rejoignent. Les petites entreprises se construisent par petites itérations. JoinOrigin conserve la mémoire partagée d’une idée au même endroit — notes, décisions et retours dans le salon — pour que le raffinement soit visible au lieu d’être perdu. Changez une chose à la fois et observez la réponse.',
    'Faites grandir le salon jusqu’à votre première base de clients. Continuez à inviter, à partager des mises à jour et à garder le salon vivant à mesure que l’offre se précise. Les personnes dans le salon sont vos premiers clients et vos premiers promoteurs. JoinOrigin garde votre page d’idée et son salon connectés à mesure que l’entreprise grandit — un seul endroit où la promesse, la conversation et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
  ],
  steps: [
    {
      title: 'Nommez le client et le problème',
      body: 'Avant d’écrire quoi que ce soit, nommez la personne précise qui ressent ce problème et décrivez le problème dans ses mots. Une petite entreprise réussit quand elle sert bien un vrai besoin.',
      joinOriginNote:
        'JoinOrigin est conçu autour de pages d’idées découvrables, et les pages les plus claires partent d’un client nommé. Écrivez le client et le problème et testez-les sur trois personnes qui correspondent.',
    },
    {
      title: 'Écrivez la page d’idée comme une vitrine',
      body: 'La page doit montrer ce que vous proposez, à qui cela s’adresse, ce que cela coûte en temps ou en argent et à quel stade en est l’idée. Restez concret — un pop-up, un produit, un service, un magasin.',
      joinOriginNote:
        'Publier une idée sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Rédigez la page comme un court billet public et affinez-la avec les retours.',
    },
    {
      title: 'Publiez l’idée et ouvrez son salon',
      body: 'Publier est le moment où l’idée d’entreprise devient découvrable. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède.',
      joinOriginNote:
        'Sur JoinOrigin, la page, le salon et le lien d’invitation sont une seule publication. Publiez l’idée publiquement et ouvrez un salon pour la conversation autour d’elle.',
    },
    {
      title: 'Partagez la page avec votre réseau local',
      body: 'Les petites entreprises grandissent grâce à la portée locale. Partagez la page d’idée avec les voisins, collègues, groupes locaux et toute personne qui connaît le problème de première main.',
      joinOriginNote:
        'Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre idée suffit.',
    },
    {
      title: 'Invitez les premiers clients et collaborateurs',
      body: 'Invitez les personnes qui achèteraient ou aideraient réellement : clients potentiels, quelqu’un avec une compétence qui vous manque, un mentor ou un organisateur local.',
      joinOriginNote:
        'JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une idée peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque personne qui rejoint devient un canal vers son propre réseau.',
    },
    {
      title: 'Écoutez dans le salon',
      body: 'Demandez aux personnes qui rejoignent comment elles utiliseraient l’offre, combien elles paieraient et ce qui les arrête. Le salon est l’endroit où la vraie demande se manifeste — ou non.',
      joinOriginNote:
        'JoinOrigin ne mène pas ces conversations ; le salon vous appartient. La plateforme donne à l’idée d’entreprise un salon où l’intérêt devient retour, et le créateur possède ce salon. Interrogez directement les membres dans le salon.',
    },
    {
      title: 'Affinez l’offre à partir de retours réels',
      body: 'Ajustez le prix, le périmètre, le canal ou la promesse selon ce que disent les personnes qui rejoignent. Les petites entreprises se construisent par petites itérations.',
      joinOriginNote:
        'JoinOrigin conserve la mémoire partagée d’une idée au même endroit — notes, décisions et retours dans le salon — pour que le raffinement soit visible au lieu d’être perdu. Changez une chose à la fois et observez la réponse.',
    },
    {
      title: 'Faites grandir le salon jusqu’à votre première base de clients',
      body: 'Continuez à inviter, à partager des mises à jour et à garder le salon vivant à mesure que l’offre se précise. Les personnes dans le salon sont vos premiers clients et vos premiers promoteurs.',
      joinOriginNote:
        'JoinOrigin garde votre page d’idée et son salon connectés à mesure que l’entreprise grandit — un seul endroit où la promesse, la conversation et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
    },
  ],
};

export default content;
