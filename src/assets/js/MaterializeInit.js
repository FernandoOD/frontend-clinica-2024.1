document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,{});

    const collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse, {
      accordion: false // Cambia a true si quieres que solo se abra un submenú a la vez
    });

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

  });