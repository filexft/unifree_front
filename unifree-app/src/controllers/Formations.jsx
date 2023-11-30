import Formation from "../models/Formation";

function Formations() {
  const Formation1 = Formation({
    title: "Formation Test",
    categorie: "Catestgorie",
    lesson: [{ title: "toto le goat" }, { title: "tata le goat" }],
    likeCount: 12,
    cover:
      "https://www.pole-emploi.fr/files/live/sites/corse/files/corse/Formation/formations-dispo-850x523.jpg",
  });

  const Formation2 = Formation({
    title: "FormationTest2",
    categorie: "Informatique",
    lesson: [
      {
        title: "toto le goat",
        content:
          "The first step is to decide what to work on. The work you choose needs to have three qualities: it has to be something you have a natural aptitude for, that you have a deep interest in, and that offers scope to do great work.\n\n In practice you don't have to worry much about the third criterion. Ambitious people are if anything already too conservative about it. So all you need to do is find something you have an aptitude for and great interest in. [1]\n\nThat sounds straightforward, but it's often quite difficult. When you're young you don't know what you're good at or what different kinds of work are like. Some kinds of work you end up doing may not even exist yet. So while some people know what they want to do at 14, most have to figure it out.\n\nThe way to figure out what to work on is by working. If you're not sure what to work on, guess. But pick something and get going. You'll probably guess wrong some of the time, but that's fine. It's good to know about multiple things; some of the biggest discoveries come from noticing connections between different fields.\n\nDevelop a habit of working on your own projects. Don't let 'work' mean something other people tell you to do. If you do manage to do great work one day, it will probably be on a project of your own. It may be within some bigger project, but you'll be driving your part of it.\n\nWhat should your projects be? Whatever seems to you excitingly ambitious. As you grow older and your taste in projects evolves, exciting and important will converge. At 7 it may seem excitingly ambitious to build huge things out of Lego, then at 14 to teach yourself calculus, till at 21 you're starting to explore unanswered questions in physics. But always preserve excitingness.\n\nThere's a kind of excited curiosity that's both the engine and the rudder of great work. It will not only drive you, but if you let it have its way, will also show you what to work on.\n\nWhat are you excessively curious about — curious to a degree that would bore most other people? That's what you're looking for.\n\nOnce you've found something you're excessively interested in, the next step is to learn enough about it to get you to one of the frontiers of knowledge. Knowledge expands fractally, and from a distance its edges look smooth, but once you learn enough to get close to one, they turn out to be full of gaps.\n\nThe next step is to notice them. This takes some skill, because your brain wants to ignore such gaps in order to make a simpler model of the world. Many discoveries have come from asking questions about things that everyone else took for granted. [2]\n\nIf the answers seem strange, so much the better. Great work often has a tincture of strangeness. You see this from painting to math. It would be affected to try to manufacture it, but if it appears, embrace it.\n\nBoldly chase outlier ideas, even if other people aren't interested in them — in fact, especially if they aren't. If you're excited about some possibility that everyone else ignores, and you have enough expertise to say precisely what they're all overlooking, that's as good a bet as you'll find. [3]\n\nFour steps: choose a field, learn enough to get to the frontier, notice gaps, explore promising ones. This is how practically everyone who's done great work has done it, from painters to physicists.\n\nSteps two and four will require hard work. It may not be possible to prove that you have to work hard to do great things, but the empirical evidence is on the scale of the evidence for mortality. That's why it's essential to work on something you're deeply interested in. Interest will drive you to work harder than mere diligence ever could.\n\nThe three most powerful motives are curiosity, delight, and the desire to do something impressive. Sometimes they converge, and that combination is the most powerful of all.\n\nThe big prize is to discover a new fractal bud. You notice a crack in the surface of knowledge, pry it open, and there's a whole world inside.\n\n\n\nLet's talk a little more about the complicated business of figuring out what to work on. The main reason it's hard is that you can't tell what most kinds of work are like except by doing them.",
      },
      { isQuizz: true, title: "totoQuizz", content: "totoquizz" },
      { title: "tata le goat" },
      { title: "tati le goat" },
      { title: "toma le goat" },
      {
        isQuizz: true,
        title: "Le foot",
        content: {
          questions: [
            {
              title: "Qui est le goat ?",
              answer: [
                { title: "CR7", isCorrect: "true" },
                { title: "Messi", isCorrect: "false" },
                { title: "Neymar", isCorrect: "false" },
                { title: "Mbappé", isCorrect: "false" },
              ],
            },
            {
              title: "Quel est le meilleur club ?",
              answer: [
                { title: "Real Madrid", isCorrect: "true" },
                { title: "Barça", isCorrect: "false" },
                { title: "FC Sochaux", isCorrect: "false" },
                { title: "OL", isCorrect: "false" },
              ],
            },
          ],
        },
      },
    ],
    likeCount: 82,
    cover:
      "https://www.batisafe.fr/wp-content/uploads/2020/04/POST_FORMATION-EN-LIGNE.jpg",
  });

  const FormationList = [
    Formation1,
    Formation2,
    Formation2,
    Formation2,
    Formation2,
    Formation2,
    Formation2,
  ];

  return FormationList;
}

export default Formations;
