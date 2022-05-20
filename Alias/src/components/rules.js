import { rotateMainCard } from "../App";

export const RulesTab = (sharedProps) => {
  const returnToMenu = () => {
    rotateMainCard("rotateY(180deg)", sharedProps.nextPage);
  };

  return (
    <>
      <div id="rules-side" className="side display">
        <div className="top-card-container">
          <h1>
            How to play Alias<hr></hr>
          </h1>
        </div>
        <div className="center-card-container">
          <div className="rules-container">
            <p>
              In "Alias" you have to say things in "other words". The idea is to
              explain words using synonyms, opposites or clues so that your team
              mates guess as many words from the card as possible before the
              sand in the sand timer runs out.
            </p>
            <h2>How to explain</h2>
            <p>
              When explaining, you cannot use any part of the word on the card,
              nor a derivative of it. For example, you cannot explain the word
              "handbag" by saying "a small bag women usually carry", or the word
              "balloon" by saying "a ball filled with air" since balloon and
              ball are derived from the same word. You could, however, say "a
              colourful object filled with air". If the word has two parts, for
              example "tape recorder", and someone guesses "tape player", you
              can then use the first part and help your team by saying "the tape
              is right but use another word for player". You can use opposites.
              The word "big" can be explained as "the opposite of small".
            </p>
            <h2>Mistakes and skipping</h2>
            <p>
              If the explaining player makes a mistake, for example says a part
              of the word in the card, the word will not be accepted and the
              team has to move one space backwards. For example, if a team has
              guessed 6 words, but the explainer has made two mistakes (6 - 2),
              the team gets to move only 4 spaces forward. The other teams must
              therefore listen closely when the team in turn is explaining. If
              the word seems too difficult, you can skip it, but remember that
              then you also have to move one space backwards. However, this is
              sometimes a good idea since it may save a lot of time, during
              which you can explain new words.
            </p>
          </div>
        </div>
        <div className="bottom-card-container">
          <button
            id="button-rules-back"
            className="bottom-button"
            onClick={returnToMenu}
          >
            <span>Got It</span>
          </button>
        </div>
      </div>
    </>
  );
};
