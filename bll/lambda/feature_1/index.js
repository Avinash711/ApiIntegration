var select = require('xpath').select

module.exports = require('./lib/signed-xml')
const result = require('./lib/signed-xml')
console.log("result-->"+result.FileKeyInfo)
console.log("result1-->"+result.SignedXml)
module.exports.xpath = function(node, xpath) {
  console.log("xpath-->"+xpath)
  console.log("node-->"+node)
  console.log("select--->"+JSON.stringify(select(xpath, node)))
  return select(xpath, node)
}