$(document).ready(function() {
	function montaHTMLProduto(produto) {
		var htmlProduto = '<tr>';
		htmlProduto += '<td><button class="btn btn-primary remove">Remover</button></td>';
		htmlProduto += '<td class="muted center_text"><a href="' + produto.href + '"><img class="img-prod"      src="' + produto.foto + '" alt="' + produto.produto + '"></a></td>';
		htmlProduto += '<td class="produto">' + produto.produto + '</td>';
		htmlProduto += '<td class="modelo">' + produto.modelo + '</td>';
		htmlProduto += '<td><input type="text" placeholder="Quantidade" class="input-mini quantidade"  value="1"></td>';
		htmlProduto += '<td class="precounitario">R$ ' + produto.precounitario.toFixed(2) + '</td>';
		htmlProduto += '<td class="precototal">R$ ' + produto.precounitario.toFixed(2) +'</td>';
		htmlProduto += '</tr>';

		return htmlProduto;
	}

	$.getJSON('js/json/carrinho.json', function( json ) {       
		var totalGeral = 0;
		json.produtos.forEach(function(produto) {
			var htmlProduto = montaHTMLProduto(produto);
			$('#listaProdutos:last-child').append(htmlProduto);
			totalGeral += parseFloat(produto.precounitario);
		});
		resultadoHTML = montaResultadoGeral(totalGeral);
		$('#listaProdutos:last-child').append(resultadoHTML);
	});

	function montaResultadoGeral(totalGeral) {
		var resultadoHTML = '<tr>';
		resultadoHTML += '<td colspan="6">Total Geral</td>';
		resultadoHTML += '<td id="totalGeral">R$ ' + totalGeral.toFixed(2) + '</td>';
		resultadoHTML += '</tr>';
		return resultadoHTML;
	}

	$(document).on('click', '.remove', function(){
		$(this).closest('tr').remove();
	});

	$(document).on('blur', '.quantidade', function(){
		var qtde = $(this).val();
		if (qtde === null || qtde === undefined || qtde === '') {
			qtde = 1;
			$(this).val(qtde);
		}
		var preco = $(this).parent().parent().find('.precounitario').text();
		preco = preco.replace('R$ ', '');
		var total = qtde * preco;
		$(this).parent().parent().find('.precototal').text('R$ ' + total.toFixed(2));
		var totalGeral = 0;
		$('.precototal').each(function() {
			var subtotal = $(this).text();
			subtotal = subtotal.replace('R$ ', '');
			totalGeral += parseFloat(subtotal);
		});
		$('#totalGeral').text('R$ ' + totalGeral.toFixed(2));
	});

});