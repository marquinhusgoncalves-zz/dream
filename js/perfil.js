$.getJSON('js/json/perfil.json', function( json ) {
		var urlFoto = json.perfil[ 0 ].foto;
        $('#foto').attr("src", urlFoto);
        $('#nome').html(json.perfil[ 0 ].nome);
        $('#endereco').html(json.perfil[ 0 ].endereco);
        $('#profissao').html(json.perfil[ 0 ].profissao);
        $('#telefone').html(json.perfil[ 0 ].telefone);
        $('#email').html(json.perfil[ 0 ].email);
        $('#comentarios').html(json.perfil[ 0 ].comentarios);
  });