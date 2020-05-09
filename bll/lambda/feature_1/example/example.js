var select = require('xml-crypto').xpath
  , dom = require('xmldom').DOMParser
  , SignedXml = require('xml-crypto').SignedXml
  , FileKeyInfo = require('xml-crypto').FileKeyInfo  
  , fs = require('fs')

function signXml(xml, xpath, key, dest)
{
  var sig = new SignedXml()
  sig.signingKey = fs.readFileSync(key)
  sig.addReference(xpath)    
  sig.computeSignature(xml)
  fs.writeFileSync(dest, sig.getSignedXml())
}

function validateXml(xml, key)
{
  var doc = new dom().parseFromString(xml)  
  console.log("Signed doc in validate function-->"+doc)  
  //var signature = select("/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']", doc)[0]
  var signature = select(doc, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0]
  console.log("signature in function-->"+signature)  
   var sig = new SignedXml()
  sig.keyInfoProvider = new FileKeyInfo(key)
  sig.loadSignature(signature.toString())
  var res = sig.checkSignature(xml)
  if (!res) console.log(sig.validationErrors)
  return res;
}

var xml = "<library>" +
            "<book>" +
              "<name>Harry Potter</name>" +
            "</book>" +
          "</library>"

//sign an xml document
signXml(xml, 
  "//*[local-name(.)='book']", 
  "client.pem", 
  "result.xml")
console.log("xmlvalue-->"+xml)
console.log("xml signed succesfully")
console.log()

var signedXml = fs.readFileSync("result.xml").toString()
console.log("signedxml-->"+signedXml)
console.log("validating signature...")
console.log()

//validate an xml document
if (validateXml(signedXml, "client_public.pem")){
  console.log()
  console.log("signature is valid")
}
else{
  console.log()
  console.log("signature not valid")

}
  
