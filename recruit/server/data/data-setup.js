Meteor.startup(function() {
  if (Regions.find().count() === 0) {
    var regions = [
      {id: 13, name: 'Abruzzo'},
      {id: 17, name: 'Basilicata'},
      {id: 18, name: 'Calabria'},
      {id: 15, name: 'Campania'},
      {id: 8, name: 'Emilia-Romagna'},
      {id: 6, name: 'Friuli-Venezia Giulia'},
      {id: 12, name: 'Lazio'},
      {id: 7, name: 'Liguria'},
      {id: 3, name: 'Lombardia'},
      {id: 11, name: 'Marche'},
      {id: 14, name: 'Molise'},
      {id: 1, name: 'Piemonte'},
      {id: 16, name: 'Puglia'},
      {id: 20, name: 'Sardegna'},
      {id: 19, name: 'Sicilia'},
      {id: 9, name: 'Toscana'},
      {id: 4, name: 'Trentino-Alto Adige'},
      {id: 10, name: 'Umbria'},
      {id: 2, name: 'Valle d\'Aosta'},
      {id: 5, name: 'Veneto'},
    ];
    regions.forEach(function(region) {
      Regions.insert(region);
    });
  }

  if (Statuses.find().count() === 0) {
    var statuses = [
      {id: 0, name: 'unassigned'},
      {id: 1, name: 'pending'},
      {id: 2, name: 'rejected'},
      {id: 3, name: 'ok'},
    ];
    statuses.forEach(function(status) {
      Statuses.insert(status);
    });
  }

  if (Jobs.find().count() === 0) {
    var jobs = [
      {title: 'Select a job position...'},
      {title: 'Haiti Village Photographer'},
      {title: 'Rapallo On The Beach'},
    ];
    jobs.forEach(function(job) {
      Jobs.insert(job);
    });
  }
});
