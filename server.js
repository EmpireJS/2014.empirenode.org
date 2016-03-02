var union    = require('union'),
    ecstatic = require('ecstatic');

var port = process.env.PORT || 8080;

//
// ### redirect(res)
// World's simplest redirect function
//
function redirect(res) {
  var url  = 'http://2015.empirenode.org',
      body = '<p>301. Redirecting to <a href="' + url + '">' + url + '</a></p>';

  res.writeHead(301, { 'content-type': 'text/html', location: url });
  res.end(body);
}

var server = union.createServer({
  before: [
    function (req, res) {
      var host = req.headers.host || '',
          parts = host.split('.');

      console.log('%s - %s%s', req.method, host, req.url);
      if (process.env.NODE_ENV === 'production'
        && (parts.length !== 3 || parts[0] === 'www')) {
        return redirect(res);
      }

      res.emit('next');
    },
    ecstatic({
      root: __dirname + '/public',
      defaultExt: true
    }),
    function (req, res) {
      return redirect(res);
    }
  ]
});

server.listen(port, function () {
  console.log('Listening on %s', port);
});
