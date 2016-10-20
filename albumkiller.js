(function() {
  var body = document.querySelector('body');
  var nextButton = document.querySelector('a.next');
  var prevButton = document.querySelector('a.prev');

  var old = document.querySelectorAll('[name=album_remove_helper]');
  for(var i = 0; i < old.length; ++i) {
    body.removeChild(old[i]);
  }

  var dialog = document.createElement('div');
  body.appendChild(dialog); 

  dialog.setAttribute('name', 'album_remove_helper');
  dialog.style.position = 'fixed';
  dialog.style.zIndex = '1000'; dialog.style.top = '53px';
  dialog.style.right = '10px';
  dialog.style.width = '310px';
  dialog.style.height = 'calc(100% - 68px)';
  dialog.style.padding = '20px';
  dialog.style.boxSizing = 'border-box';
  dialog.style.background = 'white';
  dialog.style.boxShadow = '1px 1px 2px 2px rgb(21, 21, 100)';

  var title = document.createElement('h1');
  dialog.appendChild(title);
  title.fontSize = '30px';
  title.appendChild(document.createTextNode('Album Killer'));

  var close = document.createElement('a');
  dialog.appendChild(close);

  close.style.borderRadius = '50%';
  close.style.width = '16px';
  close.style.height = '16px';
  close.style.textAlign = 'center';
  close.style.display = 'block';
  close.style.position = 'absolute';
  close.style.top = '8px';
  close.style.right = '8px';
  close.style.background = 'grey';
  close.style.color = 'white';
  close.innerHTML = '&times;';

  close.addEventListener('click', function() {
    body.removeChild(dialog);
  });

  var albums = [];
  var toRemove;
  var list = document.createElement('ul');
  dialog.appendChild(list);

  list.style.height = 'calc(100% - 50px)';
  list.style.overflow = 'auto';

  var button = document.createElement('button');
  dialog.appendChild(button);

  button.disabled = true;
  button.style.position = 'absolute';
  button.style.bottom = '16px';
  button.style.padding = '8px';
  button.style.width = '270px';
  button.style.border = '0';
  button.style.background = 'grey';
  button.style.color = 'white';
  button.appendChild(document.createTextNode('Remove All'));

  button.addEventListener('click', removeAlbums);

  moveToFirstPage();

  var currentPageAction;

  function waitForNextPage() {
    document.querySelector('#contentArea').removeEventListener('DOMSubtreeModified', waitForNextPage);
    var albums = document.querySelectorAll('a.photoTextTitle');
    if(albums.length == 0) {
      setTimeout(waitForNextPage, 100);
    } else {
      currentPageAction();
    }
  }

  function onFirstPage() {
    if(typeof toRemove == 'undefined') {
      addAlbumsOnPage();
    } else {
      setButtonState();
    }
  }

  function moveToFirstPage() {
    currentPageAction = moveToFirstPage;
    var prevButton = document.querySelector('a.prev[ajaxify]');
    if(prevButton) {
      document.querySelector('#contentArea').addEventListener('DOMSubtreeModified', waitForNextPage);
      prevButton.click();
    } else {
      onFirstPage();
    }
  }

  function addAlbumsOnPage(callback) {
    currentPageAction = addAlbumsOnPage;

    var newAlbums = Array.prototype.slice.call(document.querySelectorAll('a.photoTextTitle'));
    albums = albums.concat(newAlbums);
    toRemove = albums.length;

    for(var i = 0; i < newAlbums.length; ++i) {
      var li = document.createElement('li');
      list.appendChild(li);

      li.style.textOverflow = 'ellipsis';
      li.style.overflow = 'hidden';
      li.style.whiteSpace = 'nowrap';

      var a = createAlbumLink(newAlbums[i]);
      li.appendChild(a);
    }

    var nextButton = document.querySelector('a.next[ajaxify]');

    if(nextButton) {
      document.querySelector('#contentArea').addEventListener('DOMSubtreeModified', waitForNextPage);
      nextButton.click();
    } else {
      moveToFirstPage();
    }
  }

  function setButtonState() {
    if(toRemove == 0) {
      button.disabled = true;
      button.style.background = 'grey';
      button.style.cursor = 'default';
    } else {
      button.disabled = false;
      button.style.background = 'black';
      button.style.cursor = 'pointer';
    }
  }

  function createAlbumLink(album) {
    var a = document.createElement('a');
    a.style.textDecoration = 'none';
    a.style.color = '#444';
    album.remove = true;

    var icon = document.createElement('span');
    a.appendChild(icon);
    icon.innerHTML = '&#9988;';
    icon.style.display = 'inline-block';
    icon.style.width = '16px';

    var name = document.createElement('span');
    a.appendChild(name);
    name.appendChild(document.createTextNode(album.text));

    a.addEventListener('click', function() {
      if(album.remove) {
        album.remove = false;
        icon.style.opacity = '0';
        a.style.color = '#aaa';
        --toRemove;
      } else {
        album.remove = true;
        icon.style.opacity = '1';
        a.style.color = '#444';
        ++toRemove;
      }

      setButtonState();
    });

    return a;
  }

  function removeAlbums() {

    remove(0);

    var win;

    function remove(i) {
      var album = albums[i];

      if(! album) {
        if(win) {
          win.close();
        }
        location.reload();
        return;
      }

      if(album.remove) {
        if(win) {
          win.location.href = album.href;
        } else {
          win = window.open(album.href, '_removal_helper_window');
        }

        clickDeleteButton();

        function clickDeleteButton() {
          var deleteButton = win.document.querySelector('a[data-tooltip-content="Delete Album"]');
          if(deleteButton) {
            setTimeout(function() {
              deleteButton.click();
              confirmDelete();
            }, 100);
          } else {
            setTimeout(clickDeleteButton, 250);
          }
        }

        function confirmDelete() {
          var confirmButton = win.document.querySelector('form button[name=confirmed]');
          if(confirmButton) {
            setTimeout(function() {
              confirmButton.click();
              closeWindow();
            }, 100);
          } else {
            setTimeout(confirmDelete, 250);
          }

        }

        function closeWindow() {
          var photos = win.document.querySelector('.fbStarGrid');
          if(photos) {
            setTimeout(closeWindow, 250);
          } else {
            remove(i + 1);
          }
        }
      } else {
        remove(i + 1);
      }
    }
  }

})()
