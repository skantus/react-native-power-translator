import HTTPMethods from './HTTPMethods';
import { GOOGLE } from '../Constants';
import BaseTranslator from './BaseTranslator';
import htmlEntities from './HtmlUtility';

export default class GoogleTranslator extends BaseTranslator {
    config;

    constructor(config) {
      super();
      this.config = config;
    }

    translate(text) {
      const url = `${GOOGLE.TRANSLATE}${this.config.apiKey}`;
      const data = this.createTheRequest(text);

      return HTTPMethods.post(url, data)
        .then(translation => {
          if(translation?.data?.translations[0]?.translatedText) {
            return translation?.data?.translations[0]?.translatedText
          };
          return text
        })
        .then(htmlEntities);
    }

    createTheRequest(text) {
      const config = this.config;

      const genericObject = {
        q: text,
        target: config.targetLanguage,
      };

      if (config.source) {
        return {
          ...genericObject,
          source: config.sourceLanguage,
        };
      }

      return genericObject;
    }
}
