$.getJSON('js/json/carrinho.json', function( json ) {
		var urlImgProd = json.produtos[ 0 ].foto;
        $('#img-prod').attr("src", urlImgProd);
        $('#produto').html(json.produtos[ 0 ].produto);
        $('#modelo').html(json.produtos[ 0 ].modelo);
        $('#precounitario').html(json.produtos[ 0 ].precounitario);
  });