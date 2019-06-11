function start() {
  if (!!window.EventSource) {
      var source = new EventSource('/stream')

      source.addEventListener('message', function(e) {
        jsonData = JSON.parse(e.data)

        handleSSEMessage(jsonData);
      }, false)

      source.addEventListener('open', function(e) {
        console.log('stream connected');
      }, false)

      source.addEventListener('error', function(e) {
        if (e.target.readyState == EventSource.CLOSED) {
          console.error('Disconnected...');
        }
        else if (e.target.readyState == EventSource.CONNECTING) {
          console.log('Connecting...')
        }
      }, false)
    }
}

function handleSSEMessage(data) {
  switch (data.id) {
    case 'title':
      document.querySelector('h1').innerHTML = data.content;
      break;
    case 'main':
      document.querySelector('#main').innerHTML = data.content;
    case 'image':
      document.querySelector('img').src = data.src;
  }
}

start();
