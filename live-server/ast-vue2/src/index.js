import parse from './parse.js'

const templateStr = `
<div>
  <h3 class="title_111 title222"    id="t-1"   data-v="auaud22">你好</h3>
  <ul class="ul11">
    <li>Aa</li>
    <li>Bb</li>
    <li>Cc</li>
  </ul>
  <div>
    <div>哈哈</div>
  </div>
</div>
`
console.log(templateStr)

const ast = parse(templateStr)
console.log('ast: ', ast);
