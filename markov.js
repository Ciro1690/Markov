/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let word_dict = {}
    for (let word of this.words) {
      word_dict[word] = []
    }
    for (let i=0; i < this.words.length; i++) {
      if (this.words[i + 1]) {
        word_dict[this.words[i]].push(this.words[i+1])
      } else {
        word_dict[this.words[i]].push(null)
      }
    }
    return word_dict
  }


  /** return random text from chains */

  addWord(markov_chain) {
    let chains = this.makeChains()

    let last = markov_chain[markov_chain.length - 1]
    let next = chains[last][Math.floor(Math.random() * chains[last].length)]
    return next
  }

  makeText(numWords = 100) {
    let markov_chain = []
    let start = this.words[Math.floor(Math.random() * this.words.length)];
    markov_chain.push(start)

    while (markov_chain.length < numWords) {
      if (this.addWord(markov_chain) === null) {
        break
      } else {
        markov_chain.push(this.addWord(markov_chain))
      }
    }
    return markov_chain
  }
}

module.exports = MarkovMachine
// let mm = new MarkovMachine("Would you like them Here or there ? I would not like them Here or there.")
// console.log(mm.makeText())