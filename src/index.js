//Remember: good modules are defined by what they DO, not what they ARE.
//Loosely coupled modules do not directly talk to and see each other.

import "./styles.css";
import { greeting } from "./js-modules/dom-update.js";

console.log(greeting);
