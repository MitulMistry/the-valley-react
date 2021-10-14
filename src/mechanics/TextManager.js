// Webpack loads JSON files by default - parses as JavaScript objects
import ascentOfManChoicesJSON from '../storyModules/module01AscentOfManCHOICES.json';
import ascentOfManLinkNodesJSON from '../storyModules/module01AscentOfManLINKNODES.json';
import ascentOfManTextJSON from '../storyModules/module01AscentOfManTEXT.json';

import constants from '../globals/constants';

export default class {

  // This method returns an object structured like this:
  // {
  //   textData: data,
  //   linkNodesData: data,
  //   choicesData: data
  // }
  static loadModule(moduleNumber) {
    console.log('%c Loading story module ' + moduleNumber + ' ', 'color:white; background:orange;');

    if (moduleNumber === constants.MODULE_ASCENT_OF_MAN) {
      return this.loadJSON(ascentOfManTextJSON, ascentOfManChoicesJSON, ascentOfManLinkNodesJSON);
    } else {
      console.log('%cError: Invalid story module.', 'color:white; background:red;');
      return {};
    }
  }

  // Use this method to asynchronously load the JSON data.
  // It returns a promise, so it can be chained with .then() or .catch().
  static loadModuleAsync(moduleNumber) {
    console.log('%c Loading story module ' + moduleNumber + ' ', 'color:white; background:orange;');

    return new Promise((resolve, reject) => {
      if (moduleNumber === constants.MODULE_ASCENT_OF_MAN) {
        const data = this.loadJSON(ascentOfManTextJSON, ascentOfManChoicesJSON, ascentOfManLinkNodesJSON);
                
        if(data) {
          console.log(data);
          resolve(data);
        } else {
          console.log('%cError: Failed to load story module.', 'color:white; background:red;');
          reject({error: 'Failed to load story module'});
        }        

      } else {
        console.log('%cError: Invalid story module.', 'color:white; background:red;');
        reject({error: 'Invalid story module'});
      }
    });
  }

  // This method is used to structure and return the JSON data.
  // Don't use this method directly. Use either loadModule() or loadModuleAsync().
  // (Create React App is not currently configured to support private methods).
  static loadJSON(moduleText, moduleChoices, moduleLinkNodes) {
    let data = {
        textData: {},
        linkNodesData: {},
        choicesData: {}
      }

    // for (var i in moduleText) {
    //   data.textData.set(moduleText[i].KEY, moduleText[i].TEXT);
    //   // data.textData[moduleText[i].KEY] = moduleText[i].TEXT;
    // }

    // let currentModuleChoicesMap = new Map();
    // for (var j in moduleChoices) {
    //   currentModuleChoicesMap.set(moduleChoices[j].KEY, moduleChoices[j]);
    // }

    // let currentModuleLinkNodesMap = new Map();
    // for (var k in moduleLinkNodes) {
    //   currentModuleLinkNodesMap.set(moduleLinkNodes[k].KEY, moduleLinkNodes[k]);
    // }

    data.textData = moduleText;
    data.choicesData = moduleChoices;
    data.linkNodesData = moduleLinkNodes;

    return data;
  }
}
