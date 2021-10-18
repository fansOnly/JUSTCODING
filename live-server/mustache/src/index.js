import parseTemplateToTokens from './parseTemplateToTokens.js'
import renderTemplate from './renderTemplate.js'

const mastache = {
  render(template, data) {

    const tokens = parseTemplateToTokens(template)
    console.log('tokens: ', tokens);
    const dom = renderTemplate(tokens, data)
    console.log('dom: ', dom);

    return dom
  }
}

export default (window.mastache = mastache)
