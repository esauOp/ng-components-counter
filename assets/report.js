var chart = bb.generate({
  data: {
    columns: [
      ['app-sidebar', 3],
      ['app-admin-navbar', 3],
      ['app-header-stats', 3],
      ['app-footer-admin', 3],
      ['app-snack-bar', 3],
      ['app-footer-small', 1],
      ['app-table-dropdown', 11],
      ['app-pages-dropdown', 1],
      ['app-index-dropdown', 1],
      ['app-filter-form', 2],
      ['app-card-mat-table', 1],
      ['app-card-line-chart', 2],
      ['app-card-bar-chart', 2],
      ['app-card-page-visits', 2],
      ['app-card-social-traffic', 2],
      ['app-card-stats', 11],
      ['app-map-example', 2],
      ['app-card-settings', 1],
      ['app-card-profile', 1],
      ['app-card-table', 2],
      ['app-index-navbar', 1],
      ['app-footer', 3],
      ['app-auth-navbar', 2],
    ],
    type: 'pie', // for ESM specify as: pie()
    onclick: function (d, i) {
      console.log('onclick', d, i);
    },
    onover: function (d, i) {
      console.log('onover', d, i);
    },
    onout: function (d, i) {
      console.log('onout', d, i);
    },
  },
  bindto: '#pieChart',
});
