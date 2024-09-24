$(document).ready(function() {
    // Initialize DataTable
    var table = $('#caseStudiesTable').DataTable({
      "paging": true,
      "searching": true,
      "ordering": true,
      "pageLength": 10,
      "lengthMenu": [5, 10, 25, 50, 100],
      "language": {
        "search": "Filter records:"
      },
      "columnDefs": [
        { "orderable": true, "targets": [0,1,2,3,4] },
        { "orderable": false, "targets": 5 } // Disable ordering on the Link column
      ]
    });
  
    // Function to fetch and parse CSV data
    function fetchCSV() {
      Papa.parse('data/case_studies.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          populateTable(results.data);
        },
        error: function(error) {
          console.error('Error fetching CSV:', error);
        }
      });
    }
  
    // Function to populate DataTable
    function populateTable(data) {
      data.forEach(function(item) {
        table.row.add([
          item['GROUP NUMBER'] || '',
          item['ROLL NO'] || '',
          item['NAME'] || '',
          item['Case study selected'] || '',
          item['Which company'] || '',
          item['Link'] ? `<a href="${item['Link']}" target="_blank">View</a>` : ''
        ]).draw(false);
      });
    }
  
    // Initial fetch
    fetchCSV();
  
    // Optional: Refresh data every 5 minutes
    setInterval(function() {
      table.clear().draw();
      fetchCSV();
    }, 300000); // 300,000 ms = 5 minutes
  });