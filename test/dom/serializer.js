var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

wows.describe('XML Serializer').addBatch({
  'text node containing "]]>"': function() {
    var doc = new DOMParser().parseFromString('<test/>', 'text/xml');
    doc.documentElement.appendChild(doc.createTextNode('hello ]]> there'));
    console.assert(doc.documentElement.firstChild.toString() == 'hello ]]&gt; there',doc.documentElement.firstChild.toString());
  },
  'text node containing "<>&"': function() {
      var doc = new DOMParser().parseFromString('<test/>', 'text/xml');
      doc.documentElement.appendChild(doc.createTextNode('<hello> <script>how are</script> you and &amp; your friend "Tomi"'));
      console.assert(
          doc.documentElement.firstChild.toString() == '&lt;hello&gt; &lt;script&gt;how are&lt;/script&gt; you and &amp;amp; your friend "Tomi"',
          doc.documentElement.firstChild.toString()
      );
  },
  'attribute node containing "<>&""': function() {
      var doc = new DOMParser().parseFromString('<test/>', 'text/xml');
      doc.documentElement.appendChild(doc.createTextNode('<hello> <script>how are</script> you and &amp; your friend "Tomi"'));
      console.assert(
          doc.documentElement.firstChild.toString() == '&lt;hello&gt; &lt;script&gt;how are&lt;/script&gt; you and &amp;amp; your friend "Tomi"',
          doc.documentElement.firstChild.toString()
      );
  },
  '<script> element with no children': function() {
    var doc = new DOMParser({xmlns:{xmlns:'http://www.w3.org/1999/xhtml'}}).parseFromString('<html2><script></script></html2>', 'text/html');
    //console.log(doc.documentElement.firstChild.toString(true))
    console.assert(doc.documentElement.firstChild.toString() == '<script></script>');
  },
}).run();
