var union    = require('union'),
    ecstatic = require('ecstatic');

var is2014 = /2014\./;

//
// ### redirect(res)
// World's simplest redirect function
//
function redirect(res) {
  var url  = 'http://2014.empirenode.org',
      body = '<p>301. Redirecting to <a href="' + url + '">' + url + '</a></p>';

  res.writeHead(301, { 'content-type': 'text/html', location: url });
  res.end(body);
}

var server = union.createServer({
  before: [
    // function (req, res) {
    //   var host = req.headers.host;
    //   if (process.env.NODE_ENV === 'production' && !is2014.test(host)) {
    //     return redirect(res);
    //   }

    //   res.emit('next');
    // },
    ecstatic({
      root: __dirname + '/public',
      defaultExt: true
    }),
    function (req, res) {
      return redirect(res);
    }
  ]
});

server.listen(8080);

console.log('server started on ' + 8080);
