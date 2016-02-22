$.getJSON('js/json/endereco.json', function( json ) {
        $('#end-atual').html(json.endereco[ 0 ].endatual);
        $('#end-atual-compl').html(json.endereco[ 0 ].endatualcompl);
        $('#end-opc-1').html(json.endereco[ 1 ].endatual);
        $('#end-opc-1-compl').html(json.endereco[ 1 ].endatualcompl);
        $('#end-opc-2').html(json.endereco[ 2 ].endatual);
        $('#end-opc-2-compl').html(json.endereco[ 2 ].endatualcompl);
  });