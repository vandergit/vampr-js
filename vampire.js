class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampiresAway = 0;
    let vampireThis = this;

    while (vampireThis.creator) {
      vampireThis = vampireThis.creator;
      vampiresAway++;
    }

    return vampiresAway;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }

    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    let vampire = null;

    for (const child of this.offspring) {
      vampire = child.vampireWithName(name);
      if (vampire) {
        return vampire;
      }
    }

    return vampire;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampire = 0;

    totalVampire = this.offspring.length;

    for (const child of this.offspring) {
      if (child.offspring.length > 0) {
        totalVampire = totalVampire + child.totalDescendents;
      }

    }
    return totalVampire;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let convertedVamp = [];

    if (this.yearConverted > 1980) {
      convertedVamp.push(this);
    }

    for (const child of this.offspring) {
      const converted = child.allMillennialVampires;
      convertedVamp = convertedVamp.concat(converted);
    }

    return convertedVamp;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;