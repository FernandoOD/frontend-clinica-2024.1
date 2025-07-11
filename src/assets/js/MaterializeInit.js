document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,{});

    const tabs  =document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, {});

    const collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse, {
      accordion: true // Cambia a true si quieres que solo se abra un submenú a la vez
    });

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

  });