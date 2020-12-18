// getElementById wrapper
function $id(id) {
  return document.getElementById(id);
}

// asyncrhonously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
function loadHTML(url, id) {
  req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = () => {
    $id(id).innerHTML = req.responseText;
  };
}

// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
  // 'view' is the id of the div element inside which we render the HTML
  '/start': () => { loadHTML('templates/first.html', 'view'); },
  '/about': () => { loadHTML('templates/album.html', 'view'); },
  '/p1': () => { loadHTML('templates/p1.html', 'view'); },
  '/p2': () => { loadHTML('templates/p2.html', 'view'); },
  '/p3': () => { loadHTML('templates/p3.html', 'view'); },
  '/team': () => { loadHTML('templates/second.html', 'view'); },
  '/studio': () => { loadHTML('templates/third.html', 'view'); }
});

// set the default route
router.on(() => { $id('view').innerHTML = '<a href="#!/">Start</a> <a href="#!/team">Team</a> <a href="#!/studio">Studio</a>'; });

// set the 404 route
router.notFound((query) => { $id('view').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>'; });

router.resolve();
